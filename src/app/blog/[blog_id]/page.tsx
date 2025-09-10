"use client";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import { FetchPost } from "@/queries/use-posts";
import BlogDetails from "./_components/BlogDetails";
import BlogComments from "./_components/BlogComments";

export default function BlogShowPage() {
    const params = useParams();
    const id = Number(params?.blog_id);
    const { data, isLoading } = FetchPost(id);

    return (
        <section className="container py-6">
            <BlogDetails post={data} isLoading={isLoading} />
            <div className="mt-8">
                <Suspense fallback={<div className="p-4 rounded bg-gray-50">Loading comments...</div>}>
                    <BlogComments postId={id} />
                </Suspense>
            </div>
        </section>
    );
}