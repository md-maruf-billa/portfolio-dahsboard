"use client"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {login_user} from "@/server/auth";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {

    const router = useRouter()
    // form
    const {handleSubmit, register} = useForm()
    const login_user_handler: SubmitHandler<FieldValues> = async (data) => {
        const payload = {
            email: data.email,
            password: data.password,
        }
        const response = await login_user(payload)
        if (response?.success) {
            toast.success("Login successfully")
            router.push("/dashboard")
        } else {
            toast.error(response?.message)
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmit(login_user_handler)} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Hello Mahid</h1>
                                <p className="text-muted-foreground text-balance">
                                    Login to your Admin account
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input {...register("password")} id="password" type="password" required/>
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>

                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="underline underline-offset-4">
                                    Sign up
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
