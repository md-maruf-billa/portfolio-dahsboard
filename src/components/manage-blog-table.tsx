"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TBlog } from "@/types/blog";
import React from "react";
import Image from "next/image";
import {BlogUpdateDialog} from "@/components/blog-update-dialog";
import Swal from "sweetalert2";
import {toast} from "sonner";
import {delete_blog} from "@/server/blog";
type ManageBlogsTableProps = {
    blogs: TBlog[];
};

function formatLocalTime(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleString(); // You can customize this format
}

export default function ManageBlogsTable({blogs}: ManageBlogsTableProps) {

    const handleDelete =async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await delete_blog(id)
                if(res.success){
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Blog Deleted!",
                        icon: "success"
                    });
                }else{
                    toast.error(res.message)
                }
            }
        });
    }

    return (
        <div className="w-full overflow-x-auto">
            <div className="bg-secondary p-6 text-center mb-4">
                <h1 className="text-2xl font-bold ">All Blogs</h1>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="bg-secondary">
                        <TableHead>Blog</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blogs.map((blog) => (
                        <TableRow key={blog._id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    {blog.blogImage ? (
                                        <Image
                                            width={800}
                                            height={800}
                                            src={blog.blogImage}
                                            alt="Blog"
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded bg-gray-200 text-center text-sm text-gray-500 flex items-center justify-center">
                                            N/A
                                        </div>
                                    )}
                                    <span className="font-medium">{blog.title}</span>
                                </div>
                            </TableCell>
                            <TableCell>{blog.blogTags.join(", ")}</TableCell>
                            <TableCell>
                                {blog.createdAt ? formatLocalTime(blog.createdAt) : "N/A"}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <BlogUpdateDialog data={blog}/>
                                <Button onClick={()=>handleDelete(blog?._id as string)} variant="destructive" >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
