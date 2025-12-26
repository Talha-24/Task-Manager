import { useState } from "react";
import { useForm, } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import type { SignInDTO } from "../../mixin/classes/sign-in.dto";
import useValidations from "../../hooks/useValidation";
import ShowFormErrorMessage from "../error-messages/show-form-error-message";
import type { SignUpDTO } from "../../mixin/classes/sign-up.dto";
import type { ResetPasswordDTO } from "../../mixin/classes/forgot-password.dto";



const NewPassword = () => {

    // Hooks
    const [isShowPassword, setIsShowPassword] = useState<{password:boolean,confirmPassword:boolean}>({password:false,confirmPassword:false});
    //Validations
    const {  passwordValidation } = useValidations();
    // React Hook Form
    const { register, handleSubmit,watch, formState: { errors }, } = useForm<ResetPasswordDTO>();


    // FUNCTIONS
    const onSubmit = (data: ResetPasswordDTO) => {
        console.log(data);
    }




    return (
        <div className="px-8 py-5 max-[500px]:p-6  bg-white rounded-lg w-[400px] max-w-[500px] max-[500px]:w-[92vw] font-[Poppins] drop-shadow-sm drop-shadow-gray-400">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-[500px]:gap-2 overflow-x-auto max-h-[70vh]" >
                <h1 className="text-black text-2xl font-semibold  font-[Poppins]">Sign Up</h1>
                {/* HIDDEN ON MOBILE DEVICES */}
                {window.innerWidth > 500 && <p className="text-[13px]  w-full text-gray-600">Reset Your Password </p>}
                <div className="flex flex-col items-start gap-4 text-black w-full">
                    <div className="flex flex-col gap-0.5 text-left w-full">
                        <label htmlFor="password" className="font-medium text-sm">Password</label>
                        <div className="flex items-center border border-[#dadada] rounded-[7px] pr-1">
                            <input type={isShowPassword.password ? "text" : "password"} placeholder="Enter Password" {...register("password", passwordValidation)} id="password" className="px-2.5 py-1.5 placeholder:text-[14px] outline-none w-full text-[14px] rounded-l-md" />
                            <div className="w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => setIsShowPassword((prev) => ({...prev,password:!prev.password}))}>
                                {isShowPassword.password ? <BsEyeSlash fontSize={'18px'} /> : <BsEye fontSize={'18px'} />}
                            </div>
                        </div>
                        <ShowFormErrorMessage error={errors?.password} />
                    </div>

                    <div className="flex flex-col gap-0.5 text-left w-full">
                        <label htmlFor="password" className="font-medium text-sm">Confirm Password</label>
                        <div className="flex items-center border border-[#dadada] rounded-[7px] pr-1">
                            <input type={isShowPassword.confirmPassword ? "text" : "password"} placeholder="Enter Confirm Password" {...register("confirmPasword", {required:{value:true,message: 'Confirm Password is required'},validate:(value)=>value === watch('password') || "Passwords do not match",})} id="password" className="px-2.5 py-1.5 placeholder:text-[14px] outline-none w-full text-[14px] rounded-l-md" />
                            <div className="w-8 h-8 flex items-center justify-center cursor-pointer" onClick={() => setIsShowPassword((prev) => ({...prev,confirmPassword:!prev.confirmPassword}))}>
                                {isShowPassword.confirmPassword ? <BsEyeSlash fontSize={'18px'} /> : <BsEye fontSize={'18px'} />}
                            </div>
                        </div>
                        <ShowFormErrorMessage error={errors?.confirmPasword} />
                    </div>
                    <div className="w-full">
                        <button className="bg-(--primary-color) text-white w-full py-[5px] rounded font-medium">Reset Password</button>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default NewPassword