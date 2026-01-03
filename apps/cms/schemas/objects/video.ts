import { defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

export default defineType({
    name: "video",
    title: "Video",
    type: "object",
    icon: PlayIcon,
    fields: [
        defineField({
            name: "url",
            type: "url",
            title: "Video URL",
            description: "Paste the URL of a YouTube or Vimeo video",
            validation: (Rule) =>
                Rule.required().custom((url) => {
                    if (!url) return true;
                    const isYouTube = url.match(
                        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
                    );
                    const isVimeo = url.match(
                        /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/
                    );
                    if (isYouTube || isVimeo) return true;
                    return "Only YouTube and Vimeo URLs are currently supported";
                }),
        }),
        defineField({
            name: "alt",
            type: "string",
            title: "Alt Text",
            description: "Description of the video for accessibility",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "caption",
            type: "string",
            title: "Caption",
        }),
    ],
    preview: {
        select: {
            url: "url",
            title: "alt",
        },
        prepare({ url, title }) {
            return {
                title: title || "Video",
                subtitle: url,
            };
        },
    },
});
