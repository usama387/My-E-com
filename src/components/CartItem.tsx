"use client";
// this is a client component since i am using dispatch function here
import React from "react";
import { ProductProps } from "../../type";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import Price from "./Price";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/redux/orebiSlice";

// The item Props is coming from Cart component
interface Props {
  item: ProductProps;
}

const CartItem = ({ item }: Props) => {
  // note that dispatch comes from redux to trigger event of decreaseQuantity to remove in first span and increaseQuantity to add product in second span
  const dispatch = useDispatch();

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4 ">
        {/* Icon to delete an entire Product from cart */}
        <ImCross
          onClick={() => {
            dispatch(deleteProduct(item?._id));
            toast.success(
              `${item?.title.substring(0, 12)}... deleted from Cart`
            );
          }}
          className="text-primeColor hover:text-red-500 cursor-pointer duration-300"
        />
        {/* Link that renders slug Image */}
        <Link href={`/product/${item?.slug?.current}`}>
          <Image
            src={urlFor(item?.image).url()}
            alt="product-image"
            width={50}
            height={50}
            className="w-32 h-32 object-contain cursor-pointer"
          />
        </Link>
        {/* It renders title of each product with 12 characters max mapped through item */}
        <h1 className="font-semibold ">{item?.title.substring(0, 20)}</h1>
      </div>
      {/* Parent div of grid view */}
      <div className="col-span-5 md:col-span-3 flex items-center justify-between py-4 md:py-0 px-4 lg:px-0">
        {/* To display price grid passing my price component */}
        <p className="flex w-1/3 items-center text-lg font-semibold">
          <Price amount={item?.price} />
        </p>

        {/* Parent div of two spans using dispatch and onClick to add or reduce */}
        <div className="flex w-1/3 items-center gap-6 text-lg">
          <span
            onClick={() => {
              item.quantity === 1
                ? toast.error("Product quantity cannot be reduced further")
                : (dispatch(decreaseQuantity({ _id: item?._id })),
                  toast.success("Product removed successfully"));
            }}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-500 rounded-sm"
          >
            -
          </span>

          <p>{item?.quantity}</p>
          <span
            onClick={() => {
              item.quantity === 5
                ? toast.error("You cannot order more than 5 pieces")
                : (dispatch(increaseQuantity({ _id: item?._id })),
                  toast.success("Product added successfully"));
            }}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-500 rounded-sm"
          >
            +
          </span>
        </div>

        {/* Parent div of Price Calculator */}
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>{item?.quantity * item?.price}</p>
        </div>
      </div>
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
  );
};

export default CartItem;
