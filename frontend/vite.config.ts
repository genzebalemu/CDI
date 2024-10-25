import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  plugins: [
    createVuePlugin(),
  ],
  server: {
    open: true, // Automatically open the app in your default browser
  },
});
