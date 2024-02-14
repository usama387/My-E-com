// Importing necessary functions from the "sanity" library
import { defineField, defineType } from "sanity";

// Defining a document type called "banner"
export default defineType({
  type: "document",
  name: "banner",
  title: "Banner",
  
  // Defining fields for the "banner" document
  fields: [
    // Adding a string field for the banner title
    defineField({
      name: "title",
      title: "Banner",
      type: "string",
    }),
    
    // Adding an image field for the banner with some additional settings
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Banner Image",
      
      // Ensuring the image field is required
      validation: (rule) => rule.required(),
      
      // Configuring image options like hotspot
      options: {
        hotspot: true,
      },
      
      // Configuring the preview of the image field
      preview: {
        select: {
          imageUrl: "asset.url", // Displaying the image URL
          title: "caption",      // Displaying the image caption
        },
      },
    }),
  ],
  
  // Configuring the preview of the entire "banner" document
  preview: {
    select: {
      title: "title",  // Displaying the banner title in the preview
      media: "image",  // Displaying the image as media in the preview
    },
  },
});
