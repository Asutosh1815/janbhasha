@echo off
chcp 65001 >nul
echo ============================================================
echo   JanBhasha AI Backend - AI4Bharat IndicTrans2
echo   Model: hin_Deva to sat_Olck (Santali Ol Chiki)
echo   GitHub: https://github.com/AI4Bharat/IndicTrans2
echo ============================================================
echo.
echo Installing required packages...
pip install flask flask-cors transformers sentencepiece torch --index-url https://download.pytorch.org/whl/cpu -q
echo.
echo Starting backend server on http://localhost:5001
echo   GET  /api/health     - Check model status
echo   POST /api/translate  - Translate Hindi to Santali
echo.
echo Press Ctrl+C to stop.
echo.
python backend/server.py
