import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.wildeligamanager.bremen',
  appName: 'liga-manager-ui',
  webDir: 'dist/liga-manager-ui',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
