"use client";
import Container from "@/components/Container";
import { resetCart } from "@/redux/orebiSlice";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const SuccessPage = ({ searchParams }: any) => {

  // To call event of resetting cart
  const dispatch = useDispatch();
  
  // In useEffect hook if there is no session id of stripe direct to home or reset cart this trick automatically refreshes cart after checkout
  useEffect(() => {
    !searchParams?.session_id ? redirect("/") : dispatch(resetCart());
  }, []);

  return (
    <Container className="flex items-center justify-center py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-4xl font-bold ">
          We have accepted your payment <span>happy shopping😊</span>
        </h2>
        <p>View order or continue shopping</p>
        <div className="flex items-center gap-x-5">
          <Link href={"/order"}>
            <button className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              View Orders
            </button>
          </Link>
          <Link href={"/"}>
            <button className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SuccessPage;
