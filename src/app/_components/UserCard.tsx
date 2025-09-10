import { User } from "@/types/user";
import Image from "next/image";

interface userCardProps {
    user: User;
    index?: number
}
export default function UserCard({ user }: userCardProps) {
    return (
        <section className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur ring-1 ring-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/10 via-sky-400/10 to-cyan-300/10 blur-2xl"></div>
            <div className="relative z-[1] flex items-center gap-4 p-4">
                <div className="relative h-12 w-12 shrink-0 rounded-full ring-2 ring-white shadow-md">
                    <Image
                        src={user.image}
                        alt={user.firstName}
                        className="h-12 w-12 rounded-full object-cover"
                        width={60}
                        height={60}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow"></span>
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                <path d="M10 3a4 4 0 00-4 4v1H5a2 2 0 00-2 2v2h14V10a2 2 0 00-2-2h-1V7a4 4 0 00-4-4z" />
                                <path d="M3 13a2 2 0 002 2h10a2 2 0 002-2v-1H3v1z" />
                            </svg>
                            @{user.username}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-600">
                            Age {user.age}
                        </span>
                    </div>
                </div>
                <div className="flex items-center">
                    <button
                        type="button"
                        className="inline-flex h-9 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 shadow-sm transition-colors hover:border-indigo-200 hover:text-indigo-600"
                    >
                        <span>View</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l6 6a.75.75 0 11-1.06 1.06L14.25 6.31V20a.75.75 0 01-1.5 0V6.31l-4.72 4.72a.75.75 0 11-1.06-1.06l6-6z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}