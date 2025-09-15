import { User } from "@/types/user";
import Image from "next/image";

interface Props {
    users: User[]
}
export default function RecentUsersWidget({users}: Props) {
    return (
        <div className="rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-sm p-5">
            <div className="mb-3 font-semibold">Recent Users</div>
            <ul className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-sm">
                {users.map((u, index) => (
                    <li key={u.id} className="flex items-center justify-between py-2.5">
                        <div className="flex items-center gap-3">
                            <span className={`h-7 w-7 rounded-full bg-gray-100 inline-block`}>
                                <Image src={u.image} width={50} height={50} alt={u.username} className="w-full h-full rounded-full" />
                            </span>
                            <span className="text-zinc-700 dark:text-zinc-200">
                                {u.firstName} {u.lastName}
                            </span>
                        </div>
                        <span className="text-xs text-zinc-500">{u.age}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
