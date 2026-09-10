package com.janbhasha.app;

import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        applyWebViewSettings();
    }

    @Override
    public void onStart() {
        super.onStart();
        applyWebViewSettings();
    }

    @Override
    public void onResume() {
        super.onResume();
        applyWebViewSettings();
    }

    private void applyWebViewSettings() {
        try {
            if (getBridge() != null && getBridge().getWebView() != null) {
                WebView webView = getBridge().getWebView();
                webView.getSettings().setMediaPlaybackRequiresUserGesture(false);
            }
        } catch (Exception e) {
            // Ignore
        }
    }
}
