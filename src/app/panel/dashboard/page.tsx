import StatsCards from "./_components/StatsCards";
import RecentUsersWidget from "./_components/RecentUsersWidget";
import RecentPostsWidget from "./_components/RecentPostsWidget";
import RecentProductsWidget from "./_components/RecentProductsWidget";

export default function DashboardPage () {
    return (
        <>
            <section className="container py-8 space-y-8">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                    <p className="text-sm text-zinc-500 mt-1">Overview of recent activity and key metrics</p>
                </div>
                <StatsCards />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <RecentPostsWidget />
                        <RecentProductsWidget />
                    </div>
                    <div className="space-y-6">
                        <RecentUsersWidget />
                    </div>
                </div>
            </section>
        </>
    )
}