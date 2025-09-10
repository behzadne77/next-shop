export type Post = {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number
    },
    views: number
}

export type PostResponse = {
    posts: Post[];
    limit: number;
    skip: number;
    total: number;
}