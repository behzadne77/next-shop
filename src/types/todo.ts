export type Todo = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number
}

export type TodoResponse = {
    todos: Todo[];
    total: number;
    skip: number;
    limit: number;
}