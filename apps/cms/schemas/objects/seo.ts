import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      type: "string",
      title: "Meta Title",
      description: "Recommended: 50-60 characters. Include your focus keyword near the beginning.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      title: "Meta Description",
      description: "Recommended: 140-160 characters. Naturally include your focus keyword and create compelling copy.",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Social Share Image",
      description: "Recommended size: 1200x630 pixels",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "keywords",
      type: "array",
      title: "Internal Keywords (For Content Planning Only)",
      description: "Note: Not used in meta keywords tag (deprecated). Use for internal content strategy and topic organization.",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (rule) => rule.unique().max(15),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "SEO",
      };
    },
  },
});
