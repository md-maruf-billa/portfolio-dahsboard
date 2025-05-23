"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"

import {Message} from "@/components/dashboard-overview";
import {mark_as_read_message} from "@/server/auth";
import {toast} from "sonner";
import {useState} from "react";

export function ViewMessageDialog({message}:{message:Message}) {
    const [modal, setModal] = useState(false)
    const handleMarkAsRead = async (): Promise<void> => {
        const res = await mark_as_read_message(message?._id)
        if(res?.success){
            toast.success(res.message)
            setModal(false)
        }else {
            toast.error(res.message)

        }
    }
    return (
        <Dialog onOpenChange={setModal} open={modal}>
            <DialogTrigger asChild>
                <Button variant="outline">Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="bg-white p-6 rounded-lg w-full max-w-xl mx-auto">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">📩 Message Details</h2>

                    <div className="mb-4">
                        <p className="text-sm text-gray-500">Sent on:</p>
                        <p className="text-base text-gray-800 font-medium">
                            {new Date(message.createdAt).toLocaleString()}
                        </p>
                    </div>

                    <div className="mb-2">
                        <p className="text-sm text-gray-500">From:</p>
                        <p className="text-base text-gray-800 font-medium">
                             <a href={`mailto:${message.senderEmail}`} className="text-blue-600 hover:underline">{message.senderEmail}</a>
                        </p>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-gray-500">Name:</p>
                        <p className="text-base text-gray-800 font-medium">
                            {message.senderName}
                        </p>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-gray-500">Subject:</p>
                        <p className="text-base text-gray-800 font-semibold">{message.messageTitle}</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-gray-500">Message:</p>
                        <p className="text-base text-gray-700 whitespace-pre-wrap">{message.messageBody}</p>
                    </div>

                </div>

                <DialogFooter>
                    <Button disabled={message?.isReded} onClick={handleMarkAsRead}>Mark as Read</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
