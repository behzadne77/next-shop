import LastPosts from "./_components/LastPosts";
import LastProducts from "./_components/LastProducts";
import LastUsers from "./_components/LastUsers";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container py-6">
      <LastProducts />
      <Suspense fallback={<div>Loading Products ...</div>}>
        <LastUsers className="mt-10" />
      </Suspense>
      <Suspense fallback={<div>Loading Posts</div>}>
        <LastPosts className="mt-10" />
      </Suspense>
    </main>
  );
}
