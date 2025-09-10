import LastPosts from "./_components/LastPosts";
import LastProducts from "./_components/LastProducts";
import LastUsers from "./_components/LastUsers";
export const revalidate = 60 * 10 * 60; // هر 60 ثانیه بازتولید

export default function Home() {
  return (
    <main className="container py-6">
      <LastProducts />
      <LastUsers className="mt-10" />
      <LastPosts className="mt-10" />
    </main>    
  );
}
