import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        server: {
            proxy:
                mode === "development"
                    ? {
                          "/gameService": {
                              target: "https://sees-attributes-lcd-nasa.trycloudflare.com",
                              changeOrigin: true,
                              secure: false,
                              rewrite: (path) =>
                                  path.replace(/^\/gameService/, ""),
                          },
                          "/ssoService": {
                              target: "https://sees-attributes-lcd-nasa.trycloudflare.com",
                              changeOrigin: true,
                              secure: false,
                              rewrite: (path) =>
                                  path.replace(/^\/ssoService/, ""),
                          },
                      }
                    : undefined,
        },
        plugins: [
            react(),
            mode === "development"
                ? mkcert()
                : ((): PluginOption[] => {
                      return [];
                  })(),
        ],
    };
});
