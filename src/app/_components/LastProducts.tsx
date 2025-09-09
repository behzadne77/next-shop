import { prefetchProducts } from "@/queries/use-products";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import LastProductsClient from "./LastProductsClient";
export default async function LastProducts () {
    const limit = 6
    const skip = 0
    const queryClient = await prefetchProducts({limit, skip})
    return (
        <section>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <LastProductsClient title="Last Products" limit={limit} skip={skip} />
            </HydrationBoundary>
        </section>
    )
}