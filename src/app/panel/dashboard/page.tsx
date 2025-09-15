import StatsCards from "./_components/StatsCards";
import RecentUsersWidget from "./_components/RecentUsersWidget";
import RecentPostsWidget from "./_components/RecentPostsWidget";
import RecentProductsWidget from "./_components/RecentProductsWidget";
import { getUsers } from "@/services/users";
import { getPosts } from "@/services/posts";
import { getProducts } from "@/services/products";

export const revalidate = 900; // 15 minutes

export default async function DashboardPage () {
    const params = {
        limit: 5,
        skip: 1
    }
    const [usersResponse, postsResponse, productsResponse] = await Promise.all([
        getUsers(params, revalidate),
        getPosts(params),
        getProducts(params),
    ]);
    return (
        <>
            <section className="container py-8 space-y-8">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                    <p className="text-sm text-zinc-500 mt-1">Overview of recent activity and key metrics</p>
                </div>
                <StatsCards totals={{ users: usersResponse.total, posts: postsResponse.total, products: productsResponse.total }} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <RecentPostsWidget posts={postsResponse.posts} />
                        <RecentProductsWidget products={productsResponse.products} />
                    </div>
                    <div className="space-y-6">
                        <RecentUsersWidget users={usersResponse.users} />
                    </div>
                </div>
            </section>
        </>
    )
}