// Define a schema for a "blockContent" array type using Sanity.io

// Import necessary functions from the "sanity" package
import { defineArrayMember, defineType } from "sanity";

// Define the "blockContent" type as an array
export default defineType({
  name: "blockContent", // Type name
  title: "Block Content", // Type title
  type: "array", // Type as an array

  // Define members (elements) of the "blockContent" array
  of: [
    // Block element with styles, lists, and marks configuration
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),

    // Image element with hotspot option
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
