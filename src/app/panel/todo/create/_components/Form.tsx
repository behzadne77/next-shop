"use client";

import { Button, Checkbox, Divider, Group, Paper, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useAddTodo } from "@/queries/use-todos";
import { useAuthStore } from "@/store/auth-store";
import { CheckSquare, SquarePlus } from "lucide-react";
import { TodoFormData, resolver } from "@/validation/todo";
export default function CreateTodoForm () {
    
    const router = useRouter();
    const { user } = useAuthStore();
    const { mutateAsync, isPending } = useAddTodo();

    const form = useForm({
        initialValues: {
            todo: "",
            completed: false,
        },
        validate: resolver,
    });

    async function onSubmit(values: typeof form.values) {
        if (!user?.id) return;
        await mutateAsync({
            todo: values.todo.trim(),
            completed: values.completed,
            userId: user.id
        });
        router.push("/panel/dashboard");
    }

    return (
        <section>
            <Divider className="my-5" />
            <Paper className="shadow-sm bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
                <form onSubmit={form.onSubmit(onSubmit)} className="space-y-5">
                    <TextInput
                        label="Title"
                        placeholder="e.g. Buy groceries"
                        description="Keep it short and clear."
                        leftSection={<CheckSquare size={16} />}
                        radius="md"
                        size="md"
                        withAsterisk
                        {...form.getInputProps("todo")}
                    />
                    <Checkbox
                        label="Mark as completed"
                        {...form.getInputProps("completed", { type: "checkbox" })}
                    />

                    <Group justify="flex-end" pt="xs">
                        <Button variant="default" onClick={() => router.back()} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" loading={isPending} disabled={!user?.id} variant="gradient" gradient={{ from: "blue", to: "cyan" }}>
                            Create Todo
                        </Button>
                    </Group>
                </form>
            </Paper>
        </section>
    );
}