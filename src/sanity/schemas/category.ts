// Define a schema for a "category" document type using Sanity.io

// Import necessary functions from the "sanity" package
import { defineField, defineType } from "sanity";

// Define the "category" type with its properties
export default defineType({
  name: "category", // Type name
  title: "Category", // Type title
  type: "document", // Type as a document

  // Define fields for the "category" type
  fields: [
    // Title of the category
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    // Description of the category
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
  ],
});
