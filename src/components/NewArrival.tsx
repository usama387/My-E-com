"use client";
// making it a client component since we i use react-slick here
import React from "react";
import Container from "./Container";
import Slider from "react-slick";

import Product from "./Product";
import { ProductProps } from "../../type";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

//3) Atlast here i define the datatype for props which is being destructred in newArrival function which is an array coming from sanity studio
interface Props {
  products: ProductProps[];
}

// 1)The container is a component itself & has a specific, dynamic layout passed into New Arrival making it child of container to show newly arrived products
const NewArrival = ({ products }: Props) => {
  // 4)Here i defined the settings of the slider to make it work
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // NextArrow is a component that show the next product when clicked
    nextArrow:<NextArrow />,
    // PrevArrow is also a component that show the previous product
    prevArrow:<PrevArrow />,
    // responsiveness of slider at different breakpoints of different sizes of screens  
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <Container className="-mt-60">
      <div>
        <Slider {...settings}>
          {/* 2)Note that here ProductProps is a typescript interface where i defined the data types for products being fetched from query */}
          {products?.map((item: ProductProps) => (
            <div key={item?._id} className="px-2">
              {/* here i am passing item as an entire product in the product component to be show as a single product when clicked upon */}
              <Product product={item} />
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default NewArrival;
