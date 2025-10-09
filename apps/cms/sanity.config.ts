import { defineConfig, type PluginOptions } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

type EnvBag = Record<string, string | undefined>;

const importMetaEnv =
  ((import.meta as unknown as { env?: EnvBag }).env ?? {}) as EnvBag;

const envSources: EnvBag[] = [
  (typeof process !== "undefined" ? (process.env as EnvBag) : {}) ?? {},
  importMetaEnv,
];

const readEnv = (...keys: string[]): string | undefined => {
  for (const key of keys) {
    for (const source of envSources) {
      const value = source?.[key];
      if (typeof value === "string" && value.length > 0) {
        return value;
      }
    }
  }
  return undefined;
};

const enableVision = (readEnv("NODE_ENV") ?? process.env.NODE_ENV) === "development";

const projectId = readEnv(
  "SANITY_STUDIO_PROJECT_ID",
  "SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_PROJECT_ID"
);

if (!projectId) {
  throw new Error(
    "Missing SANITY_PROJECT_ID. Copy apps/cms/.env.local.example and set your Sanity project id."
  );
}

const dataset =
  readEnv("SANITY_STUDIO_DATASET", "SANITY_DATASET", "NEXT_PUBLIC_SANITY_DATASET") ??
  "production";

const plugins: PluginOptions[] = [
  deskTool({
    structure: (S) =>
      S.list()
        .title("Content")
        .items([
          S.listItem()
            .title("Articles")
            .schemaType("article")
            .child(S.documentTypeList("article").title("Articles")),
          S.listItem()
            .title("Authors")
            .schemaType("author")
            .child(S.documentTypeList("author").title("Authors")),
          S.divider(),
          S.listItem()
            .title("Site Settings")
            .schemaType("siteSettings")
            .child(
              S.editor()
                .id("siteSettings")
                .schemaType("siteSettings")
                .documentId("siteSettings")
            ),
        ]),
  }),
  ...(enableVision ? [visionTool()] : []),
];

export default defineConfig({
  name: "mental-wellness-studio",
  title: "Mental Wellness Studio",
  projectId,
  dataset,
  basePath: "/admin",
  plugins,
  schema: {
    types: schemaTypes,
  },
});
