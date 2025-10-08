import { defineField, defineType } from "sanity";

export default defineType({
  name: "clinicalReview",
  title: "Clinical Review",
  type: "object",
  fields: [
    defineField({
      name: "reviewer",
      type: "string",
      title: "Reviewer Name",
      description: "Licensed clinician who approved the content.",
    }),
    defineField({
      name: "credential",
      type: "string",
      title: "Credentials",
      description: "Clinical credentials (e.g., PhD, LCSW).",
    }),
    defineField({
      name: "reviewedAt",
      type: "datetime",
      title: "Reviewed At",
      description: "Date and time the article was medically reviewed.",
    }),
    defineField({
      name: "notes",
      type: "text",
      title: "Notes",
      rows: 4,
      description: "Optional review notes that should not surface publicly.",
    }),
  ],
  preview: {
    select: {
      reviewer: "reviewer",
      reviewedAt: "reviewedAt",
    },
    prepare({ reviewer, reviewedAt }) {
      return {
        title: reviewer ? `Reviewed by ${reviewer}` : "Clinical Review",
        subtitle: reviewedAt
          ? new Date(reviewedAt).toLocaleDateString()
          : "Awaiting review",
      };
    },
  },
});
