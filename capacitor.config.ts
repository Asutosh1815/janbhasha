import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.janbhasha.app',
  appName: 'Janbhasha',
  webDir: 'dist',
  android: {
    // Allow mixed content (HTTP from HTTPS context) for local backend calls
    allowMixedContent: true,
  },
  server: {
    // Allow navigation to external URLs (needed for TTS CDN fallback)
    allowNavigation: ['translate.google.com', 'localhost'],
    // Allow cleartext (HTTP) traffic to localhost backend
    cleartext: true,
  },
};

export default config;
