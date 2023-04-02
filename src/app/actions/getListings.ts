import { prismadb } from "../libs";

export default async function getListings() {
  try {
    const listings = await prismadb.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listings) => ({
      ...listings,
      createdAt: listings.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
