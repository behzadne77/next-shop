"use client";
import {Loader} from "@mantine/core"
import { fetchPosts } from "@/queries/use-posts";
import { PostResponse } from "@/types/post";
import PostCard from "./PostCard";

export default function LastPostsClient ({limit, skip}: {limit: number, skip: number}) {
    const {isLoading, isError, data} = fetchPosts(limit, skip)
    const usersList = data as PostResponse
    return (
        <section>
            {isLoading && (
                <Loader size={30} />
            )}
            <section className="grid grid-cols-2 gap-6">
                {usersList?.posts && (
                    <>
                        {usersList.posts.map((post, index)=> (
                            <PostCard key={post.id} post={post} index={index} />
                        ))}
                    </>
                )}
            </section>
        </section>
    )
}