"use client";
import { fetchUsers } from "@/queries/use-users"
import { UsersResponse } from "@/types/user";
import {Loader} from "@mantine/core"
import UserCard from "./UserCard";

export default function LastUsersClient ({limit, skip}: {limit: number, skip: number}) {
    const {isLoading, data} = fetchUsers(limit, skip)
    const usersList = data as UsersResponse
    return (
        <section>
            {isLoading && (
                <Loader size={30} />
            )}
            <section className="grid grid-cols-2 gap-6">
                {usersList?.users && (
                    <>
                        {usersList.users.map((user, index)=> (
                            <UserCard index={index} user={user} key={user.id} />
                        ))}
                    </>
                )}
            </section>
        </section>
    )
}