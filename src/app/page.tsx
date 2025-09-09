import LastProducts from "./_components/LastProducts";
export const revalidate = 60 * 10; // هر 60 ثانیه بازتولید

export default function Home() {
  return (
    <main className="container py-6">
      <LastProducts />
    </main>    
  );
}
