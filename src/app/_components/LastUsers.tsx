import { prefetchUsers } from "@/queries/use-users"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import LastUsersClient from "./LastUsersClient";

export default async function LastUsers ({className}: {className: string}) {
    const limit = 10;
    const skip = 0;
    const queryClient = await prefetchUsers({limit, skip})
    return (
        <section className={className}>
            <h1 className="font-bold text-xl text-gray-900 mb-4">Last Users</h1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <LastUsersClient limit={limit} skip={skip} />
            </HydrationBoundary>
        </section>
    )
}