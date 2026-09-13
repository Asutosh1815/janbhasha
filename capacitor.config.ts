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
    // Localhost backend navigation and local assets
    allowNavigation: ['localhost', '127.0.0.1'],
    // Allow cleartext (HTTP) traffic to localhost backend
    cleartext: true,
  },
};

export default config;
