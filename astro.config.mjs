import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), image(), partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  })],
  output: 'static',
  site: 'https://www.cavazzo.com.mx'
});