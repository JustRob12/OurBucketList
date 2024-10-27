import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Change output directory to 'build'
  },
  define: {
    'process.env': {}, // This line will expose process.env
  },
});
