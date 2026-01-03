import { defineField, defineType } from "sanity";
import { CodeIcon } from "@sanity/icons";

export default defineType({
    name: "htmlBlock",
    title: "HTML Block",
    type: "object",
    icon: CodeIcon,
    fields: [
        defineField({
            name: "html",
            type: "text",
            title: "Raw HTML",
            description: "Paste your custom HTML code here. Be careful as this can break the layout.",
            rows: 10,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            type: "string",
            title: "Internal Description",
            description: "Briefly describe what this HTML block does (not visible on site)",
        }),
    ],
    preview: {
        select: {
            description: "description",
            html: "html",
        },
        prepare({ description, html }) {
            return {
                title: description || "Custom HTML Block",
                subtitle: html ? `${html.substring(0, 50)}...` : "Empty HTML",
            };
        },
    },
});
