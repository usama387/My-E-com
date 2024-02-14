// Importing required dependencies and components
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HiMenuAlt2 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  // Getting the current URL path
  const pathname = usePathname();

  // Managing state for the mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Accessing session data of the user
  const { data: session } = useSession();

  // Array of navigation links
  const navBarList = [
    {
      _id: 1001,
      title: "Home",
      link: "/",
    },
    {
      _id: 1002,
      title: "Shop",
      link: "/shop",
    },
    {
      _id: 1003,
      title: "Cart",
      link: "/cart",
    },
    {
      _id: 1004,
      title: "Profile",
      link: "/profile",
    },
    {
      _id: 1005,
      title: "Studio",
      link: "/studio",
    },
  ];

  // JSX structure for the Navbar component
  return (
    <div className="w-full h-20 bg-[#533FD7] text-[#54F3A6] border-b-[1px] border-b-gray-400 sticky top-0 z-50">
      <nav className="h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center justify-between gap-4 ">
        {/* Logo with a link to the home page */}
        <Link href={"/"}>
          <h3 className="uppercase text-2xl text-[#54F3A6] font-semibold">
            Usamakeepscode
          </h3>
        </Link>

        {/* Nav links for larger screens */}
        <div className="hidden md:inline-flex items-center gap-4 ">
          {/* Mapping through navBarList to render navigation links */}
          {navBarList.map((item) => (
            <Link
              href={item?.link}
              key={item?.link}
              // Applying Tailwind CSS classes to style each navigation link
              className={`flex hover:font-medium w-20 h-6 justify-center items-center px-12 hover:underline  underline-offset-4 duration-200 ${
                // Adding conditional class to highlight the active link based on the current pathname
                pathname === item?.link && "underline"
              }`}
            >
              {item?.title}
            </Link>
          ))}

          {/* Rendering logout button if user is authenticated */}
          {session?.user && (
            <button
              onClick={() => signOut()}
              // Applying Tailwind CSS classes to style the logout button
              className="flex hover:font-medium w-20 h-6 justify-center items-center px-12 hover:underline underline-offset-4 duration-200"
            >
              Logout
            </button>
          )}
        </div>

        {/* Menu icon for mobile screens */}
        <HiMenuAlt2
          // Applying Tailwind CSS classes to style the menu icon
          className="inline-flex md:hidden cursor-pointer w-8 h-6"
          // Handling click event to toggle mobile menu visibility
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col items-center gap-2 absolute top-20 left-0 right-0 bg-[#533FD7] border-b-[1px] border-b-white">
            {/* Mapping through navBarList to render navigation links in mobile menu */}
            {navBarList.map((item) => (
              <Link
                key={item?.link}
                href={item?.link}
                // Applying Tailwind CSS classes to style each navigation link in mobile menu
                className={`w-full py-2 px-4 hover:underline duration-200 ${
                  // Adding conditional class to highlight the active link based on the current pathname
                  pathname === item?.link && "underline"
                }`}
              >
                {item?.title}
              </Link>
            ))}
            {/* Rendering logout button in mobile menu if user is authenticated */}
            {session?.user && (
              <button
                onClick={() => signOut()}
                // Applying Tailwind CSS classes to style the logout button in mobile menu
                className="w-full py-2 px-4 hover:underline duration-200"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

// Exporting the Navbar component
export default Navbar;
