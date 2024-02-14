"use client";
// Importing necessary icons and components from external libraries

import { RiShoppingCart2Fill } from "react-icons/ri";
import Link from "next/link";
import { useSelector } from "react-redux";
import { StateProps } from "../../type";
import { signIn, useSession } from "next-auth/react";
import { MdSwitchAccount } from "react-icons/md";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

// Functional component for the page buttons
const PageButton = () => {
  // let's access the product from redux store to perform operations by destructuring it by using useSelector
  const { productData } = useSelector((state: StateProps) => state.orebi);

  // Accessing session data of the user
  const { data: session } = useSession();

  return (
    // Container for the page buttons with fixed position, spacing, and stacking order
    <div className="fixed top-60 right-2 z-20 flex flex-col gap-2">
      {/* Cart Button */}
      <Link
        href={"/cart"}
        // Styling for the profile button, including dimensions, colors, and shadows
        className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative "
      >
        {/* Icon for the profile button with hover effect for a subtle animation */}
        <div className="flex justify-center items-center">
          <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200 " />
          <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200 " />
        </div>
        {/* Text label for the profile button */}
        <p className="text-xs font-semibold">Buy Now</p>
      </Link>

      {/* Profile Button */}
      <button
        //  if user is not logged in only then redirect to sign in
        onClick={() =>
          !session?.user ? signIn() : toast.error("Already Signed-in")
        }
        // Styling for the cart button, including dimensions, colors, and shadows
        className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer"
      >
        <div className="flex justify-center items-center">
          {session?.user ? (
            <Image
              src={session?.user?.image!}
              alt="user image"
              width={35}
              height={35}
              className="rounded-full -translate-x-12 group-hover:translate-x-4 transition-transform duration-200"
            />
          ) : (
            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          )}
          {session?.user ? (
            <Image
              src={session?.user?.image!}
              alt="user image"
              width={35}
              height={35}
              className="rounded-full -translate-x-4 group-hover:translate-x-12 transition-transform duration-200"
            />
          ) : (
            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          )}
        </div>
        {/* This button is dynamic if user session is available it will render profile other Login  */}
        <p className="text-xs font-semibold text-blue-500">
          {session?.user ? "Profile" : "Login"}
        </p>
        <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold ">
          {/* Number of Items in Cart */}
          {/* if checks and renders number of products if exist otherwise zero */}
          {productData ? productData.length : 0}
        </p>
      </button>
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

// Exporting the PageButton component as the default export
export default PageButton;
