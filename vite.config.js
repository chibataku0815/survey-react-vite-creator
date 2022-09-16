import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import VitePluginLinaria from 'vite-plugin-linaria';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginLinaria({ displayName: false })],
});
