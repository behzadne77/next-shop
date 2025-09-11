export type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    username: string;
    image: string
}
export type UsersResponse = {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export type LoginResponse = {
    user: {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        gender: "female" | "male";
        image: "string";
    }
}