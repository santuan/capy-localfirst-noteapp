// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/stn/Documents/Repos-Dev/santuan/capy-localfirst-noteapp/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/stn/Documents/Repos-Dev/santuan/capy-localfirst-noteapp/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import tailwind from "file:///C:/Users/stn/Documents/Repos-Dev/santuan/capy-localfirst-noteapp/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/stn/Documents/Repos-Dev/santuan/capy-localfirst-noteapp/node_modules/autoprefixer/lib/autoprefixer.js";
import { VitePWA } from "file:///C:/Users/stn/Documents/Repos-Dev/santuan/capy-localfirst-noteapp/node_modules/vite-plugin-pwa/dist/index.js";
import vueDevTools from "file:///C:/Users/stn/Documents/Repos-Dev/santuan/capy-localfirst-noteapp/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/stn/Documents/Repos-Dev/santuan/capy-localfirst-noteapp/vite.config.js";
var host = process.env.TAURI_DEV_HOST;
var vite_config_default = defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "DevNote",
        short_name: "DevNote",
        description: "DevNote",
        theme_color: "#020817"
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 1e7
      }
    }),
    vueDevTools()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  clearScreen: false,
  server: {
    // Tauri expects a fixed port, fail if that port is not available
    strictPort: true,
    // if the host Tauri is expecting is set, use it
    host: host || false,
    port: 5173
  },
  // Env variables starting with the item of `envPrefix` will be exposed in tauri's source code through `import.meta.env`.
  envPrefix: ["VITE_", "TAURI_ENV_*"],
  build: {
    chunkSizeWarningLimit: 1e4,
    target: process.env.TAURI_ENV_PLATFORM == "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules"))
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzdG5cXFxcRG9jdW1lbnRzXFxcXFJlcG9zLURldlxcXFxzYW50dWFuXFxcXGNhcHktbG9jYWxmaXJzdC1ub3RlYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzdG5cXFxcRG9jdW1lbnRzXFxcXFJlcG9zLURldlxcXFxzYW50dWFuXFxcXGNhcHktbG9jYWxmaXJzdC1ub3RlYXBwXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9zdG4vRG9jdW1lbnRzL1JlcG9zLURldi9zYW50dWFuL2NhcHktbG9jYWxmaXJzdC1ub3RlYXBwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHRhaWx3aW5kIGZyb20gJ3RhaWx3aW5kY3NzJ1xyXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuXHJcbmNvbnN0IGhvc3QgPSBwcm9jZXNzLmVudi5UQVVSSV9ERVZfSE9TVDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgY3NzOiB7XHJcbiAgICBwb3N0Y3NzOiB7XHJcbiAgICAgIHBsdWdpbnM6IFt0YWlsd2luZCgpLCBhdXRvcHJlZml4ZXIoKV0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICBWaXRlUFdBKHtcclxuICAgICAgcmVnaXN0ZXJUeXBlOiAncHJvbXB0JyxcclxuICAgICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICBuYW1lOiAnRGV2Tm90ZScsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogJ0Rldk5vdGUnLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnRGV2Tm90ZScsXHJcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjMDIwODE3J1xyXG4gICAgICB9LFxyXG4gICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgbWF4aW11bUZpbGVTaXplVG9DYWNoZUluQnl0ZXM6IDEwMDAwMDAwLFxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIHZ1ZURldlRvb2xzKCksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2xlYXJTY3JlZW46IGZhbHNlLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgLy8gVGF1cmkgZXhwZWN0cyBhIGZpeGVkIHBvcnQsIGZhaWwgaWYgdGhhdCBwb3J0IGlzIG5vdCBhdmFpbGFibGVcclxuICAgIHN0cmljdFBvcnQ6IHRydWUsXHJcbiAgICAvLyBpZiB0aGUgaG9zdCBUYXVyaSBpcyBleHBlY3RpbmcgaXMgc2V0LCB1c2UgaXRcclxuICAgIGhvc3Q6IGhvc3QgfHwgZmFsc2UsXHJcbiAgICBwb3J0OiA1MTczLFxyXG4gIH0sXHJcbiAgLy8gRW52IHZhcmlhYmxlcyBzdGFydGluZyB3aXRoIHRoZSBpdGVtIG9mIGBlbnZQcmVmaXhgIHdpbGwgYmUgZXhwb3NlZCBpbiB0YXVyaSdzIHNvdXJjZSBjb2RlIHRocm91Z2ggYGltcG9ydC5tZXRhLmVudmAuXHJcbiAgZW52UHJlZml4OiBbJ1ZJVEVfJywgJ1RBVVJJX0VOVl8qJ10sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMDAsXHJcbiAgICB0YXJnZXQ6XHJcbiAgICAgIHByb2Nlc3MuZW52LlRBVVJJX0VOVl9QTEFURk9STSA9PSAnd2luZG93cydcclxuICAgICAgICA/ICdjaHJvbWUxMDUnXHJcbiAgICAgICAgOiAnc2FmYXJpMTMnLFxyXG4gICAgLy8gZG9uJ3QgbWluaWZ5IGZvciBkZWJ1ZyBidWlsZHNcclxuICAgIG1pbmlmeTogIXByb2Nlc3MuZW52LlRBVVJJX0VOVl9ERUJVRyA/ICdlc2J1aWxkJyA6IGZhbHNlLFxyXG4gICAgLy8gcHJvZHVjZSBzb3VyY2VtYXBzIGZvciBkZWJ1ZyBidWlsZHNcclxuICAgIHNvdXJjZW1hcDogISFwcm9jZXNzLmVudi5UQVVSSV9FTlZfREVCVUcsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSlcclxuICAgICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKClcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnWSxTQUFTLGVBQWUsV0FBVztBQUVuYSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sa0JBQWtCO0FBQ3pCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGlCQUFpQjtBQVA2TixJQUFNLDJDQUEyQztBQVN0UyxJQUFNLE9BQU8sUUFBUSxJQUFJO0FBRXpCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVMsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsTUFDZjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsK0JBQStCO0FBQUEsTUFDakM7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsYUFBYTtBQUFBLEVBQ2IsUUFBUTtBQUFBO0FBQUEsSUFFTixZQUFZO0FBQUE7QUFBQSxJQUVaLE1BQU0sUUFBUTtBQUFBLElBQ2QsTUFBTTtBQUFBLEVBQ1I7QUFBQTtBQUFBLEVBRUEsV0FBVyxDQUFDLFNBQVMsYUFBYTtBQUFBLEVBQ2xDLE9BQU87QUFBQSxJQUNMLHVCQUF1QjtBQUFBLElBQ3ZCLFFBQ0UsUUFBUSxJQUFJLHNCQUFzQixZQUM5QixjQUNBO0FBQUE7QUFBQSxJQUVOLFFBQVEsQ0FBQyxRQUFRLElBQUksa0JBQWtCLFlBQVk7QUFBQTtBQUFBLElBRW5ELFdBQVcsQ0FBQyxDQUFDLFFBQVEsSUFBSTtBQUFBLElBQ3pCLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWM7QUFDNUIsbUJBQU8sR0FBRyxTQUFTLEVBQUUsTUFBTSxlQUFlLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTO0FBQUEsUUFDMUU7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
