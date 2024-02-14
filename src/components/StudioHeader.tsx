import React from "react";
import logo from "@/assets/logoLight.png";
import Image from "next/image";
import Link from "next/link";
import { IoReturnDownBack } from "react-icons/io5";

// for getting default options
const StudioHeader = (props: any) => {
  return (
    <div>
      <div className="p-5 bg-black text-gray-100 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-3 font-semibold hover:text-blue-600 duration-200">
          <IoReturnDownBack className="text-2xl" /> Go back to App
        </Link>
        <Image src={logo} alt="logo" className="w-24" />
        <p className="text-sm ">Admin Studio for OREBI</p>
      </div>
      {props.renderDefault(props)}
    </div>
  );
};

export default StudioHeader;
