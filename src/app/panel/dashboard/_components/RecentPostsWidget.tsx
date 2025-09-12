export default function RecentPostsWidget() {
    const rows = [
        { title: "Top SEO Tips", author: "user_123", date: "2025-09-08" },
        { title: "Getting Started with Next.js", author: "user_987", date: "2025-09-07" },
        { title: "Tailwind Tricks", author: "user_345", date: "2025-09-06" },
    ];
    return (
        <div className="rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-sm p-5">
            <div className="mb-3 font-semibold">Recent Posts</div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="text-zinc-500">
                        <tr className="border-b border-zinc-200/60 dark:border-zinc-800/60">
                            <th className="text-left py-2 pr-2 font-medium">Title</th>
                            <th className="text-left py-2 font-medium">Author</th>
                            <th className="text-left py-2 font-medium">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                        {rows.map((r) => (
                            <tr key={r.title}>
                                <td className="py-2 pr-2">{r.title}</td>
                                <td className="py-2">{r.author}</td>
                                <td className="py-2">{r.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
