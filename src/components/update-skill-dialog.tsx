"use client"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React from "react";
import { useForm} from "react-hook-form";
import {TSkill} from "@/types/skill";
import {update_skill} from "@/server/skill";
import {toast} from "sonner";

const UpdateSkillDialog = ({skill}: { skill: TSkill }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const {register, handleSubmit,reset} = useForm({
        defaultValues: {
            name: skill.name,
            icon: skill.icon,
        }
    })
    React.useEffect(() => {
        reset({
            name: skill.name,
            icon: skill.icon,
        });
    }, [skill, reset]);
    const updateSkill = async (data:Partial<TSkill>) => {
        const id = toast.loading('Verifying skill info ...');
        const res = await update_skill(skill?._id as string,data)
        if(res?.success){
            toast.success("Successfully updated skill",{id});
            setOpenModal(false)
        }else{
            toast.error(res?.message,{id});
        }
    }

    return (

        <Dialog onOpenChange={setOpenModal} open={openModal}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Edit
                </Button>
            </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <div className="bg-secondary p-4 text-center">
                            <h1 className="text-2xl font-bold ">Update Skill</h1>
                        </div>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(updateSkill)} className="grid gap-4 py-4">
                        <div className="space-y-3">
                            <Label htmlFor="name" className="text-right">
                                Skill Name
                            </Label>
                            <Input {...register("name")} id="name"/>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="icon" className="text-right">
                                Icon Name
                            </Label>
                            <Input {...register("icon")} id="icon"/>
                        </div>
                        <Button type="submit">Save changes</Button>
                    </form>
                </DialogContent>
        </Dialog>

    );
};

export default UpdateSkillDialog;