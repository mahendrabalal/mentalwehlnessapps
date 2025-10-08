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
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      title: "Meta Description",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Social Share Image",
      options: {
        hotspot: true,
      },
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
