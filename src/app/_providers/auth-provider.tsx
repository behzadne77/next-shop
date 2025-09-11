"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useMe } from "@/queries/use-users";

export function AuthProvider() {
    const {data: me, isLoading, isError} = useMe()
    const {setUser, reset} = useAuthStore()
    useEffect(()=> {
        if (!isLoading) setUser(me ?? null)
        else if (isError) reset() 
    }, [isLoading, me, setUser])
    return null
}