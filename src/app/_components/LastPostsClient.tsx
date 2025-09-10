"use client";
import {Button, Loader, Title} from "@mantine/core"
import { fetchPosts } from "@/queries/use-posts";
import { PostResponse } from "@/types/post";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface LastPostsClientProps {
    limit: number;
    skip: number;
    onTotalChange?: (total: number) => void;
    showTitle?: boolean
}

export default function LastPostsClient ({limit, skip, onTotalChange, showTitle = true}: LastPostsClientProps) {
    const {isLoading, data} = fetchPosts(limit, skip)
    const postsList = data as PostResponse
    useEffect(() => {
        if (postsList?.total != null && onTotalChange) {
            onTotalChange(postsList.total)
        }
    }, [postsList?.total, onTotalChange])
    
    return (
        <section>
            {showTitle && (
                <section className="flex items-center justify-between mb-4">
                    <Title order={2}>Last Posts</Title>
                    <Link href="/blog">
                        <Button
                            variant="light"
                            size="sm"
                            radius="xl"
                            rightSection={<ChevronRight size={16} />}
                        >
                            See All
                        </Button>
                    </Link>
                </section>
            )}
            {isLoading && (
                <section className="flex items-center justify-center">
                    <Loader size={30} />
                </section>
            )}
            <section className="grid md:grid-cols-2 gap-6">
                {postsList?.posts && (
                    <>
                        {postsList.posts.map((post, index)=> (
                            <PostCard key={post.id} post={post} index={index} />
                        ))}
                    </>
                )}
            </section>
        </section>
    )
}