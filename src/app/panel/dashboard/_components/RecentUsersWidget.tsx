export default function RecentUsersWidget() {
    const items = [
        { name: "Sarah Cohen", time: "2m ago", color: "bg-emerald-500" },
        { name: "Reza Nowruzi", time: "10m ago", color: "bg-sky-500" },
        { name: "Maryam Hosseini", time: "1h ago", color: "bg-violet-500" },
        { name: "Parsa Ahmadi", time: "yesterday", color: "bg-amber-500" },
    ];
    return (
        <div className="rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-sm p-5">
            <div className="mb-3 font-semibold">Recent Users</div>
            <ul className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-sm">
                {items.map((u) => (
                    <li key={u.name} className="flex items-center justify-between py-2.5">
                        <div className="flex items-center gap-3">
                            <span className={`h-7 w-7 rounded-full ${u.color} inline-block`} />
                            <span className="text-zinc-700 dark:text-zinc-200">{u.name}</span>
                        </div>
                        <span className="text-xs text-zinc-500">{u.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
