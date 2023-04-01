import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import { Container, EmptyState, ListingsCard } from "./components";

export default async function Home() {
  const listing = await getListings();
  const currentUser = await getCurrentUser();

  if (listing.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listing.map((l) => (
          <ListingsCard key={l.id} data={l} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
}
