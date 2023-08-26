// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import react from "file:///Users/khmelevskoy/projects/godbot/node_modules/@vitejs/plugin-react/dist/index.mjs";
import * as path from "path";
import AutoImport from "file:///Users/khmelevskoy/projects/godbot/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///Users/khmelevskoy/projects/godbot/node_modules/vite/dist/node/index.js";
import eslintPlugin from "file:///Users/khmelevskoy/projects/godbot/node_modules/vite-plugin-eslint/dist/index.mjs";
import mkcert from "file:///Users/khmelevskoy/projects/godbot/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import { createSvgIconsPlugin } from "file:///Users/khmelevskoy/projects/godbot/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import svgLoader from "file:///Users/khmelevskoy/projects/godbot/node_modules/vite-svg-loader/index.js";

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
var __vite_injected_original_import_meta_url = "file:///Users/khmelevskoy/projects/godbot/vite.config.ts";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2tobWVsZXZza295L3Byb2plY3RzL2dvZGJvdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2tobWVsZXZza295L3Byb2plY3RzL2dvZGJvdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva2htZWxldnNrb3kvcHJvamVjdHMvZ29kYm90L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xuXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZXNsaW50UGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCc7XG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCc7XG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucyc7XG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcic7XG5cbi8vQHRzLWlnbm9yZVxuaW1wb3J0IHsgZGVwZW5kZW5jaWVzIH0gZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xuZnVuY3Rpb24gcmVuZGVyQ2h1bmtzKGRlcHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcbiAgY29uc3QgY2h1bmtzID0ge307XG4gIE9iamVjdC5rZXlzKGRlcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChbJ3JlYWN0JywgJ3JlYWN0LXJvdXRlci1kb20nLCAncmVhY3QtZG9tJ10uaW5jbHVkZXMoa2V5KSkgcmV0dXJuO1xuICAgIGNodW5rc1trZXldID0gW2tleV07XG4gIH0pO1xuICByZXR1cm4gY2h1bmtzO1xufVxuXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcbiAgLy8gTG9hZCBhcHAtbGV2ZWwgZW52IHZhcnMgdG8gbm9kZS1sZXZlbCBlbnYgdmFycy5cbiAgcHJvY2Vzcy5lbnYgPSB7IC4uLnByb2Nlc3MuZW52LCAuLi5sb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpIH07XG5cbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgcHVibGljRGlyOiAncHVibGljJyxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6ICdsb2NhbC5kZXZnb2Rib3QucnUnLFxuICAgICAgaHR0cHM6IHRydWUsXG4gICAgICBwb3J0OiA0NDMsXG4gICAgICBwcm94eToge1xuICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6IHByb2Nlc3MuZW52LlZJVEVfQVBJX1BST1hZLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAvLyByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgICAgIC8vIGNvbmZpZ3VyZTogKHByb3h5LCBvcHRpb25zKSA9PiB7XG4gICAgICAgICAgLy8gICAvLyBwcm94eSB3aWxsIGJlIGFuIGluc3RhbmNlIG9mICdodHRwLXByb3h5J1xuICAgICAgICAgIC8vIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgbWtjZXJ0KCksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XG4gICAgICAgIF0sXG4gICAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgICAncmVhY3QnLFxuICAgICAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAncmVhY3QtaTE4bmV4dCc6IFsndXNlVHJhbnNsYXRpb24nXSxcbiAgICAgICAgICAgIGNsYXNzbmFtZXM6IFtbJ2RlZmF1bHQnLCAnY25zJ11dLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGRpcnM6IFsnLi9zcmMvY29yZS8qKiddLFxuICAgICAgICBkdHM6IHRydWUsXG4gICAgICAgIGVzbGludHJjOiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgcmVhY3QoKSxcbiAgICAgIGVzbGludFBsdWdpbih7XG4gICAgICAgIGZhaWxPbkVycm9yOiBmYWxzZSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgfSksXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICAgIH0pLFxuICAgICAgc3ZnTG9hZGVyKCksXG5cbiAgICAgIC8vIHZpc3VhbGl6ZXIoe1xuICAgICAgLy8gICB0ZW1wbGF0ZTogJ3RyZWVtYXAnLCAvLyBvciBzdW5idXJzdFxuICAgICAgLy8gICBvcGVuOiB0cnVlLFxuICAgICAgLy8gICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgIC8vICAgYnJvdGxpU2l6ZTogZmFsc2UsXG4gICAgICAvLyAgIGZpbGVuYW1lOiAnYnVuZGxlLWFuYWx5emUuaHRtbCcsXG4gICAgICAvLyB9KSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAnQGMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2NvbXBvbmVudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcblxuICAgICAgICAnQHVpJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9jb21wb25lbnRzL1VJJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgICdAY29yZSc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvY29yZScsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAnQGludGVyZmFjZSc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvY29yZS9pbnRlcmZhY2UnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgJ0Bhc3NldHMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAnQHN0eWxlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXNzZXRzL3N0eWxlcycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogJ2J1aWxkJyxcbiAgICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LXJvdXRlci1kb20nLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgICAuLi5yZW5kZXJDaHVua3MoZGVwZW5kZW5jaWVzKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIC8vIGNzczoge1xuICAgIC8vICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgIC8vICAgICBzY3NzOiB7XG4gICAgLy8gICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9hc3NldHMvc3R5bGVzL3V0aWxzL2luZGV4LnNjc3NcIjtgLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgfSxcbiAgICAvLyB9LFxuICB9KTtcbn07XG4iLCAie1xuICBcIm5hbWVcIjogXCJnb2Rib3QtYXBwXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuNS4xMFwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCI+PTE2LjE1LjBcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJzZXJ2ZVwiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwibGludDpqczpmaXhcIjogXCJlc2xpbnQgLi9zcmMgLS1leHQgLmpzeCwuanMsLnRzLC50c3ggLS1xdWlldCAtLWZpeCAtLWlnbm9yZS1wYXRoIC4vLmdpdGlnbm9yZVwiLFxuICAgIFwibGludDpzdHlsZTpmaXhcIjogXCJzdHlsZWxpbnQgXFxcIioqLyoue2NzcyxzY3NzfVxcXCIgLS1maXggLS1pZ25vcmUtcGF0aCAuZ2l0aWdub3JlXCIsXG4gICAgXCJsaW50XCI6IFwieWFybiBsaW50OmpzOmZpeCAmJiB5YXJuIGxpbnQ6c3R5bGU6Zml4XCIsXG4gICAgXCJkZXBsb3lcIjogXCJiYXNoIGRlcGxveS5zaFwiXG4gIH0sXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInByZS1jb21taXRcIjogXCJsaW50XCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkByZWR1eGpzL3Rvb2xraXRcIjogXCJeMS45LjVcIixcbiAgICBcIkBzZW50cnkvcmVhY3RcIjogXCJeNy41My4xXCIsXG4gICAgXCJAc2VudHJ5L3RyYWNpbmdcIjogXCJeNy41My4xXCIsXG4gICAgXCJjbGFzc25hbWVzXCI6IFwiXjIuMy4yXCIsXG4gICAgXCJjcnlwdG8tanNcIjogXCJeNC4xLjFcIixcbiAgICBcImRhdGUtZm5zXCI6IFwiXjIuMzAuMFwiLFxuICAgIFwiZGF0ZS1mbnMtdHpcIjogXCJeMi4wLjBcIixcbiAgICBcImRheWpzXCI6IFwiXjEuMTEuN1wiLFxuICAgIFwiZm9ybWlrXCI6IFwiXjIuMi45XCIsXG4gICAgXCJpMThuZXh0XCI6IFwiXjIyLjUuMFwiLFxuICAgIFwiaTE4bmV4dC1icm93c2VyLWxhbmd1YWdlZGV0ZWN0b3JcIjogXCJeNy4wLjFcIixcbiAgICBcImkxOG5leHQtaHR0cC1iYWNrZW5kXCI6IFwiXjIuMi4xXCIsXG4gICAgXCJqcy1jb29raWVcIjogXCJeMy4wLjVcIixcbiAgICBcImxpZ2h0d2VpZ2h0LWNoYXJ0c1wiOiBcIl40LjAuMVwiLFxuICAgIFwibG9kYXNoXCI6IFwiXjQuMTcuMjFcIixcbiAgICBcIm9mZXRjaFwiOiBcIl4xLjAuMVwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1oZWxtZXRcIjogXCJeNi4xLjBcIixcbiAgICBcInJlYWN0LWkxOG5leHRcIjogXCJeMTIuMy4xXCIsXG4gICAgXCJyZWFjdC1tb2RhbC12aWRlb1wiOiBcIl4yLjAuMFwiLFxuICAgIFwicmVhY3QtcmVkdXhcIjogXCJeOC4wLjVcIixcbiAgICBcInJlYWN0LXJvdXRlci1kb21cIjogXCJeNi4xMS4yXCIsXG4gICAgXCJyZWFjdC10b2FzdGlmeVwiOiBcIl45LjEuM1wiLFxuICAgIFwicmVhY3QteWFuZGV4LW1ldHJpa2FcIjogXCJeMi42LjBcIixcbiAgICBcInJlYWN0b3VyXCI6IFwiXjEuMTkuMFwiLFxuICAgIFwic3R5bGVkLWNvbXBvbmVudHNcIjogXCJeNS4zLjExXCIsXG4gICAgXCJzd2lwZXJcIjogXCJeOS4zLjJcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdHlwZXMvY3J5cHRvLWpzXCI6IFwiXjQuMS4xXCIsXG4gICAgXCJAdHlwZXMvamVzdFwiOiBcIl4yOS41LjFcIixcbiAgICBcIkB0eXBlcy9qcy1jb29raWVcIjogXCJeMy4wLjNcIixcbiAgICBcIkB0eXBlcy9sb2Rhc2hcIjogXCJeNC4xNC4xOTVcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjIuNFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuN1wiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4yLjRcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1oZWxtZXRcIjogXCJeNi4xLjZcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1tb2RhbC12aWRlb1wiOiBcIl4xLjIuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNS41OS43XCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjUuNTkuN1wiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4wLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOiBcIl4zLjMuMVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNDEuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl44LjguMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjogXCJeMi4yNy41XCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiXjQuMi4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0XCI6IFwiXjcuMzIuMlwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1zaW1wbGUtaW1wb3J0LXNvcnRcIjogXCJeMTAuMC4wXCIsXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xMy4yLjJcIixcbiAgICBcInByZS1jb21taXRcIjogXCJeMS4yLjJcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjIuOC44XCIsXG4gICAgXCJyZWFjdC1zY3JpcHRzXCI6IFwiNS4wLjFcIixcbiAgICBcInNhc3NcIjogXCJeMS42Mi4xXCIsXG4gICAgXCJzb3VyY2UtbWFwLWV4cGxvcmVyXCI6IFwiXjIuNS4zXCIsXG4gICAgXCJzdHlsZWxpbnRcIjogXCJeMTUuNi4yXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXN0YW5kYXJkLXNjc3NcIjogXCJeOS4wLjBcIixcbiAgICBcInN0eWxlbGludC1vcmRlclwiOiBcIl42LjAuM1wiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjAuNFwiLFxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNi4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuMy41XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1lc2xpbnRcIjogXCJeMS44LjFcIixcbiAgICBcInZpdGUtcGx1Z2luLW1rY2VydFwiOiBcIl4xLjE1LjBcIixcbiAgICBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiOiBcIl4yLjAuMVwiLFxuICAgIFwidml0ZS1zdmctbG9hZGVyXCI6IFwiXjQuMC4wXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3UixTQUFTLGVBQWUsV0FBVztBQUUzVCxPQUFPLFdBQVc7QUFDbEIsWUFBWSxVQUFVO0FBQ3RCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sWUFBWTtBQUNuQixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLGVBQWU7OztBQ1NwQixtQkFBZ0I7QUFBQSxFQUNkLG9CQUFvQjtBQUFBLEVBQ3BCLGlCQUFpQjtBQUFBLEVBQ2pCLG1CQUFtQjtBQUFBLEVBQ25CLFlBQWM7QUFBQSxFQUNkLGFBQWE7QUFBQSxFQUNiLFlBQVk7QUFBQSxFQUNaLGVBQWU7QUFBQSxFQUNmLE9BQVM7QUFBQSxFQUNULFFBQVU7QUFBQSxFQUNWLFNBQVc7QUFBQSxF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
