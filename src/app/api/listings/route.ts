import { NextResponse } from "next/server";
import { prismadb } from "@/app/libs";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(reques: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await reques.json();
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  Object.keys(body).forEach((v: any) => {
    if (!body[v]) {
      NextResponse.error();
    }
  });

  const listing = await prismadb.listing.create({
    data: {
      title,
      description,
      category,
      locationValue: location.value,
      guestCount: guestCount,
      roomCount: roomCount,
      bathroomCount: bathroomCount,
      price: parseInt(price, 10),
      imageSrc,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
