import {RegisterFrom} from "@/components/register-form";

const Login_Page = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-sm md:max-w-3xl">
                <RegisterFrom/>
            </div>
        </div>
    );
};

export default Login_Page;