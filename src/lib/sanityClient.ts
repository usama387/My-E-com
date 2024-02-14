// Import necessary functions from the "next-sanity" and "@sanity/image-url" packages
import { createClient, groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Retrieve Sanity.io configuration from environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.NEXT_PUBLIC_SANITY_TOKEN;

// Create a Sanity client with the specified configuration
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Disable Content Delivery Network (CDN) for real-time data fetching
});

// Create an image URL builder using the Sanity client
const builder = imageUrlBuilder(client);

/**
 * Generates and returns an image URL for the provided source using the configured builder.
 * @param {any} source - The image source to generate the URL for.
 * @returns {string} - The generated image URL.
 */
export const urlFor = (source: any) => {
  return builder.image(source);
};

// Through this helper function fetching all the products in descending order created in sanity without specifying category 
export const productQuery = groq`*[_type == 'product']{
  ...
} | order(_createdAt desc)`;

// this function is fetching upward created productQuery and whenever i call this function it's gonna return that product data
export const products = async()=>{
  const productData = await client.fetch(productQuery);
  return productData;
}
