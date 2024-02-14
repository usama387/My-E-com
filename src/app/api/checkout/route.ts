import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ProductProps } from "../../../../type";
import { urlFor } from "@/lib/sanityClient";

// this function passes the body as request
export const POST = async (request: NextRequest) => {
  // in this variable i passed my stripe secret key coming from env ! means available for the type definition
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const reqBody = await request.json();
    //   session user email and items coming reqBody
    const { items, email } = await reqBody;
    // Extracting items from items by mapping from productProps and returning in an object
    const updatedItems = await items.map((item: ProductProps) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [urlFor(item.image).url()],
        },
      },
    }));
    // configuration for each session passing payment option and updatedItems var
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: updatedItems,
      mode: "payment",
      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: `${process.env.NEXTAUTH_URL},`,
      // Now i will pass the metadata
      metadata: {
        email,
      },
    });
    // Now return NextResponse with a message
    return NextResponse.json({
      message: "Connection is alive",
      success: true,
      id: session.id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
