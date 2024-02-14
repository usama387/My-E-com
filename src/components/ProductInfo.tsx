"use client";
import React from "react";
import { ProductProps } from "../../type";
import Price from "./Price";

interface Props {
  product: ProductProps;
}

const ProductInfo = ({ product }: Props) => {
  return (
    <div>
      {/* it maps and displays the product title on slug page */}
      <h2 className="text-4xl font-semibold ">{product?.title}</h2>
      <div className="flex items-center gap-4 ">
        {/* Reusing my price component here and passing original price in it */}
        <p className="text-lg font-normal text-gray-500 line-through ">
          <Price amount={product?.rowprice} />
        </p>

        {/* it renders discounted price */}
        <Price amount={product?.price} className="text-lg from-bold " />

        <p className="text-sm">
          You saved{" "}
          <Price
            className="bg-green-700 text-white px-2 rounded-md "
            amount={product?.rowprice - product?.price}
          />
          on this item
        </p>
      </div>
      <p className="font-semibold tracking-wide text-gray-600">
        {product?.description}
      </p>
      <p className="text-semibold text-gray-500 mt-4">
        Write your first review.
      </p>
      {/* Add to Cart Button */}
      <button className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg rounded-md mt-4">
        Add to Cart
      </button>
      <p className="font-normal text-sm mt-4 ">
        <span className="text-sm font-medium ">Categories: </span>Spring
        Collection, Streetwear, Women Tags: Featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
