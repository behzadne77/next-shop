import { Post } from "@/types/post";
import { Eye, ThumbsUp, ThumbsDown, ArrowUpRight } from "lucide-react";
interface PostCardProps {
    post: Post;
    index: number;
}

export default function PostCard({ post, index: _index }: PostCardProps) {
    return (
        <article className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur ring-1 ring-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            {/* Background gradient decoration */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/10 via-sky-400/10 to-cyan-300/10 blur-2xl"></div>
            
            <div className="relative z-[1] p-6">
                {/* Header with title and views */}
                <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="flex-1 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {post.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                    </div>
                </div>

                {/* Post body */}
                <p className="mb-4 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {post.body}
                </p>

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 ring-1 ring-indigo-100"
                            >
                                #{tag}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                +{post.tags.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                {/* Footer with reactions and actions */}
                <div className="flex items-center justify-between">
                    {/* Reactions */}
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-green-50 hover:text-green-600">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.reactions.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-red-50 hover:text-red-700">
                            <ThumbsDown className="h-4 w-4" />
                            <span>{post.reactions.dislikes}</span>
                        </button>
                    </div>

                    {/* Action button */}
                    <button
                        type="button"
                        className="inline-flex h-9 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 shadow-sm transition-colors hover:border-indigo-200 hover:text-indigo-600"
                    >
                        <span>Read More</span>
                        <ArrowUpRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </article>
    );
}