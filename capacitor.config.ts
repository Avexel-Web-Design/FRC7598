import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.avexel.frc7598',
  appName: 'FRC 7598',
  webDir: 'dist',
  server: {
    url: 'https://frc7598.pages.dev',
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
