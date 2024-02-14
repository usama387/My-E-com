"use client";
// it's a client component since i am using useSelector
import React, { useEffect, useState } from "react";
// this component is also a child of Container component
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../type";
import CartItem from "./CartItem";
import { resetCart } from "@/redux/orebiSlice";
import toast from "react-hot-toast";
import Image from "next/image";
import emptyCart from "@/assets/emptyCart.png";
import { motion } from "framer-motion";
import Link from "next/link";
import Price from "./Price";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const Cart = () => {
  // productData from redux with stateProps being mapped
  const { productData } = useSelector((state: StateProps) => state.orebi);

  // here dispatch triggers the event of resetting the cart with through handle reset function
  const dispatch = useDispatch();

  // useState hook for setting amount
  const [totalAmount, setTotalAmount] = useState(0);

  //Checking if I have any user session for restriction to checkout
  const { data: session } = useSession();

  //useEffect hook for variable pricing and calculation
  useEffect(() => {
    // accesing initial price in useState
    let price = 0;
    productData.map((item) => {
      // It maps productData to calculate it multiplies product price with quantity
      price += item?.price * item?.quantity;
      return price;
    });
    setTotalAmount(price);
    // ProductData is being loaded in the array
  }, [productData]);

  // A custom function to reset the cart
  const handleReset = () => {
    // confirming from the user
    const confirmed = window.confirm("Reset the Cart?");
    confirmed && dispatch(resetCart());
    toast.success("Cart reset done!");
  };

  //Another function that implements Stripe payment checkout after accepting productData in JSON
  // the ! at end means the key is available
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const createCheckout = async () => {
    // fetch stripe promise if there is user
    if (session?.user) {
      const stripe = await stripePromise;
      //here i will pass POST request
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        // header is content type and will send data in json format
        headers: { "Content-Type": "Application/json" },
        // it defines the body product data which is an array
        body: JSON.stringify({
          items: productData,
          email: session?.user.email,
        }),
      });
      // here i await response after passing data if ok then it redirects to checkout passing unique user session id 
      const data = await response.json();
      if (response.ok) {
        stripe?.redirectToCheckout({ sessionId: data.id });
      }
    } else {
      toast.error("Sign-in is required to checkout");
    }
  };

  return (
    <Container>
      {productData?.length > 0 ? (
        // parent div of grid container renders products if greater than 0
        <div className="pb-20">
          <div className="w-full h-20 bg-[#f5f7f7] text-primeColor hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-semibold ">
            <h2 className="col-span-2">Product</h2> <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          {/* In this div gonna map through my products */}
          <div className="mt-5">
            {productData.map((item) => (
              <div key={item?._id}>
                <CartItem item={item} />
              </div>
            ))}
          </div>
          {/* On clicking this button resets the cart */}
          <button
            onClick={handleReset}
            className="py-2 px-5 rounded-md bg-[#9400D3] text-white font-semibold uppercase mb-4 hover:bg-[#4B0082] duration-300"
          >
            Reset Cart
          </button>
          {/* This div contains coupon code heading and input  */}
          <div className="flex flex-col md:flex-row justify-between border p-4 items-center gap-2 md:gap-0">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold uppercase">Coupon Code</p>
              <input
                type="text"
                placeholder="Coupon Number"
                className="w-44 lg:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-[#191970]"
              />
            </div>
            <p>Update Cart</p>
          </div>
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart Totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal{" "}
                  <span>
                    <Price amount={totalAmount} />
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Care
                  <span className="font-semibold tracking-wide font-titleFont">
                    <Price amount={0} />
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-b-0 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-semibold tracking-wide font-titleFont">
                    <Price amount={totalAmount} />
                  </span>
                </p>
              </div>
              <div className="flex justify-end ">
                <button
                  onClick={createCheckout}
                  className="w-40 h-10 bg-primeColor text-white hover:bg-black duration-300 rounded-sm"
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // if the cart is empty this div with image renders wrapped framer motion for a smooth animation
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <Image
              src={emptyCart}
              alt="empty-cart image"
              className="w-80 rounded-lg p-4 mx-auto"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex flex-col gap-4 items-center rounded-md shadow-lg">
            <h1 className="text-xl font-bold uppercase">
              Hey!! Your Cart is Empty😯
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Please click continue shopping to add products and view your
              Cart😊
            </p>
            {/* <Link
              href={"/"}
              className="bg-[black] text-white rounded-md cursor-pointer px-3 hover:bg-[#1B1B1B] py-2 font-semibold text-lg duration-300"
            >
              Continue Shopping
            </Link> */}
          </div>
        </motion.div>
      )}
      {/* The button directs ths user on homepage */}
      <div className="flex items-center justify-end">
        <Link
          href={"/"}
          className="bg-[black] text-white rounded-md cursor-pointer px-5 hover:bg-[#1B1B1B] py-2 font-semibold text-sm duration-300 justify-end"
        >
          Continue To Shopping
        </Link>
      </div>
    </Container>
  );
};

export default Cart;
