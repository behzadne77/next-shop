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

export type PostComment = {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
        id: number;
        fullName: string;
        userName: string;
    }
}

export type PostCommentResponse = {
    comments: PostComment[];
    total: number;
    skip: number;
    limit: number;
}