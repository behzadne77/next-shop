import { Users, FileText, Package, TrendingUp } from "lucide-react";

function StatCard({ title, value, change, changeTone, Icon }: { title: string; value: string; change: string; changeTone?: "up" | "down" | "neutral"; Icon: React.ComponentType<any>; }) {
    const toneClass = changeTone === "down" ? "text-rose-600" : changeTone === "neutral" ? "text-zinc-500" : "text-emerald-600";
    return (
        <div className="rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-sm p-5 transition will-change-transform hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-xs uppercase tracking-wider text-zinc-500">{title}</div>
                    <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{value}</div>
                    <div className={`mt-2 text-xs ${toneClass}`}>{change}</div>
                </div>
                <div className="rounded-xl bg-zinc-100/60 dark:bg-zinc-800/60 p-3">
                    <Icon className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                </div>
            </div>
        </div>
    );
}

export default function StatsCards(props: {
    totals: { users: number; posts: number; products: number; conversionRate?: string };
}) {
    const { totals } = props;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <StatCard title="Total Users" value={totals.users.toLocaleString("en")} change="+2.1% vs last week" changeTone="up" Icon={Users} />
            <StatCard title="Total Posts" value={totals.posts.toLocaleString("en")} change="+0.8% today" changeTone="up" Icon={FileText} />
            <StatCard title="Total Products" value={totals.products.toLocaleString("en")} change="-1.2% this month" changeTone="down" Icon={Package} />
        </div>
    );
}
