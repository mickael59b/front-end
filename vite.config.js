import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Important pour gérer les chemins relatifs lors du déploiement
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    historyApiFallback: true,  // Redirige les requêtes vers index.html pour SPA
  },
});
