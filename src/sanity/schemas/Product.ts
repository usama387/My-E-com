// Define a schema for a "product" document type using Sanity.io

// Import necessary functions from the "sanity" package
import { defineField, defineType } from "sanity";

// Define the "product" type with its properties
export default defineType({
  name: "product", // Type name
  title: "Product", // Type title
  type: "document", // Type as a document

  // Define fields for the "product" type
  fields: [
    // Title of the product (required)
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Keep the title relative to the product",
      validation: (rule) => rule.required(),
    }),

    // Slug for the product (required)
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    // Description of the product
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),

    // Image of the product with hotspot option
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    // Category of the product (required, reference to another "category" type)
    defineField({
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (rule) => rule.required(),
    }),

    // Price of the product (required)
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required(),
    }),

    // Row price of the product
    defineField({
      name: "rowprice",
      title: "Row Price",
      type: "number",
    }),

    // Ratings for the product (must be equal or below 5)
    defineField({
      name: "ratings",
      title: "Ratings",
      type: "number",
      description: "Ratings must be equal or below 5",
    }),

    // Whether the product is a new arrival or not
    defineField({
      name: "isnew",
      title: "New Arrival",
      type: "boolean",
    }),
    // Body content of the product
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),

    // Position of the product
    defineField({
      name: "position",
      title: "Position",
      type: "string",
    }),

    // Brand of the product
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
    }),

    // Quantity of the product
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
    }),
  ],

  // Preview configuration for displaying the product in the Sanity Studio
  preview: {
    select: {
      title: "title",
      media: "image",
      position: "position",
    },
  },
});
