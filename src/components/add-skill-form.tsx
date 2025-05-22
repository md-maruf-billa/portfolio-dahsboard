"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {add_skill} from "@/server/skill";
import {toast} from "sonner";


const AddSkillForm = () => {
    const {register,handleSubmit,reset} = useForm()
    const handleAddSkill:SubmitHandler<FieldValues> =async (data)=>{
        const id = toast.loading("Information verifying...")
        const payload ={
            name: data.name,
            icon: data.icon,
        }
        const result = await add_skill(payload)
        if(result?.success){
            toast.success(result.message,{id})
            reset()
        }else {
            toast.error(result.message,{id})
        }
    }
    return (
        <form onSubmit={handleSubmit(handleAddSkill)} className="flex justify-center items-center w-full min-h-[80vh]">
            <Card className="w-[350px]">
                <CardHeader>
                    <div className="bg-secondary p-4 text-center">
                        <h1 className="text-2xl font-bold ">Add New Skill</h1>
                    </div>
                </CardHeader>
                <CardContent>

                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Skill Name</Label>
                                <Input {...register("name")} required={true} id="name" placeholder="Ex:- React" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Skill Icon Name</Label>
                                <Input {...register("icon")} required={true} id="name" placeholder="Ex:- i-material-icon-theme-react-ts " />
                            </div>
                            <p className={"italic text-gray-500"}>Note: use iconify icon</p>
                        </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Add Now</Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default AddSkillForm;