"use server";
import { cookies } from "next/headers";
import {revalidateTag} from "next/cache";
const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

export const create_new_project = async (payload:FormData) => {
    const token =(await cookies()).get("accessToken")?.value;
    const response = await fetch(`${server_url}/project`, {
        method: "POST",
        headers: {
            "Authorization": token!,
        },
        body: payload,
    });
    return (await response.json());
};

// update project
export const update_new_project = async (id:string,payload:FormData) => {
    const token =(await cookies()).get("accessToken")?.value;
    const response = await fetch(`${server_url}/project/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": token!,
        },
        body: payload,
    });

    revalidateTag("projects");
    return (await response.json());

}

// get all project
export const get_all_project = async () => {
     const res = await fetch(`${server_url}/project`, {
         method: "GET",
         next: {
             tags: ['projects'],
         },
     })
    return await res.json();
}

// delete project
export const delete_project = async (id: string) => {
    const token =(await cookies()).get("accessToken")?.value;
    const response = await fetch(`${server_url}/project/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": token!,
        },
    });
    revalidateTag("projects");
    return (await response.json());

}