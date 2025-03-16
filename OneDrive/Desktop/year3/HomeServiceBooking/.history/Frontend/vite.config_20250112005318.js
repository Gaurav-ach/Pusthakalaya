import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      'shad-ui': '/node_modules/shad-ui/dist',
    },
  },
});
