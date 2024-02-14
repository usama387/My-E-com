import React from "react";

// this heading will be dynamic and shared as props in different components across the app
const Heading = ({
  heading,
  className,
}: {
  heading?: string;
  className?: string;
}) => {
  return (
    <p
      className={`text-3xl font-semibold pb-6 ${className}
  `}
    >
      {heading}
    </p>
  );
};

export default Heading;
