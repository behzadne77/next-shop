"use client";
import { useEffect, useState } from "react";
import LastProductsClient from "../_components/LastProductsClient";
import { Pagination } from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductPage () {
    // ----- last page from url ----------
    const searchParams = useSearchParams()
    const router = useRouter()
    const pageFromUrl = Number(searchParams.get("page") ?? "1");
    const currentPage = Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;
    // ------- pagination data ------------
    const limit = 12
    const [skip, setSkip] = useState<number>((currentPage - 1) * limit)
    const [total, setTotal] = useState<number>(0)
    const totalPages = Math.max(1, Math.ceil(total / limit))
    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        params.set("page", String(skip / limit + 1))
        router.push(`?${params.toString()}`, { scroll: false });
    }, [skip, router, searchParams])
    return (
        <section className="container">
            <LastProductsClient
                title=""
                limit={limit}
                skip={skip}
                onTotalChange={setTotal}
            />
            {total > 0 && (
                <div className="mt-6 flex justify-center">
                    <Pagination
                        total={totalPages}
                        value={Math.floor(skip / limit) + 1}
                        onChange={(page) => setSkip((page - 1) * limit)}
                    />
                </div>
            )}
        </section>
    )
}