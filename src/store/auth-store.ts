import { LoginUser } from "@/types/user";
import {create} from "zustand";

type AuthState = {
    user: LoginUser | null;
    status: "idle" | "authenticated" | "unauthenticated";
    setUser: (U: LoginUser | null) => void;
    reset: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    status: "idle",
    setUser: (user) => set({ user, status: user ? 'authenticated' : "unauthenticated" }),
    reset: () => set({ user: null, status: "idle" })
}))