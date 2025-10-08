import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Site Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Site Description",
      rows: 2,
    }),
    defineField({
      name: "defaultHeroImage",
      type: "image",
      title: "Default Hero Image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "hipaaDisclaimer",
      type: "text",
      title: "HIPAA Disclaimer",
      rows: 4,
      description:
        "Displayed on every article to clarify informational purpose and emergency resources.",
      validation: (rule) =>
        rule.required().max(400).warning("Keep the disclaimer concise."),
    }),
    defineField({
      name: "crisisHotline",
      type: "string",
      title: "Crisis Hotline",
      description: "Primary emergency number or hotline to display globally.",
    }),
    defineField({
      name: "socialSharing",
      type: "seo",
      title: "Default Social Sharing Metadata",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Global Site Settings",
      };
    },
  },
});
