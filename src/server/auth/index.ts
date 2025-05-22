"use server"

import {ILoginUser, IRegisterUser} from "@/types/auth";
import {cookies} from "next/headers";

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

export const register_user = async (payload:IRegisterUser) => {
    const response = await fetch(server_url + "/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    return await response.json()
}
export const login_user = async (payload:ILoginUser) => {
    const response = await fetch(server_url + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    const result = await response.json();
    console.log(result);
    if (result?.success) {
        (await cookies()).set("accessToken", result.data.token);
    }
    return result;
}

export const get_current_user_action = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (!accessToken) {
        throw new Error("Access token not found");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`, {
        headers: {
            "Authorization": accessToken,
            "Content-Type": "application/json"
        },
        cache: "no-store",
    });
    return await res.json();
};


export const log_out_user_action = async () => {
    try {
        (await cookies()).delete("accessToken");
        return true;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return Error(error.message);
        }
        return Error("An unknown error occurred");
    }
};
