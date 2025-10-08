import { defineField, defineType } from "sanity";

export default defineType({
  name: "callout",
  type: "object",
  title: "Callout",
  fields: [
    defineField({
      name: "intent",
      type: "string",
      title: "Intent",
      initialValue: "info",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Success", value: "success" },
          { title: "Warning", value: "warning" },
          { title: "Critical", value: "critical" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      title: "Message",
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
  ],
  preview: {
    select: {
      intent: "intent",
      body: "body",
    },
    prepare({ intent, body }) {
      return {
        title: `${intent?.toUpperCase() ?? "INFO"} Callout`,
        subtitle: body,
      };
    },
  },
});
