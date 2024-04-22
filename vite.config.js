import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";


export default defineConfig({
  base: "./",
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    proxy: {
      "/qwen": {
        target: 'https://dashscope.aliyuncs.com/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/qwen/, ''),
      },
      '/api': {
        target: 'https://dashscope.aliyuncs.com/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
});
