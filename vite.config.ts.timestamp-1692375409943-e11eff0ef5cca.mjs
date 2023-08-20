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

// package.json
var dependencies = {
  "@reduxjs/toolkit": "^1.9.5",
  "@sentry/react": "^7.53.1",
  "@sentry/tracing": "^7.53.1",
  classnames: "^2.3.2",
  "crypto-js": "^4.1.1",
  "date-fns": "^2.30.0",
  "date-fns-tz": "^2.0.0",
  dayjs: "^1.11.7",
  formik: "^2.2.9",
  i18next: "^22.5.0",
  "i18next-browser-languagedetector": "^7.0.1",
  "i18next-http-backend": "^2.2.1",
  "js-cookie": "^3.0.5",
  "lightweight-charts": "^4.0.1",
  lodash: "^4.17.21",
  ofetch: "^1.0.1",
  react: "^18.2.0",
  "react-dom": "^18.2.0",
  "react-helmet": "^6.1.0",
  "react-i18next": "^12.3.1",
  "react-modal-video": "^2.0.0",
  "react-redux": "^8.0.5",
  "react-router-dom": "^6.11.2",
  "react-toastify": "^9.1.3",
  "react-yandex-metrika": "^2.6.0",
  reactour: "^1.19.0",
  "styled-components": "^5.3.11",
  swiper: "^9.3.2"
};

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///Users/admin/projects/godbot/vite.config.ts";
function renderChunks(deps) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (["react", "react-router-dom", "react-dom"].includes(key))
      return;
    chunks[key] = [key];
  });
  return chunks;
}
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
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-router-dom", "react-dom"],
            ...renderChunks(dependencies)
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2FkbWluL3Byb2plY3RzL2dvZGJvdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FkbWluL3Byb2plY3RzL2dvZGJvdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWRtaW4vcHJvamVjdHMvZ29kYm90L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xuXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZXNsaW50UGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCc7XG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCc7XG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucyc7XG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcic7XG5cbi8vQHRzLWlnbm9yZVxuaW1wb3J0IHsgZGVwZW5kZW5jaWVzIH0gZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xuZnVuY3Rpb24gcmVuZGVyQ2h1bmtzKGRlcHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcbiAgY29uc3QgY2h1bmtzID0ge307XG4gIE9iamVjdC5rZXlzKGRlcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChbJ3JlYWN0JywgJ3JlYWN0LXJvdXRlci1kb20nLCAncmVhY3QtZG9tJ10uaW5jbHVkZXMoa2V5KSkgcmV0dXJuO1xuICAgIGNodW5rc1trZXldID0gW2tleV07XG4gIH0pO1xuICByZXR1cm4gY2h1bmtzO1xufVxuXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcbiAgLy8gTG9hZCBhcHAtbGV2ZWwgZW52IHZhcnMgdG8gbm9kZS1sZXZlbCBlbnYgdmFycy5cbiAgcHJvY2Vzcy5lbnYgPSB7IC4uLnByb2Nlc3MuZW52LCAuLi5sb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpIH07XG5cbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgcHVibGljRGlyOiAncHVibGljJyxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6ICdsb2NhbC5kZXZnb2Rib3QucnUnLFxuICAgICAgaHR0cHM6IHRydWUsXG4gICAgICBwb3J0OiA0NDMsXG4gICAgICBwcm94eToge1xuICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6IHByb2Nlc3MuZW52LlZJVEVfQVBJX1BST1hZLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAvLyByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgICAgIC8vIGNvbmZpZ3VyZTogKHByb3h5LCBvcHRpb25zKSA9PiB7XG4gICAgICAgICAgLy8gICAvLyBwcm94eSB3aWxsIGJlIGFuIGluc3RhbmNlIG9mICdodHRwLXByb3h5J1xuICAgICAgICAgIC8vIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgbWtjZXJ0KCksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XG4gICAgICAgIF0sXG4gICAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgICAncmVhY3QnLFxuICAgICAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAncmVhY3QtaTE4bmV4dCc6IFsndXNlVHJhbnNsYXRpb24nXSxcbiAgICAgICAgICAgIGNsYXNzbmFtZXM6IFtbJ2RlZmF1bHQnLCAnY25zJ11dLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGRpcnM6IFsnLi9zcmMvY29yZS8qKiddLFxuICAgICAgICBkdHM6IHRydWUsXG4gICAgICAgIGVzbGludHJjOiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgcmVhY3QoKSxcbiAgICAgIGVzbGludFBsdWdpbih7XG4gICAgICAgIGZhaWxPbkVycm9yOiBmYWxzZSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgfSksXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICAgIH0pLFxuICAgICAgc3ZnTG9hZGVyKCksXG5cbiAgICAgIC8vIHZpc3VhbGl6ZXIoe1xuICAgICAgLy8gICB0ZW1wbGF0ZTogJ3RyZWVtYXAnLCAvLyBvciBzdW5idXJzdFxuICAgICAgLy8gICBvcGVuOiB0cnVlLFxuICAgICAgLy8gICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgIC8vICAgYnJvdGxpU2l6ZTogZmFsc2UsXG4gICAgICAvLyAgIGZpbGVuYW1lOiAnYnVuZGxlLWFuYWx5emUuaHRtbCcsXG4gICAgICAvLyB9KSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAnQGMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2NvbXBvbmVudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcblxuICAgICAgICAnQHVpJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9jb21wb25lbnRzL1VJJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgICdAY29yZSc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvY29yZScsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAnQGludGVyZmFjZSc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvY29yZS9pbnRlcmZhY2UnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgJ0Bhc3NldHMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAnQHN0eWxlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXNzZXRzL3N0eWxlcycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogJ2J1aWxkJyxcbiAgICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LXJvdXRlci1kb20nLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgICAuLi5yZW5kZXJDaHVua3MoZGVwZW5kZW5jaWVzKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIC8vIGNzczoge1xuICAgIC8vICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgIC8vICAgICBzY3NzOiB7XG4gICAgLy8gICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9hc3NldHMvc3R5bGVzL3V0aWxzL2luZGV4LnNjc3NcIjtgLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgfSxcbiAgICAvLyB9LFxuICB9KTtcbn07XG4iLCAie1xuICBcIm5hbWVcIjogXCJnb2Rib3QtYXBwXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuNS42XCIsXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIj49MTYuMTUuMFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcInNlcnZlXCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJsaW50OmpzOmZpeFwiOiBcImVzbGludCAuL3NyYyAtLWV4dCAuanN4LC5qcywudHMsLnRzeCAtLXF1aWV0IC0tZml4IC0taWdub3JlLXBhdGggLi8uZ2l0aWdub3JlXCIsXG4gICAgXCJsaW50OnN0eWxlOmZpeFwiOiBcInN0eWxlbGludCBcXFwiKiovKi57Y3NzLHNjc3N9XFxcIiAtLWZpeCAtLWlnbm9yZS1wYXRoIC5naXRpZ25vcmVcIixcbiAgICBcImxpbnRcIjogXCJ5YXJuIGxpbnQ6anM6Zml4ICYmIHlhcm4gbGludDpzdHlsZTpmaXhcIixcbiAgICBcImRlcGxveVwiOiBcImJhc2ggZGVwbG95LnNoXCJcbiAgfSxcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwicHJlLWNvbW1pdFwiOiBcImxpbnRcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHJlZHV4anMvdG9vbGtpdFwiOiBcIl4xLjkuNVwiLFxuICAgIFwiQHNlbnRyeS9yZWFjdFwiOiBcIl43LjUzLjFcIixcbiAgICBcIkBzZW50cnkvdHJhY2luZ1wiOiBcIl43LjUzLjFcIixcbiAgICBcImNsYXNzbmFtZXNcIjogXCJeMi4zLjJcIixcbiAgICBcImNyeXB0by1qc1wiOiBcIl40LjEuMVwiLFxuICAgIFwiZGF0ZS1mbnNcIjogXCJeMi4zMC4wXCIsXG4gICAgXCJkYXRlLWZucy10elwiOiBcIl4yLjAuMFwiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS43XCIsXG4gICAgXCJmb3JtaWtcIjogXCJeMi4yLjlcIixcbiAgICBcImkxOG5leHRcIjogXCJeMjIuNS4wXCIsXG4gICAgXCJpMThuZXh0LWJyb3dzZXItbGFuZ3VhZ2VkZXRlY3RvclwiOiBcIl43LjAuMVwiLFxuICAgIFwiaTE4bmV4dC1odHRwLWJhY2tlbmRcIjogXCJeMi4yLjFcIixcbiAgICBcImpzLWNvb2tpZVwiOiBcIl4zLjAuNVwiLFxuICAgIFwibGlnaHR3ZWlnaHQtY2hhcnRzXCI6IFwiXjQuMC4xXCIsXG4gICAgXCJsb2Rhc2hcIjogXCJeNC4xNy4yMVwiLFxuICAgIFwib2ZldGNoXCI6IFwiXjEuMC4xXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWhlbG1ldFwiOiBcIl42LjEuMFwiLFxuICAgIFwicmVhY3QtaTE4bmV4dFwiOiBcIl4xMi4zLjFcIixcbiAgICBcInJlYWN0LW1vZGFsLXZpZGVvXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJyZWFjdC1yZWR1eFwiOiBcIl44LjAuNVwiLFxuICAgIFwicmVhY3Qtcm91dGVyLWRvbVwiOiBcIl42LjExLjJcIixcbiAgICBcInJlYWN0LXRvYXN0aWZ5XCI6IFwiXjkuMS4zXCIsXG4gICAgXCJyZWFjdC15YW5kZXgtbWV0cmlrYVwiOiBcIl4yLjYuMFwiLFxuICAgIFwicmVhY3RvdXJcIjogXCJeMS4xOS4wXCIsXG4gICAgXCJzdHlsZWQtY29tcG9uZW50c1wiOiBcIl41LjMuMTFcIixcbiAgICBcInN3aXBlclwiOiBcIl45LjMuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlcy9jcnlwdG8tanNcIjogXCJeNC4xLjFcIixcbiAgICBcIkB0eXBlcy9qZXN0XCI6IFwiXjI5LjUuMVwiLFxuICAgIFwiQHR5cGVzL2pzLWNvb2tpZVwiOiBcIl4zLjAuM1wiLFxuICAgIFwiQHR5cGVzL2xvZGFzaFwiOiBcIl40LjE0LjE5NVwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMi40XCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMi43XCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjIuNFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWhlbG1ldFwiOiBcIl42LjEuNlwiLFxuICAgIFwiQHR5cGVzL3JlYWN0LW1vZGFsLXZpZGVvXCI6IFwiXjEuMi4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl41LjU5LjdcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNS41OS43XCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiOiBcIl40LjAuMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI6IFwiXjMuMy4xXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC40MS4wXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjguOC4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiOiBcIl4yLjI3LjVcIixcbiAgICBcImVzbGludC1wbHVnaW4tcHJldHRpZXJcIjogXCJeNC4yLjFcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3RcIjogXCJeNy4zMi4yXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXNpbXBsZS1pbXBvcnQtc29ydFwiOiBcIl4xMC4wLjBcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjEzLjIuMlwiLFxuICAgIFwicHJlLWNvbW1pdFwiOiBcIl4xLjIuMlwiLFxuICAgIFwicHJldHRpZXJcIjogXCJeMi44LjhcIixcbiAgICBcInJlYWN0LXNjcmlwdHNcIjogXCI1LjAuMVwiLFxuICAgIFwic2Fzc1wiOiBcIl4xLjYyLjFcIixcbiAgICBcInNvdXJjZS1tYXAtZXhwbG9yZXJcIjogXCJeMi41LjNcIixcbiAgICBcInN0eWxlbGludFwiOiBcIl4xNS42LjJcIixcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmQtc2Nzc1wiOiBcIl45LjAuMFwiLFxuICAgIFwic3R5bGVsaW50LW9yZGVyXCI6IFwiXjYuMC4zXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMC40XCIsXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE2LjJcIixcbiAgICBcInZpdGVcIjogXCJeNC4zLjVcIixcbiAgICBcInZpdGUtcGx1Z2luLWVzbGludFwiOiBcIl4xLjguMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tbWtjZXJ0XCI6IFwiXjEuMTUuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI6IFwiXjIuMC4xXCIsXG4gICAgXCJ2aXRlLXN2Zy1sb2FkZXJcIjogXCJeNC4wLjBcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNRLFNBQVMsZUFBZSxXQUFXO0FBRXpTLE9BQU8sV0FBVztBQUNsQixZQUFZLFVBQVU7QUFDdEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sZUFBZTs7O0FDU3BCLG1CQUFnQjtBQUFBLEVBQ2Qsb0JBQW9CO0FBQUEsRUFDcEIsaUJBQWlCO0FBQUEsRUFDakIsbUJBQW1CO0FBQUEsRUFDbkIsWUFBYztBQUFBLEVBQ2QsYUFBYTtBQUFBLEVBQ2IsWUFBWTtBQUFBLEVBQ1osZUFBZTtBQUFBLEVBQ2YsT0FBUztBQUFBLEVBQ1QsUUFBVTtBQUFBLEVBQ1YsU0FBVztBQUFBLEVBQ1gsb0NBQW9DO0FBQUEsRUFDcEMsd0JBQXdCO0FBQUEsRUFDeEIsYUFBYTtBQUFBLEVBQ2Isc0JBQXNCO0FBQUEsRUFDdEIsUUFBVTtBQUFBLEVBQ1YsUUFBVTtBQUFBLEVBQ1YsT0FBUztBQUFBLEVBQ1QsYUFBYTtBQUFBLEVBQ2IsZ0JBQWdCO0FBQUEsRUFDaEIsaUJBQWlCO0FBQUEsRUFDakIscUJBQXFCO0FBQUEsRUFDckIsZUFBZTtBQUFBLEVBQ2Ysb0JBQW9CO0FBQUEsRUFDcEIsa0JBQWtCO0FBQUEsRUFDbEIsd0JBQXdCO0FBQUEsRUFDeEIsVUFBWTtBQUFBLEVBQ1oscUJBQXFCO0FBQUEsRUFDckIsUUFBVTtBQUNaOzs7QUQvQzhKLElBQU0sMkNBQTJDO0FBYWpOLFNBQVMsYUFBYSxNQUE4QjtBQUNsRCxRQUFNLFNBQVMsQ0FBQztBQUNoQixTQUFPLEtBQUssSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRO0FBQ2pDLFFBQUksQ0FBQyxTQUFTLG9CQUFvQixXQUFXLEVBQUUsU0FBUyxHQUFHO0FBQUc7QUFDOUQsV0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHO0FBQUEsRUFDcEIsQ0FBQztBQUNELFNBQU87QUFDVDtBQUVBLElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUUzQixVQUFRLE1BQU0sRUFBRSxHQUFHLFFBQVEsS0FBSyxHQUFHLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBRWhFLFNBQU8sYUFBYTtBQUFBLElBQ2xCLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxVQUNOLFFBQVEsUUFBUSxJQUFJO0FBQUEsVUFDcEIsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFLaEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1A7QUFBQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxZQUNFLGlCQUFpQixDQUFDLGdCQUFnQjtBQUFBLFlBQ2xDLFlBQVksQ0FBQyxDQUFDLFdBQVcsS0FBSyxDQUFDO0FBQUEsVUFDakM7QUFBQSxRQUNGO0FBQUEsUUFDQSxNQUFNLENBQUMsZUFBZTtBQUFBLFFBQ3RCLEtBQUs7QUFBQSxRQUNMLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxNQUFNO0FBQUEsTUFDTixhQUFhO0FBQUEsUUFDWCxhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQU0sYUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLFFBQzFELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxNQUNELFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBU1o7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsUUFDcEQsTUFBTSxjQUFjLElBQUksSUFBSSxvQkFBb0Isd0NBQWUsQ0FBQztBQUFBLFFBRWhFLE9BQU8sY0FBYyxJQUFJLElBQUksdUJBQXVCLHdDQUFlLENBQUM7QUFBQSxRQUNwRSxTQUFTLGNBQWMsSUFBSSxJQUFJLGNBQWMsd0NBQWUsQ0FBQztBQUFBLFFBQzdELGNBQWMsY0FBYyxJQUFJLElBQUksd0JBQXdCLHdDQUFlLENBQUM7QUFBQSxRQUM1RSxXQUFXLGNBQWMsSUFBSSxJQUFJLGdCQUFnQix3Q0FBZSxDQUFDO0FBQUEsUUFDakUsV0FBVyxjQUFjLElBQUksSUFBSSx1QkFBdUIsd0NBQWUsQ0FBQztBQUFBLE1BQzFFO0FBQUEsSUFDRjtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sY0FBYztBQUFBLFlBQ1osUUFBUSxDQUFDLFNBQVMsb0JBQW9CLFdBQVc7QUFBQSxZQUNqRCxHQUFHLGFBQWEsWUFBWTtBQUFBLFVBQzlCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K
