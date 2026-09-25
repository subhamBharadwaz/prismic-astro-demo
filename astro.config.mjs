import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const owner = process.env.GITHUB_REPOSITORY?.split("/")[0];
const isProjectPage = repository && !repository.endsWith(".github.io");

export default defineConfig({
  output: "static",
  // GitHub project sites live at /repository-name/, while normal hosting uses /.
  base: process.env.GITHUB_ACTIONS && isProjectPage ? `/${repository}` : "/",
  site: owner ? `https://${owner}.github.io` : undefined,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
