// this page is also a child of container component to show single product in detail on click
import Container from "@/components/Container";
import OnSale from "@/components/OnSale";
import { client, urlFor } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import Image from "next/image";
import { ProductProps } from "../../../../../type";
import ProductInfo from "@/components/ProductInfo";
import { PortableText } from "@portabletext/react";
import { RichText } from "@/components/RichText";

interface Props {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => {
  const query = groq`*[_type == 'product']{
        slug
    }`;

  const slugs: any = await client.fetch(query);

  const slugRoutes = slugs.map((slug: any) => slug?.slug?.current);
  return slugRoutes?.map((slug: string) => ({
    slug,
  }));
};

const specialOffersQuery = groq`*[_type == 'product' && position == 'on Sale']{
  ...
} | order(_createdAt asc)`;

const SinglePage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == 'product' && slug.current == $slug][0]{
    ...
  }`;

  const product: ProductProps = await client.fetch(query, { slug });
  // this query is being passed in on sale component
  const specialOffersProduct = await client.fetch(specialOffersQuery);

  return (
    <Container className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 bg-gray-100 p-4">
        {/* this div renders product on sale */}
        <div>
          <OnSale products={specialOffersProduct} />
        </div>
        {/* this div renders single product slug page when clicked */}
        <div className="h-full xl:col-span-2 ">
          <Image
            src={urlFor(product?.image).url()}
            alt="product image"
            className="w-full h-full object-contain"
            width={500}
            height={500}
          />
        </div>
        {/* this div requires client side operation such as add to cart so will import that component in this div to keep it a server component */}
        <div className=" w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
          {/* passing entire products as props so that it can access product info */}
          <ProductInfo product={product} />
        </div>
      </div>
      <h2 className="text-start py-2 font-semibold text-blue-700">
        About this Product
      </h2>
      {/* Note that RichText is a separate component contains different parameters of designs */}
      <PortableText value={product?.body} components={RichText} />
    </Container>
  );
};

export default SinglePage;
