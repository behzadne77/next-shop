import { SquarePlus } from "lucide-react";
import CreateTodoForm from "./_components/Form";

export default function PanelTodoCreatePage() {
    return (
        <section className="container">
            <div className="rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-sm p-5">
                <div>
                    <div className="inline-flex items-center gap-3 rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300">
                        <SquarePlus size={14} />
                        New Todo
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight mt-3">Create TODO</h1>
                    <p className="text-sm text-zinc-500 mt-1">Add a new task to your list with a title and optional completion.</p>
                </div>
                <CreateTodoForm />
            </div>
        </section>
    )
}