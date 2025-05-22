"use client"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {register_user} from "@/server/auth";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export function RegisterFrom({className,...props}: React.ComponentProps<"div">) {
    const router = useRouter()
    const {handleSubmit,register} = useForm()
    const register_new_user:SubmitHandler<FieldValues> =async (data)=>{
        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
        }
        const result = await register_user(payload)
        if(result?.success){
            toast.success(result?.message)
            router.push("/")
        }else {
            toast.error(result?.message)
        }

    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmit(register_new_user)} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome Mahid</h1>
                                <p className="text-muted-foreground text-balance">
                                    Create a new admin account.
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    {...register("name")}
                                    id="name"
                                    type="text"
                                    placeholder="Md. Abu-Mahid Islam"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="abumahid@gmail.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                    placeholder="*******"
                                    required/>
                            </div>
                            <Button type="submit" className="w-full">
                                Register Now
                            </Button>

                            <div className="text-center text-sm">
                                 Have an account?{" "}
                                <Link href="/" className="underline underline-offset-4">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="bg-muted relative hidden md:block">
                        <Image
                            src="/mypic.jpg"
                            width={700}
                            height={700}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
