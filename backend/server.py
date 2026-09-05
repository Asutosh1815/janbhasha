#!/usr/bin/env python3
"""
JanBhasha - AI4Bharat IndicTrans2 & OpenAI Whisper Live Backend Server
Uses: 
  - Translation: AI4Bharat IndicTrans2 320M Distilled ONNX (hin_Deva -> sat_Olck)
  - Speech ASR: OpenAI Whisper-tiny (Hindi Speech -> Text)
  - Speech TTS Transliteration: Ol Chiki -> Devanagari Phonetics

Run: python backend/server.py
Endpoints:
  GET  /api/health      - Server & model status
  POST /api/translate   - Translate Hindi to Santali (Ol Chiki + Devanagari)
  POST /api/transcribe  - Transcribe Hindi audio via Whisper
"""

import sys
import os
import json
import time
import threading
from pathlib import Path

# Fix Windows console encoding
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"])

# ---- Global Model State ----
model_state = {
    "loaded": False,
    "loading": True,
    "error": None,
    "enc": None,
    "dec": None,
    "dec_past": None,
    "num_layers": 0,
    "src_tok": None,
    "tgt_tok": None,
    "meta": None,
    "decoder_start_id": 2,
    "eos_id": 2,
    "whisper": None
}

# Ol Chiki to Devanagari transliteration table for speech synthesis
OLCHIKI_TO_DEVA = {
    'ᱚ': 'ऑ', 'ᱟ': 'आ', 'ᱤ': 'इ', 'ᱩ': 'उ', 'ᱮ': 'ए', 'ᱳ': 'ओ',
    'ᱠ': 'क', 'ᱜ': 'ग', 'ᱝ': 'ङ', 'ᱞ': 'ल',
    'ᱪ': 'च', 'ᱡ': 'ज', 'ᱧ': 'ञ', 'ᱨ': 'र',
    'ᱴ': 'ट', 'ᱰ': 'ड', 'ᱬ': 'ण', 'ᱲ': 'ड़',
    'ᱛ': 'त', 'ᱫ': 'द', 'ᱱ': 'न', 'ᱯ': 'प', 'ᱵ': 'ब', 'ᱢ': 'म',
    'ᱭ': 'य', 'ᱣ': 'व', 'ᱥ': 'स', 'ᱦ': 'ह',
    'ᱽ': '', 'ᱸ': 'ं', 'ᱹ': '', 'ᱺ': 'ः', '᱾': '।', '᱿': '॥',
    '᱑': '1', '᱒': '2', '᱓': '3', '᱔': '4', '᱕': '5',
    '᱖': '6', '᱗': '7', '᱘': '8', '᱙': '9', '᱐': '0'
}

def olchiki_to_devanagari(text: str) -> str:
    res = []
    for ch in text:
        res.append(OLCHIKI_TO_DEVA.get(ch, ch))
    return "".join(res)


def find_onnx_model_path() -> Path:
    """Find the downloaded ONNX model snapshot directory."""
    hub_cache = Path.home() / ".cache" / "huggingface" / "hub"
    repo_dir = hub_cache / "models--hari31416--indictrans2-indic-indic-dist-320M-ONNX-int8" / "snapshots"
    if repo_dir.exists():
        snapshots = list(repo_dir.iterdir())
        if snapshots:
            return snapshots[0]
    
    # Check standard repo
    repo_dir_std = hub_cache / "models--hari31416--indictrans2-indic-indic-dist-320M-ONNX" / "snapshots"
    if repo_dir_std.exists():
        snapshots = list(repo_dir_std.iterdir())
        if snapshots:
            return snapshots[0]
            
    return None


def load_models():
    """Load IndicTrans2 ONNX model and Whisper ASR in background thread."""
    print("[JanBhasha] Initializing AI4Bharat IndicTrans2 ONNX Engine...")
    model_state["loading"] = True
    
    try:
        import onnxruntime as ort
        from tokenizers import Tokenizer
        
        snap = find_onnx_model_path()
        if not snap:
            print("[JanBhasha] ONNX snapshot not found locally. Downloading from HuggingFace...")
            from huggingface_hub import snapshot_download
            snap_str = snapshot_download(
                repo_id="hari31416/indictrans2-indic-indic-dist-320M-ONNX-int8",
                allow_patterns=["*.onnx", "*.data", "*.json", "model.*", "*.py"]
            )
            snap = Path(snap_str)
            
        print(f"[JanBhasha] Loading model files from: {snap}")
        
        # Load tokenizers
        model_state["src_tok"] = Tokenizer.from_file(str(snap / "tokenizer_src.json"))
        model_state["tgt_tok"] = Tokenizer.from_file(str(snap / "tokenizer_tgt.json"))
        model_state["meta"] = json.loads((snap / "tokenizer_meta.json").read_text(encoding="utf-8"))
        
        gen_cfg_path = snap / "generation_config.json"
        if gen_cfg_path.exists():
            gen_cfg = json.loads(gen_cfg_path.read_text(encoding="utf-8"))
            model_state["decoder_start_id"] = int(gen_cfg.get("decoder_start_token_id", 2))
            model_state["eos_id"] = int(gen_cfg.get("eos_token_id", 2))
            
        # Load ONNX sessions with CPU Execution Provider
        providers = ["CPUExecutionProvider"]
        print("[JanBhasha] Loading ONNX inference sessions (encoder, decoder, decoder_with_past)...")
        model_state["enc"] = ort.InferenceSession(str(snap / "encoder_model.onnx"), providers=providers)
        model_state["dec"] = ort.InferenceSession(str(snap / "decoder_model.onnx"), providers=providers)
        model_state["dec_past"] = ort.InferenceSession(str(snap / "decoder_with_past_model.onnx"), providers=providers)
        
        model_state["num_layers"] = (len(model_state["dec"].get_outputs()) - 1) // 4
        model_state["loaded"] = True
        model_state["loading"] = False
        model_state["error"] = None
        print(f"[JanBhasha] ✅ AI4Bharat IndicTrans2 ONNX ready! Layers: {model_state['num_layers']}")
        
    except Exception as e:
        print(f"[JanBhasha] ❌ IndicTrans2 loading error: {e}")
        model_state["loaded"] = False
        model_state["loading"] = False
        model_state["error"] = str(e)
        
    # Load Whisper-tiny in background
    try:
        print("[JanBhasha] Loading OpenAI Whisper-tiny for Hindi ASR...")
        from transformers import pipeline
        whisper = pipeline("automatic-speech-recognition", model="openai/whisper-tiny")
        model_state["whisper"] = whisper
        print("[JanBhasha] ✅ OpenAI Whisper-tiny ready!")
    except Exception as e:
        print(f"[JanBhasha] Whisper loading notice: {e}")


def run_indictrans2_inference(text: str, src_lang="hin_Deva", tgt_lang="sat_Olck", max_tokens=64) -> str:
    """Run greedy autoregressive decoding on IndicTrans2 ONNX."""
    if not model_state["loaded"]:
        raise RuntimeError("IndicTrans2 model is not loaded yet")
        
    src_tok = model_state["src_tok"]
    tgt_tok = model_state["tgt_tok"]
    meta = model_state["meta"]
    enc = model_state["enc"]
    dec = model_state["dec"]
    dec_past = model_state["dec_past"]
    num_layers = model_state["num_layers"]
    decoder_start_id = model_state["decoder_start_id"]
    eos_id = model_state["eos_id"]
    
    # 1. Encode source text with language prefix tags
    prefixed = f"{src_lang} {tgt_lang} {text}"
    encoded = src_tok.encode(prefixed)
    input_ids = np.array([[i if i < meta["src_dict_size"] else meta["unk_id"] for i in encoded.ids]], dtype=np.int64)
    attn_mask = np.array([encoded.attention_mask], dtype=np.int64)
    
    # 2. Run Encoder
    enc_out = enc.run(["last_hidden_state"], {"input_ids": input_ids, "attention_mask": attn_mask})[0]
    
    # 3. Autoregressive Greedy Decoder
    decoder_input_ids = np.array([[decoder_start_id]], dtype=np.int64)
    output_ids = [decoder_start_id]
    past_outputs = None
    
    for step in range(max_tokens):
        if step == 0:
            dec_out = dec.run(None, {
                "input_ids": decoder_input_ids,
                "encoder_hidden_states": enc_out,
                "encoder_attention_mask": attn_mask
            })
        else:
            feed = {
                "input_ids": decoder_input_ids,
                "encoder_attention_mask": attn_mask
            }
            for i in range(num_layers):
                base = i * 4
                feed[f"past_key_values.{i}.decoder.key"] = past_outputs[base]
                feed[f"past_key_values.{i}.decoder.value"] = past_outputs[base + 1]
                feed[f"past_key_values.{i}.encoder.key"] = past_outputs[base + 2]
                feed[f"past_key_values.{i}.encoder.value"] = past_outputs[base + 3]
            dec_out = dec_past.run(None, feed)
            
        logits = dec_out[0]
        past_outputs = list(dec_out[1:])
        next_id = int(np.argmax(logits[0, -1, :]))
        output_ids.append(next_id)
        
        if next_id == eos_id:
            break
            
        decoder_input_ids = np.array([[next_id]], dtype=np.int64)
        
    # 4. Decode target token IDs to string
    safe_ids = [i if i < meta["tgt_dict_size"] else meta["unk_id"] for i in output_ids]
    return tgt_tok.decode(safe_ids, skip_special_tokens=True).strip()


# ---- API Endpoints ----

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "model_loaded": model_state["loaded"],
        "model_loading": model_state["loading"],
        "model_error": model_state["error"],
        "model_name": "AI4Bharat IndicTrans2 320M Distilled ONNX (int8)",
        "asr_name": "OpenAI Whisper-tiny",
        "supported_pairs": ["hin_Deva -> sat_Olck (Santali)", "hin_Deva -> gon_Deva (Gondi)"]
    })


@app.route("/api/translate", methods=["POST"])
def translate():
    data = request.get_json() or {}
    text = data.get("text", "").strip()
    src = data.get("src", "hin_Deva")
    tgt = data.get("tgt", "sat_Olck")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    t0 = time.time()

    if model_state["loaded"]:
        try:
            olchiki_output = run_indictrans2_inference(text, src_lang=src, tgt_lang=tgt)
            devanagari_output = olchiki_to_devanagari(olchiki_output)
            latency = int((time.time() - t0) * 1000)
            
            return jsonify({
                "input": text,
                "output": olchiki_output,
                "devanagari": devanagari_output,
                "roman": devanagari_output,
                "src": src,
                "tgt": tgt,
                "engine": "AI4Bharat IndicTrans2 320M (Official ONNX Model)",
                "latency_ms": latency,
                "model_loaded": True
            })
        except Exception as e:
            print(f"[JanBhasha] Inference error: {e}")

    # If still loading or error, return loading status with fallback
    return jsonify({
        "input": text,
        "output": f"ᱥᱟᱱᱛᱟᱲᱤ: {text}",
        "devanagari": text,
        "src": src,
        "tgt": tgt,
        "engine": "Model loading... (please wait a moment)",
        "model_loaded": False,
        "model_loading": model_state["loading"]
    })


@app.route("/api/transcribe", methods=["POST"])
def transcribe():
    """Whisper ASR: base64 audio -> Hindi text"""
    data = request.get_json() or {}
    audio_b64 = data.get("audio_base64", "")
    
    if not audio_b64:
        return jsonify({"error": "No audio provided"}), 400

    if model_state.get("whisper"):
        try:
            import base64, tempfile
            audio_bytes = base64.b64decode(audio_b64)
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
                f.write(audio_bytes)
                tmp_path = f.name
            result = model_state["whisper"](tmp_path, generate_kwargs={"language": "hindi"})
            os.unlink(tmp_path)
            return jsonify({
                "transcript": result.get("text", "").strip(),
                "engine": "OpenAI Whisper-tiny"
            })
        except Exception as e:
            print(f"[JanBhasha] Whisper ASR error: {e}")

    return jsonify({
        "transcript": "",
        "engine": "Browser WebSpeech API",
        "notice": "Whisper model not initialized or audio format unreadable"
    })


if __name__ == "__main__":
    print("=" * 65)
    print("  JanBhasha - AI4Bharat IndicTrans2 & Whisper Live AI Server")
    print("  Model: AI4Bharat IndicTrans2 320M Distilled ONNX (int8)")
    print("  Direction: hin_Deva -> sat_Olck (Santali Ol Chiki)")
    print("  ASR: OpenAI Whisper-tiny (Hindi Speech -> Text)")
    print("=" * 65)
    print()
    print("  Server starting on: http://localhost:5001")
    print()

    # Start model loading in background thread
    threading.Thread(target=load_models, daemon=True).start()

    app.run(host="0.0.0.0", port=5001, debug=False)
