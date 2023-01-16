import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    sitemap(),
    solid(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
  site: "https://blog.mrcai.dev",
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
