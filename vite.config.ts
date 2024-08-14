import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/adminApi": {
                target: "https://propecia-wc-instances-cruise.trycloudflare.com",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/adminApi/, ""),
            },
        },
    },
    plugins: [react()],
});
