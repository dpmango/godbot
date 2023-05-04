// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import react from "file:///Users/admin/projects/godbot/node_modules/@vitejs/plugin-react/dist/index.mjs";
import * as path from "path";
import AutoImport from "file:///Users/admin/projects/godbot/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///Users/admin/projects/godbot/node_modules/vite/dist/node/index.js";
import eslintPlugin from "file:///Users/admin/projects/godbot/node_modules/vite-plugin-eslint/dist/index.mjs";
import mkcert from "file:///Users/admin/projects/godbot/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import { createSvgIconsPlugin } from "file:///Users/admin/projects/godbot/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import svgLoader from "file:///Users/admin/projects/godbot/node_modules/vite-svg-loader/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/admin/projects/godbot/vite.config.ts";
var vite_config_default = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    publicDir: "public",
    server: {
      host: "local.devgodbot.ru",
      https: true,
      port: 443,
      proxy: {
        "/api": {
          target: process.env.VITE_API_PROXY,
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/api/, ''),
          // configure: (proxy, options) => {
          //   // proxy will be an instance of 'http-proxy'
          // },
        }
      }
    },
    plugins: [
      mkcert(),
      AutoImport({
        include: [
          /\.[tj]sx?$/
          // .ts, .tsx, .js, .jsx
        ],
        imports: [
          "react",
          "react-router-dom",
          {
            "react-i18next": ["useTranslation"],
            classnames: [["default", "cns"]]
          }
        ],
        dirs: ["./src/core/**"],
        dts: true,
        eslintrc: {
          enabled: true
        }
      }),
      react(),
      eslintPlugin({
        failOnError: false,
        cache: false
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      svgLoader()
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
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
        "@c": fileURLToPath(new URL("./src/components", __vite_injected_original_import_meta_url)),
        "@ui": fileURLToPath(new URL("./src/components/UI", __vite_injected_original_import_meta_url)),
        "@core": fileURLToPath(new URL("./src/core", __vite_injected_original_import_meta_url)),
        "@interface": fileURLToPath(new URL("./src/core/interface", __vite_injected_original_import_meta_url)),
        "@assets": fileURLToPath(new URL("./src/assets", __vite_injected_original_import_meta_url)),
        "@styles": fileURLToPath(new URL("./src/assets/styles", __vite_injected_original_import_meta_url))
      }
    },
    build: {
      outDir: "build",
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules/react")) {
              return "vendor-react";
            } else if (id.includes("node_modules/i18n")) {
              return "vendor-i18n";
            } else if (id.includes("node_modules")) {
              return "vendor";
            }
          }
        }
      }
    }
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@import "@/assets/styles/utils/index.scss";`,
    //     },
    //   },
    // },
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWRtaW4vcHJvamVjdHMvZ29kYm90XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWRtaW4vcHJvamVjdHMvZ29kYm90L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hZG1pbi9wcm9qZWN0cy9nb2Rib3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5cbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50JztcbmltcG9ydCBta2NlcnQgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0JztcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJztcblxuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSB9KSA9PiB7XG4gIC8vIExvYWQgYXBwLWxldmVsIGVudiB2YXJzIHRvIG5vZGUtbGV2ZWwgZW52IHZhcnMuXG4gIHByb2Nlc3MuZW52ID0geyAuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKSB9O1xuXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIHB1YmxpY0RpcjogJ3B1YmxpYycsXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiAnbG9jYWwuZGV2Z29kYm90LnJ1JyxcbiAgICAgIGh0dHBzOiB0cnVlLFxuICAgICAgcG9ydDogNDQzLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiBwcm9jZXNzLmVudi5WSVRFX0FQSV9QUk9YWSxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgLy8gcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgICAgICAgICAvLyBjb25maWd1cmU6IChwcm94eSwgb3B0aW9ucykgPT4ge1xuICAgICAgICAgIC8vICAgLy8gcHJveHkgd2lsbCBiZSBhbiBpbnN0YW5jZSBvZiAnaHR0cC1wcm94eSdcbiAgICAgICAgICAvLyB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIG1rY2VydCgpLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAvXFwuW3RqXXN4PyQvLCAvLyAudHMsIC50c3gsIC5qcywgLmpzeFxuICAgICAgICBdLFxuICAgICAgICBpbXBvcnRzOiBbXG4gICAgICAgICAgJ3JlYWN0JyxcbiAgICAgICAgICAncmVhY3Qtcm91dGVyLWRvbScsXG4gICAgICAgICAge1xuICAgICAgICAgICAgJ3JlYWN0LWkxOG5leHQnOiBbJ3VzZVRyYW5zbGF0aW9uJ10sXG4gICAgICAgICAgICBjbGFzc25hbWVzOiBbWydkZWZhdWx0JywgJ2NucyddXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBkaXJzOiBbJy4vc3JjL2NvcmUvKionXSxcbiAgICAgICAgZHRzOiB0cnVlLFxuICAgICAgICBlc2xpbnRyYzoge1xuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIHJlYWN0KCksXG4gICAgICBlc2xpbnRQbHVnaW4oe1xuICAgICAgICBmYWlsT25FcnJvcjogZmFsc2UsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gICAgICB9KSxcbiAgICAgIHN2Z0xvYWRlcigpLFxuXG4gICAgICAvLyB2aXN1YWxpemVyKHtcbiAgICAgIC8vICAgdGVtcGxhdGU6ICd0cmVlbWFwJywgLy8gb3Igc3VuYnVyc3RcbiAgICAgIC8vICAgb3BlbjogdHJ1ZSxcbiAgICAgIC8vICAgZ3ppcFNpemU6IHRydWUsXG4gICAgICAvLyAgIGJyb3RsaVNpemU6IGZhbHNlLFxuICAgICAgLy8gICBmaWxlbmFtZTogJ2J1bmRsZS1hbmFseXplLmh0bWwnLFxuICAgICAgLy8gfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgJ0BjJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9jb21wb25lbnRzJywgaW1wb3J0Lm1ldGEudXJsKSksXG5cbiAgICAgICAgJ0B1aSc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvY29tcG9uZW50cy9VSScsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAnQGNvcmUnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2NvcmUnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgJ0BpbnRlcmZhY2UnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2NvcmUvaW50ZXJmYWNlJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgICdAYXNzZXRzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9hc3NldHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgJ0BzdHlsZXMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cy9zdHlsZXMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWFjdCcpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAndmVuZG9yLXJlYWN0JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9pMThuJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItaTE4bic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBjc3M6IHtcbiAgICAvLyAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAvLyAgICAgc2Nzczoge1xuICAgIC8vICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIkAvYXNzZXRzL3N0eWxlcy91dGlscy9pbmRleC5zY3NzXCI7YCxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSxcbiAgfSk7XG59O1xuIl0sCiAg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
