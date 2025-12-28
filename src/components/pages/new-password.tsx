import { useState } from "react";
import { useForm, } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useValidations from "../../hooks/useValidation";
import type { ResetPasswordDTO } from "../../mixin/classes/forgot-password.dto";
import FormInputField from "../molecules/form-input-field";
import { useAuthentication } from "../../hooks/useAuthentication";
import Button from "../atoms/button";
import BounceLoader from "../molecules/bounce-loader";



const NewPassword = () => {

    // Hooks 
    const [isShowPassword, setIsShowPassword] = useState<{ password: boolean, confirmPassword: boolean }>({ password: false, confirmPassword: false });

    //Validations
    const { passwordValidation, confirmPasswordValidation } = useValidations();
    // React Hook Form
    const { register, handleSubmit, watch, formState: { errors }, } = useForm<ResetPasswordDTO>();

    const { resetPassword, loader } = useAuthentication();

    // FUNCTIONS
    const onSubmit = async (data: ResetPasswordDTO) => {
        resetPassword(data);
    }




    return (
        <div className="auth-box">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-[500px]:gap-2 overflow-x-auto max-h-[70vh]" >
                <h1 className="text-black text-2xl font-semibold  font-[Poppins]">Sign Up</h1>
                {/* HIDDEN ON MOBILE DEVICES */}
                {window.innerWidth > 500 && <p className="text-[13px]  w-full text-gray-600">Reset Your Password </p>}
                <div className="flex flex-col items-start gap-4 text-black w-full">
                    <FormInputField label="Password" id="password" type={isShowPassword.password ? "text" : "password"} placeholder="Enter Password" formValidation={register("password", passwordValidation)} validationMessage={errors?.password} Icon={isShowPassword.password ? BsEyeSlash : BsEye} IconOnClick={() => setIsShowPassword((prev) => ({ ...prev, password: !prev.password }))} fieldClassName="auth-input" />
                    <FormInputField label="Confirm Password" id="confirmPassword" type={isShowPassword.confirmPassword ? "text" : "password"} placeholder="Enter Confirm Password" formValidation={register("confirmPassword", confirmPasswordValidation((watch("password"))))} validationMessage={errors?.confirmPassword} Icon={isShowPassword ? BsEyeSlash : BsEye} IconOnClick={() => setIsShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))} fieldClassName="auth-input" />
                    <div className="w-full">
                        <Button className="primary-auth-btn">
                            {loader ? <BounceLoader /> : "Reset Password"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default NewPassword