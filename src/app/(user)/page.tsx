import Banner from "@/components/Banner";
import BestSellers from "@/components/BestSellers";
import HomeBanner from "@/components/HomeBanner";
import NewArrival from "@/components/NewArrival";
import YearProduct from "@/components/YearProduct";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";
// import { UserButton } from "@clerk/nextjs"

//it's gonna revalidate after every 10 seconds
export const revalidate = 10;

// data fetching query for banner when the type is equal to banner fetch image and id inside it
const bannerQuery = groq`*[_type == 'banner']{
  image,
  _id
} | order(_createdAt asc)`;

// data fetching query for banner when the type is equal to product fetch and position is equal to BestSellers the three dots fetch everything inside the query
const newArrivalQuery = groq`*[_type == 'product' && position == 'New Arrivals']{
  ...
} | order(_createdAt asc)`;



// data fetching query for banner when the type is equal to product and position is equal to BestSellers the three dots fetch everything inside the query
const bestSellersQuery = groq`*[_type == 'product' && position == 'BestSellers']{
  ...
} | order(_createdAt asc)`;

// data fetching query for banner when the type is equal to product and position is equal to special offers the three dots fetch everything inside the query
const specialOffersQuery = groq`*[_type == 'product' && position == 'Special Offers']{
  ...
} | order(_createdAt asc)`;



const HomePage = async () => {
  //awaiting the first query response since it's an async function
  const banners = await client.fetch(bannerQuery);

  //awaiting the second query response since it's an async function
  const newArrivalProducts = await client.fetch(bestSellersQuery);

  //awaiting third query response since it's an async function
  const bestSellersProducts = await client.fetch(newArrivalQuery);

  //awaiting fourth query response since it's an async function
  const specialOffersProducts = await client.fetch(specialOffersQuery);

  return (
    <>
      <main className="text-sm overflow-hidden min-h-screen">
      {/* <UserButton afterSignOutUrl="/"/> */}
        {/* First Component  for root page */}
        {/* passing the banners response into banner component created at line 12 */}
        <Banner banners={banners} />
        {/* Second Component for root page with 2nd query being passed in */}
        <NewArrival products={newArrivalProducts} />
        {/* Third Component for root page */}
        <HomeBanner />
        {/* Fourth Component for root page with third query being passed */}
        <BestSellers products={bestSellersProducts} title="Our Bestsellers" />
        {/* Fifth Component  for root page */}
        <YearProduct />
        {/* Fourth Component for root page with third query being passed */}
        <BestSellers products={specialOffersProducts} title="Special Offers" />

      </main>
    </>
  );
};

// start from updating slider pics
// https://orebionlineshopping.vercel.app/

export default HomePage;
