import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_PROJECT_ID ?? "4t9s1x2a",
    dataset: process.env.SANITY_DATASET ?? "production",
  },
  vite: {
    define: {
      __DEV_PREVIEW_ENABLED__: process.env.SANITY_ENABLE_PREVIEW === "true",
    },
  },
});
