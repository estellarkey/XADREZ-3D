import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      // Aliases para pacotes three.js
      'three/examples/jsm/': new URL('./node_modules/three/examples/jsm/', import.meta.url).pathname,
    }
  },
  optimizeDeps: {
    include: ['three', 'chess.js', 'gsap']
  }
});