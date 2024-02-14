"use client";
// it's also a client side component since i am using dispatch from redux here
import React from "react";
import { ProductProps } from "../../type";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import { BsArrowsFullscreen } from "react-icons/bs";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/orebiSlice";
import toast, { Toaster } from "react-hot-toast";

// 2) here the product is s single item of products and it inherits the datatype ProductProps
interface Props {
  product: ProductProps;
  bg?: string;
}

// 1) My main function and product is coming from New Arrival component where i mapped the products
const Product = ({ product, bg }: Props) => {
  // creating my dispatch function here
  const dispatch = useDispatch();

  return (
    <>
      {/* 3)Most outer div as container and border */}
      <div className="w-full relative group border-[1px] border-black hover:shadow-lg duration-200 shadow-gray-500 rounded-md overflow-hidden group">
        <div className="w-full h-80 flex items-center justify-center bg-white overflow-hidden">
          <div className={`relative ${bg}`}>
            {/* here i will pass the slug for product to be shown on single page  */}
            <Link href={`/product/${product?.slug?.current}`}>
              <Image
                src={urlFor(product?.image).url()}
                alt="product"
                width={700}
                height={700}
                className="w-72 h-72 object-contain"
              />
            </Link>
            {/* Parent div has styling which on hover (functionality starts from 110% to duration 300) contains two links that will let the user to add item to the cart or quick view the product */}
            <div className="absolute bottom-0 flex items-center gap-5 justify-center translate-y-[110%] group-hover:-translate-y-2 transition-transform duration-300">
              {/* here i call my dispatch function to execute addToCart action created in redux and i will inject my product in it getting as a prop in main function parameter*/}
              <button
                onClick={() => {
                  dispatch(addToCart(product));
                  toast.success(
                    `${product?.title.substring(0, 12)}... Added to Cart`
                  );
                }}
                className="bg-gray-800 text-gray-200 px-4 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-gray-950 hover:text-white duration-200"
              >
                <span>
                  <AiOutlineShopping />
                </span>
                Add to cart
              </button>
              <Link
                href={`/product/${product?.slug?.current}`}
                className="bg-gray-800 text-gray-200 px-4 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-gray-950 hover:text-white duration-200"
              >
                <span>
                  <BsArrowsFullscreen />
                </span>
                Full View
              </Link>
            </div>
            {/* Conditional rendering it verifies the array of product has isnew= true if it has it just mark it as New on top of product */}
            {product?.isnew && (
              <div className="absolute top-2 right-2 ">
                <p className="bg-primeColor px-4 py-1 text-white flex justify-center items-center text-sm font-semibold hover:bg-black duration-300 cursor-pointer rounded-md">
                  New
                </p>
              </div>
            )}
          </div>
        </div>
        {/* The following div contain product pricing and other data */}
        <div className="max-w-80 py-6 flex flex-col gap-1 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-primeColor font-bold">
              {/* Product Title the substring limits the string length */}
              {product?.title.substring(0, 15)}
            </h2>
            {/* Row or discounted price of product */}
            <div className="flex items-center gap-2">
              {/* Line through denotes the cancelled price */}
              <p className="text-[#767676] text-xs line-through">
                ${product?.rowprice}
              </p>
              <p className="font-semibold">${product?.price}</p>
            </div>
          </div>
          {/* More data about Product */}
          <div className="flex items-center justify-between">
            <p className="text-[#767676] text-[sm]">
              a product by{" "}
              <span className="font-semibold text-primeColor">
                {product?.brand}
              </span>
            </p>
            <div className="flex items-center gap-1">
              <MdOutlineStarPurple500 className="text-lg text-yellow-500" />
              <span className="font-medium text-sm">{product?.ratings}</span>
            </div>
          </div>
        </div>
        {/* Settings For the Toaster */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#000",
              color: "#fff",
            },
          }}
        />
      </div>
    </>
  );
};

export default Product;
