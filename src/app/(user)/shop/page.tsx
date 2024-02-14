"use client";
// this is a client component since it provides user triggered view options
import Container from "@/components/Container";
import { products } from "@/lib/sanityClient";
import React, { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { ProductProps } from "../../../../type";
import Product from "@/components/Product";
import ListProducts from "@/components/ListProducts";

const ShopPage = () => {
  // two useState parameters to provide grid and list view and by default the grid view will be rendered so i kept it true
  const [showGrid, setShowGrid] = useState(true);
  const [showList, setShowList] = useState(false);

  // By default it will be entry array to be passed in useEffect
  const [productData, setProductData] = useState([]);

  // now rendering it with useEffect and passing that until array and then the products function is passed into a try catch block which fetches all the products from productQuery and they are both written in lib sanity client folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await products();
        // using useState and passing in fetched data
        setProductData(data);
      } catch (error) {
        console.log("Products fetch nahi hoye:", error);
      }
    };
    // now passing and invoking it
    fetchData();
  }, []);

  console.log(productData);

  return (
    <Container>
      {/* This page is also a child of Container component  */}
      {/* Main parent div  */}
      <div className="flex items-center justify-between pb-10">
        <h2 className="text-2xl text-teal-700 font-bold ">All Products</h2>
        {/* Parent div of both icon buttons */}
        <div className="flex items-center justify-between gap-4">
          {/* it contains grid view icon and the styling will be decided if Grid view available the first style will be rendered otherwise second */}
          <span
            // this onClick ensures setShowGrid is rendered
            onClick={() => {
              setShowGrid(true);
              setShowList(false);
            }}
            className={`${
              showGrid
                ? "bg-primeColor text-white "
                : "border-[1px] border-gray-300 text-[#737373] "
            } w-8 h-8 text-lg flex items-center justify-center cursor-pointer`}
          >
            <BsGridFill />
          </span>
          {/* SECOND BUTTON FOR LIST VIEW which is rendered through onClick */}
          <span
            // this onClick ensures setShowList is rendered
            onClick={() => {
              setShowGrid(false);
              setShowList(true);
            }}
            className={`${
              showList
                ? "bg-primeColor text-white "
                : "border-[1px] border-gray-300 text-[#737373] "
            } w-8 h-8 text-lg flex items-center justify-center cursor-pointer`}
          >
            <ImList />
          </span>
        </div>
      </div>
      {/* Now rendering fetched products in useEffect here in here through condition rendering */}
      {/* If showGrid is available render first div with grid view styles otherwise second*/}
      {showGrid ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {productData.map((item: ProductProps) => (
            <Product key={item?._id} product={item} />
          ))}
        </div>
      ) : (
        // passing all the products in ListProducts component and giving styles of listView
        <div className="w-full grid grid-cols-1 gap-5">{productData.map((item: ProductProps) => (
          <ListProducts key={item?._id} product={item} />
        ))}</div>
      )}
    </Container>
  );
};

export default ShopPage;
