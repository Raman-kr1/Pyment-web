// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If you generated mkcert certificates and want Vite over HTTPS,
// point to the same files you created for the backend:
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],

  // Dev-server settings
  server: {
    port: 5173,
    https: {
      key:  fs.readFileSync(path.resolve(__dirname, '../backend/certificates/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../backend/certificates/cert.pem')),
      minVersion: 'TLSv1.2'
    },
    proxy: {
      // optional: forward API calls so you can use relative paths
      '/api': {
        target: 'https://localhost:5000',
        changeOrigin: true,
        secure: false    // dev only
      }
    }
  }
});