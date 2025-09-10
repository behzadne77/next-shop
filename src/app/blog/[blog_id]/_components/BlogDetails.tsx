"use client";
import type { Post } from "@/types/post";
import { Badge, Group, Text, Title, Divider, ActionIcon } from "@mantine/core";
import { Eye, ThumbsUp, ThumbsDown, Share2, Calendar } from "lucide-react";

interface BlogDetailsProps {
    post: Post | undefined;
    isLoading: boolean;
}

export default function BlogDetails({ post, isLoading }: BlogDetailsProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="h-40 bg-gray-200 rounded animate-pulse" />
            </div>
        );
    }

    if (!post) return null;

    return (
        <article className="space-y-6">
            <header className="space-y-3">
                <Title order={1}>{post.title}</Title>
                <Group gap="sm">
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="light" color="indigo" radius="xl">#{tag}</Badge>
                    ))}
                </Group>
                <Group gap="md" className="text-gray-500">
                    <Text size="sm" className="inline-flex items-center gap-1">
                        <Eye size={16} /> {post.views} views
                    </Text>
                    <Text size="sm" className="inline-flex items-center gap-1">
                        <ThumbsUp size={16} /> {post.reactions.likes}
                    </Text>
                    <Text size="sm" className="inline-flex items-center gap-1">
                        <ThumbsDown size={16} /> {post.reactions.dislikes}
                    </Text>
                    <ActionIcon variant="subtle" color="blue" aria-label="Share">
                        <Share2 size={18} />
                    </ActionIcon>
                </Group>
            </header>

            <Divider />

            <section className="prose max-w-none">
                <Text size="md" className="leading-7 text-gray-800">
                    {post.body}
                </Text>
            </section>
        </article>
    );
}


