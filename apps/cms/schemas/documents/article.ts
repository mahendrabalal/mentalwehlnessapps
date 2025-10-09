import {
  defineArrayMember,
  defineField,
  defineType,
  SlugValidationContext,
  type SlugValue,
} from "sanity";

const slugIsUnique = (
  value: SlugValue | undefined,
  context: SlugValidationContext
) => {
  const slug = value?.current?.trim();
  if (!slug) {
    return true;
  }

  const { document, getClient } = context;
  const id = document?._id?.replace(/^drafts\./, "");
  const client = getClient({ apiVersion: "2023-10-25" });
  const params = {
    slug,
    draftId: id ? `drafts.${id}` : undefined,
    publishedId: id,
  };
  return client
    .fetch<string | null>(
      `*[_type == "article" && slug.current == $slug && !(_id in [$draftId, $publishedId])][0]._id`,
      params
    )
    .then((existing) => (existing ? "Slug already in use" : true));
};

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "metadata", title: "Metadata" },
    { name: "compliance", title: "Compliance" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: "content",
      validation: (rule) => rule.required().min(8).max(120),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      group: "content",
      options: {
        source: "title",
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 96),
      },
      validation: (rule) =>
        rule
          .required()
          .custom((value, context) =>
            slugIsUnique(value, context as SlugValidationContext)
          ),
    }),
    defineField({
      name: "status",
      type: "string",
      title: "Editorial Status",
      group: "metadata",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "In Review", value: "inReview" },
          { title: "Ready", value: "ready" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Summary",
      group: "metadata",
      rows: 3,
      validation: (rule) => rule.required().min(40).max(220),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      group: "metadata",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
      },
    }),
    defineField({
      name: "body",
      type: "array",
      title: "Body Content",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "External link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) => rule.uri({ allowRelative: false }),
                  }),
                  defineField({
                    name: "label",
                    type: "string",
                    title: "Accessible Label",
                    validation: (rule) => rule.required(),
                  }),
                  defineField({
                    name: "nofollow",
                    type: "boolean",
                    title: "nofollow",
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
            }),
          ],
        }),
        defineArrayMember({
          type: "callout",
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "readingTime",
      type: "number",
      title: "Estimated Reading Time (minutes)",
      group: "metadata",
      validation: (rule) => rule.min(1).max(60),
    }),
    defineField({
      name: "topics",
      type: "array",
      title: "Topics",
      group: "metadata",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (rule) => rule.unique().max(8),
    }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Hero Image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "credit",
          type: "string",
          title: "Image Credit",
        }),
      ],
    }),
    defineField({
      name: "authors",
      type: "array",
      title: "Authors",
      group: "metadata",
      of: [{ type: "reference", to: [{ type: "author" }] }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "clinicalReview",
      type: "clinicalReview",
      title: "Clinical Review Metadata",
      group: "compliance",
    }),
    defineField({
      name: "hipaaDisclaimerOverride",
      type: "text",
      title: "HIPAA Disclaimer Override",
      description:
        "Optional override for the default disclaimer. Leave blank to use the global message.",
      group: "compliance",
      rows: 3,
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Metadata",
      group: "metadata",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "heroImage",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        media,
        subtitle:
          (status ? `[${status.toUpperCase()}] ` : "") +
          (subtitle ?? "No summary provided"),
      };
    },
  },
});
