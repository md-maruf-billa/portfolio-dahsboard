"use server"
import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";
const server_url = process.env.NEXT_PUBLIC_SERVER_URL;


export const create_new_blog = async (payload:FormData) =>{
    const token =(await cookies()).get("accessToken")?.value;
    const res = await fetch(server_url+`/blogs`,{
        method:"POST",
        headers:{
            "Authorization":token!
        },
        body:payload
    });
    return await res.json();
}

export const get_all_blogs = async () =>{
    const res = await fetch(server_url+`/blogs/`,{
        next:{
            tags:["blogs"]
        }
    });
    return await res.json();
}


export const update_blog = async (id:string,payload:FormData) =>{
    const token =(await cookies()).get("accessToken")?.value;
    const res = await fetch(server_url+`/blogs/${id}`,{
        method:"PATCH",
        headers:{
            "Authorization":token!
        },
        body:payload
    });
    revalidateTag("blogs")
    return await res.json();
}

export const delete_blog = async (id:string) =>{
    const token =(await cookies()).get("accessToken")?.value;
    const res = await fetch(server_url+`/blogs/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization":token!
        },
    });
    revalidateTag("blogs")
    return await res.json();
}