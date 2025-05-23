"use client"
import React from "react";
import { Icon } from "@iconify/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {TSkill} from "@/types/skill";
import {Button} from "@/components/ui/button";
import UpdateSkillDialog from "@/components/update-skill-dialog";
import {delete_skill} from "@/server/skill";
import Swal from "sweetalert2";
import {toast} from "sonner";


const ManageSkillTable = ({skills}:{skills:TSkill[]}) => {
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
                const res = await delete_skill(id)
                if(res.success){
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Skill Deleted!",
                        icon: "success"
                    });
                }else{
                    toast.error(res.message)
                }
            }
        });
    }
    return (
        <div className="border rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4">Manage Skills</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">Icon</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skills.map((skill) => (
                        <TableRow key={skill._id}>
                            <TableCell>
                                <Icon icon={skill.icon} width={24} height={24} />
                            </TableCell>
                            <TableCell>{skill.name}</TableCell>
                            <TableCell className="text-right space-x-2 flex justify-end items-center">
                                <UpdateSkillDialog skill={skill} />
                                <Button onClick={()=>handleDelete(skill._id as string)} variant="destructive" size="sm">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ManageSkillTable;