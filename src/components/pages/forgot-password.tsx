import { useState, type FormEvent } from "react";
import { MdOutlineEmail } from "react-icons/md";
import useNavigateHooks from "../../hooks/useNavigate";
import type { FormSubmitHandler } from "react-hook-form";



const ForgotPassword = () => {

    const [email, setEmail] = useState<string>("");
    const { goToResetPassword,goToSignUp } = useNavigateHooks();



    const handleSubmit=(event:FormEvent)=>{
        event.preventDefault();
    }


    return (
        <div className="px-8 py-5 max-[500px]:p-6  bg-white rounded-lg w-100 max-w-125 max-[500px]:w-[92vw] font-[Poppins] drop-shadow-sm drop-shadow-gray-400">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-[500px]:gap-2" >
                <h1 className="text-black text-2xl font-semibold  font-[Poppins]">Sign In</h1>
                {/* HIDDEN ON MOBILE DEVICES */}
                {window.innerWidth > 500 && <p className="text-[13px]  w-full text-gray-600">Enter your email address to access your account</p>}
                <div className="flex flex-col items-start gap-4 text-black w-full">
                    <div className="flex flex-col gap-0.5 text-left w-full">
                        <label htmlFor="email" className="font-medium text-sm">Email</label>
                        <div className="flex items-center border border-[#dadada] rounded-[7px] pr-1">
                            <input type="email" placeholder="Enter Email" required pattern="^([A-Za-z0-9])+@([A-Za-z])+.([A-Za-z]{3,})$" title="Invalid email address (e.g, abc@gmail.com )" id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className="px-2.5 py-1.5 placeholder:text-[14px] outline-none w-full text-[14px] rounded-l-md" />
                            <div className="w-8 h-8 flex items-center justify-center">
                                <MdOutlineEmail fontSize={'20px'} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <button className="bg-(--primary-color) text-white w-full py-1.25 rounded font-medium text-sm cursor-pointer">Send OTP</button>
                    </div>
                    <div className="text-sm w-full flex items-center justify-center gap-1">
                        <p className="text-gray-600">Don't have an account?</p>
                        <span onClick={goToSignUp} className="text-(--primary-color) font-medium">Create one</span>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default ForgotPassword