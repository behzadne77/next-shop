"use client";
import { useUserTodos } from "@/queries/use-todos";
import { useAuthStore } from "@/store/auth-store";
import { TodoResponse } from "@/types/todo";
import { Loader } from "@mantine/core";
import { ToggleLeft, ToggleRight } from "lucide-react";

export default function RecentTodoWidget() {
    const {user, status} = useAuthStore();
    
    const {isLoading, data} = useUserTodos({
        limit: 5,
        skip: 1,
        user_id: user?.id || 0
    }, {
        enabled: !!user?.id
    });
    const todos = data as TodoResponse;
    
    if(status === "idle") {
        return (
            <div className="rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-sm p-5">
                <div className="mb-3 font-semibold">Recent Todos</div>
                <li className="flex justify-center py-4">
                    <Loader />
                </li>
            </div>
        );
    }
    
    return (
        <div className="rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-sm p-5">
            <div className="mb-3 font-semibold">Recent Todos</div>
            <ul className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-sm">
                {isLoading && (
                    <li className="flex justify-center py-4">
                        <Loader />
                    </li>
                )}
                {user && todos && todos?.todos.map((todo, index) => (
                    <li key={todo.id} className="flex items-center justify-between py-2.5">
                        <div className="flex items-center gap-3">
                            <span className="text-zinc-700 dark:text-zinc-200">
                                {todo.todo}
                            </span>
                        </div>
                        <span className="text-xs text-zinc-500">
                            {todo.completed
                                ? (
                                    <ToggleRight color="green" />
                                )
                                : (
                                    <ToggleLeft color="red" />
                                )
                            }
                        </span>
                    </li>
                ))}
                {todos && todos.todos.length === 0 && !isLoading && (
                    <li className="text-center text-red-500 py-4">There is no TODO Here</li>
                )}
            </ul>
        </div>
    );
}
