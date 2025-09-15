import { Post } from "@/types/post";
import { Badge } from "@mantine/core";

interface Props {
    posts: Post[]
}

export default function RecentPostsWidget({posts}: Props) {
    return (
        <div className="rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-sm p-5">
            <div className="mb-3 font-semibold">Recent Posts</div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="text-zinc-500">
                        <tr className="border-b border-zinc-200/60 dark:border-zinc-800/60">
                            <th className="text-left py-2 pr-2 font-medium">Title</th>
                            <th className="text-left py-2 font-medium">Tags</th>
                            <th className="text-left py-2 font-medium">Views</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td className="py-2 pr-2 max-w-[8rem] md:max-w-full">{post.title}</td>
                                <td className="py-2 grid md:flex items-center gap-2">
                                    {post.tags.map(tag => (
                                        <Badge variant="light" key={tag}>{tag}</Badge>
                                    ))}
                                </td>
                                <td className="py-2">{post.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
