"use client";
import { FetchPostComments } from "@/queries/use-posts";
import type { PostCommentResponse } from "@/types/post";
import { Avatar, Badge, Divider, Group, Text, Title, Paper, ActionIcon, Tooltip, Button } from "@mantine/core";
import { ThumbsUp, MessageCircle } from "lucide-react";

interface BlogCommentsProps {
    postId: number;
}

export default function BlogComments({ postId }: BlogCommentsProps) {
    const { data, isLoading } = FetchPostComments(postId);
    const commentsList = data as PostCommentResponse | undefined;

    if (isLoading) {
        return (
            <div className="space-y-3">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (!commentsList || commentsList.comments.length === 0) {
        return (
            <div className="space-y-2">
                <Title order={3}>Comments</Title>
                <Text c="dimmed">No comments yet.</Text>
            </div>
        );
    }

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <Title order={3} className="flex items-center gap-2">
                    Comments
                    <Badge variant="light" color="indigo" radius="xl">
                        {commentsList.total}
                    </Badge>
                </Title>
                <div className="text-sm text-gray-500 inline-flex items-center gap-1">
                    <MessageCircle size={16} /> Share your thoughts
                </div>
            </div>
            <Divider />
            {commentsList?.comments && (
                <ul className="space-y-3 grid md:grid-cols-2 gap-4">
                    {commentsList.comments.map((c) => {
                        const fullName = c.user.fullName?.trim() || 'Anonymous';
                        const [firstInitial = '', lastInitial = ''] = fullName.split(' ');
                        const initials = `${firstInitial?.[0] ?? ''}${lastInitial?.[0] ?? ''}`.toUpperCase();
                        return (
                            <li key={c.id}>
                                <Paper withBorder radius="lg" p="md" className="transition-shadow duration-200 hover:shadow-md">
                                    <Group gap="sm" wrap="nowrap" align="flex-start">
                                        <Avatar radius="xl" color="blue" size={40}>{initials || '?'}</Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Text fw={600}>{fullName || 'Anonymous'}</Text>
                                                    <Text size="xs" c="dimmed">Liked by {c.likes} people</Text>
                                                </div>
                                                <Button variant="subtle" color="green" aria-label="Like comment">
                                                    <Group gap={4}>
                                                        <ThumbsUp size={16} />
                                                        <Text size="sm">{c.likes}</Text>
                                                    </Group>
                                                </Button>
                                            </div>
                                        </div>
                                    </Group>
                                    <Divider className="my-4" />
                                    
                                    <Text size="sm" className="mt-2 leading-7 text-gray-800">
                                        {c.body}
                                    </Text>
                                </Paper>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}


