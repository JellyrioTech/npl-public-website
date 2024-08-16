import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/gameService": {
                target: "http://localhost:3600",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/gameService/, ""),
            },
            "/ssoService": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/ssoService/, ""),
            },
        },
    },
    plugins: [react(), mkcert()],
});
