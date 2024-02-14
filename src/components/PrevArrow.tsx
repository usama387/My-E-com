import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const PrevArrow = (props: any) => {
  // the onClick function provokes the props from product and the component is being accessed in NewArrival slider settings to work
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="w-14 h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex items-center justify-center z-10 absolute top-[35%] left-2"
    >
      <span className="text-xl ">
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};

export default PrevArrow;
