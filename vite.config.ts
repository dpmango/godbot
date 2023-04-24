import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig, loadEnv } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import mkcert from 'vite-plugin-mkcert';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import svgLoader from 'vite-svg-loader';

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    publicDir: 'public',
    server: {
      host: 'local.devgodbot.ru',
      https: true,
      port: 443,
      proxy: {
        '/api': {
          target: process.env.VITE_API_PROXY,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
          // configure: (proxy, options) => {
          //   // proxy will be an instance of 'http-proxy'
          // },
        },
      },
    },
    plugins: [
      mkcert(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        ],
        imports: [
          'react',
          'react-router-dom',
          {
            'react-i18next': ['useTranslation'],
            classnames: [['default', 'cns']],
          },
        ],
        dirs: ['./src/core/**'],
        dts: true,
        eslintrc: {
          enabled: true,
        },
      }),
      react(),
      eslintPlugin({
        failOnError: false,
        cache: false,
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      svgLoader(),

      // visualizer({
      //   template: 'treemap', // or sunburst
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: false,
      //   filename: 'bundle-analyze.html',
      // }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@c': fileURLToPath(new URL('./src/components', import.meta.url)),

        '@ui': fileURLToPath(new URL('./src/components/Ui', import.meta.url)),
        '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
        '@interface': fileURLToPath(new URL('./src/core/interface', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
      },
    },

    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/react')) {
              return 'vendor-react';
            } else if (id.includes('node_modules/i18n')) {
              return 'vendor-i18n';
            } else if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@import "@/assets/styles/utils/index.scss";`,
    //     },
    //   },
    // },
  });
};
