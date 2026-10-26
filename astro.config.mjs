import { defineConfig } from "astro/config";

// SITE_URL and BASE_PATH are filled in automatically by the GitHub Pages
// workflow (.github/workflows/deploy.yml). Locally the site runs at "/".
export default defineConfig({
  site: process.env.SITE_URL || "http://localhost:4321",
  base: process.env.BASE_PATH || "/",
  trailingSlash: "ignore",
});
