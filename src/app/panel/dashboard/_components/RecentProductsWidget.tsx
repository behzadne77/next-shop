export default function RecentProductsWidget() {
    const items = [
        { name: "Mechanical Keyboard X1", badge: "New", tone: "emerald" },
        { name: "Wireless Headphones A7", badge: "3 days ago", tone: "zinc" },
        { name: "Ergonomic Mouse Pro", badge: "1 week ago", tone: "zinc" },
    ];
    return (
        <div className="rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-sm p-5">
            <div className="mb-3 font-semibold">Recent Products</div>
            <ul className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-sm">
                {items.map((p) => (
                    <li key={p.name} className="flex items-center justify-between py-2.5">
                        <span className="text-zinc-700 dark:text-zinc-200">{p.name}</span>
                        {p.tone === "emerald" ? (
                            <span className="text-xs rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5">{p.badge}</span>
                        ) : (
                            <span className="text-xs text-zinc-500">{p.badge}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
