import { resolve } from 'path';
import { defineConfig } from 'vite';
import rootDir from './utils/rootDir.js';

export default defineConfig({
  root: resolve(rootDir, 'public', 'js'),
  build: {
    minify: 'esbuild',
    sourcemap: 'hidden',
    lib: {
      entry: resolve(rootDir, 'public', 'js'),
      name: 'bundle',
      formats: ['es'],
      fileName: format => `bundle.${format}.js`,
    },
  },
});
