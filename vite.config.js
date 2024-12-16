import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Remplacez par le chemin si nécessaire (par ex. '/app/').
  build: {
    outDir: 'dist', // Dossier où les fichiers générés sont stockés.
    assetsDir: 'assets', // Sous-dossier pour les fichiers statiques.
  },
});
