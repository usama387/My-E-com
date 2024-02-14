import React from "react";

interface Props {
  amount?: number;
  className?: string;
}

// passing amount and classname as props to be accessed by other components
const Price = ({ amount, className }: Props) => {
    // function of price
    const priceFormat = new Number(amount).toLocaleString('en-US', {
        style:'currency',
        currency:"USD",
        maximumFractionDigits:2
    })

    // utilizing the function here
    return <span className={`${className}`}>{priceFormat}</span>;
};

export default Price;
