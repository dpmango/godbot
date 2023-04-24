import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig, loadEnv } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import mkcert from 'vite-plugin-mkcert';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import svgLoader from 'vite-svg-loader';

export default () => {
  return defineConfig({
    publicDir: 'public',
    server: {
      host: 'local.devgodbot.ru',
      https: true,
      port: 443,
      // proxy: {
      //   '/api': {
      //     target: process.env.VITE_API_PROXY,
      //     changeOrigin: true,
      //     // configure: (proxy, options) => {
      //     //   // proxy will be an instance of 'http-proxy'
      //     // },
      //   },
      // },
    },
    plugins: [
      mkcert(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        ],
        imports: [
          'react',
          {
            'react-i18next': ['useTranslation'],
            classnames: [['default', 'cns']],
          },
        ],
        dirs: ['./src/core/**', './src/store/**'],
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

    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@import "@/assets/styles/utils/index.scss";`,
    //     },
    //   },
    // },
  });
};
