import React from "react";
// this component is children of Container component
import Container from "./Container";
import Heading from "./Heading";
import { ProductProps } from "../../type";
import Product from "./Product";

// now defining the datatype of my props since the ProductProps is an array i will utilize it in map to define unique key 
interface Props {
  products: ProductProps[];
  title?: string;
}

// Here two things i am accepting as props the first is title from parent and other is product props
const BestSellers = ({ products, title }: Props) => {
  return (
    <Container className="w-full pb-20 ">
      {/* Passing Heading component on the top to be shown which is child of container component and then accessing title prop in it coming from parent in the page.tsx */}
      <Heading heading={title} />
      {/* css settings for individual component on different screens */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products?.map((item: ProductProps) => (
          <Product key={item?._id} product={item} bg="#ffffff20"/>
        ))}
      </div>
    </Container>
  );
};

export default BestSellers;
