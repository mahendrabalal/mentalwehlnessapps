import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role",
      description: "Professional focus (e.g., Clinical Psychologist).",
    }),
    defineField({
      name: "bio",
      type: "array",
      title: "Bio",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "headshot",
      type: "image",
      title: "Headshot",
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
      name: "linkedin",
      type: "url",
      title: "LinkedIn URL",
    }),
    defineField({
      name: "credentials",
      type: "string",
      title: "Credentials",
      description: "Comma-separated list of credentials to show publicly.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "headshot",
    },
  },
});
