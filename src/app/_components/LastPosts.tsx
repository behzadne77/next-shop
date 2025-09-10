import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchPosts } from "@/queries/use-posts";
import LastPostsClient from "./LastPostsClient";
export default async function LastPosts ({ className }: {className: string}) {
    const limit = 6
    const skip = 0
    const queryClient = await prefetchPosts({limit, skip})
    return (
        <section className={className}>
            <h1 className="font-bold text-xl text-gray-900 mb-4">Last Posts</h1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <LastPostsClient limit={limit} skip={skip} />
            </HydrationBoundary>
        </section>
    )
}