import Link from "next/link";
import { ProductProps } from "../../type";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import Price from "./Price";

interface Props {
  products: ProductProps[];
}

const OnSale = ({ products }: Props) => {
  return (
    <div className="">
      <h3 className="text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px] ">
        Flat sale on Products
      </h3>
      <div className="flex flex-col gap-2 justify-normal">
        {products?.map((item: ProductProps) => (
          <Link href={`/product/${item?.slug?.current}`} key={item?._id} className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2">
            {/* image of individual product */}
            <Image
              src={urlFor(item.image).url()}
              alt="product-image"
              className="w-24 object-contain"
              height={200}
              width={200}
            />
            <div className="flex flex-col gap-2">
              {/* title of of individual product */}
              <p className="text-sm tracking-tighter font-medium">
                {item?.title.substring(0, 7)}
              </p>
              {/* price of individual product */}
              <p className="text-sm font-semibold">
                <Price amount={item?.price} />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OnSale;
