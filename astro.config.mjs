// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://tongkhobds.com",
  integrations: [react(), sitemap()],
  output: "server",
  adapter: node({ mode: "standalone" }),
  build: {
    inlineStylesheets: "auto",
  },
  image: {
    // Use sharp for high-quality image processing
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
    // Prepared for future CDN integration
    // domains: ['api.tongkhobds.com'],
    // remotePatterns: [{
    //   protocol: 'https',
    //   hostname: '*.tongkhobds.com',
    //   pathname: '/images/**'
    // }]
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client"],
    },
  },
});