import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Force l'alias pour Bootstrap
      'bootstrap': '/node_modules/bootstrap/dist/css/bootstrap.min.css',
    },
  },
  build: {
    // Assurez-vous que Vite ne rencontre pas de problème avec certains modules
    commonjsOptions: {
      include: /node_modules/,
    },
  },
})

