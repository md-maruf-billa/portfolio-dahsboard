'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrashIcon } from '@radix-ui/react-icons'
import {TProject} from "@/types/project";
import React from "react";
import Image from "next/image";
import {ProjectUpdateDialog} from "@/components/project-update-dialog";
import Swal from 'sweetalert2'
import {delete_project} from "@/server/project";
import {toast} from "sonner";
type Props = {
    data: TProject[]
}

export function Manage_Project_Table({ data }: Props) {
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
                const res = await delete_project(id)
                if(res.success){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Project Deleted!",
                        icon: "success"
                    });
                }else{
                    toast.error(res.message)
                }
            }
        });
    }

    const columns: ColumnDef<TProject>[] = [
        {
            header: 'Image',
            cell: ({ row }) => (
                <Image
                    src={row.original.projectImage!}
                    width={800}
                    height={800}
                    alt="Project"
                    className="w-16 h-10 object-cover rounded"
                />
            )
        },
        {
            accessorKey: 'projectName',
            header: 'Project Name'
        },
        {
            accessorKey: 'slogan',
            header: 'Slogan'
        },
        {
            accessorKey: 'liveLink',
            header: 'Live Link',
            cell: ({ row }) => (
                <a
                    href={row.original.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    Visit
                </a>
            )
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex gap-2">

                    <ProjectUpdateDialog data={row.original}/>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(row.original?._id as string)}
                    >
                        <TrashIcon className="w-4 h-4" />
                    </Button>
                </div>
            )
        }
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className="rounded-md border">
            <div className="bg-secondary p-6 text-center">
                <h1 className="text-2xl font-bold ">All Projects</h1>
            </div>
            <Table>
                <TableHeader className={"bg-secondary"}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
