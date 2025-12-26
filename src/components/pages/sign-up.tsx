import { useState } from "react";
import { useForm, } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import type { SignInDTO } from "../../mixin/classes/sign-in.dto";
import useValidations from "../../hooks/useValidation";
import ShowFormErrorMessage from "../molecules/show-form-error-message";
import { RiUserShared2Line } from "react-icons/ri";
import type { SignUpDTO } from "../../mixin/classes/sign-up.dto";
import { PiPhoneOutgoing } from "react-icons/pi";
import useNavigateHooks from "../../hooks/useNavigate";
import FormInputField from "../molecules/form-input-field";
import Button from "../atoms/button";
import { useAuthentication } from "../../hooks/useAuthentication";



const SignUp = () => {


    // custom Hooks

    const { emailValidation, passwordValidation, phoneNumberValidation, confirmPasswordValidation, validatePhoneNumber } = useValidations();
    const { goToSignIn, goTo } = useNavigateHooks();
    const {signUpViaEmail}=useAuthentication();
    // Hooks
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);


    // React Hook Form
    const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm<SignUpDTO>();

    

    // FUNCTIONS
    const onSubmit = async(data: SignInDTO) => {
        signUpViaEmail(data);
    }






    return (
        <div className="px-8 py-5 max-[500px]:p-6  bg-white rounded-lg w-100 max-w-125 max-[500px]:w-[92vw] font-[Poppins] drop-shadow-sm drop-shadow-gray-400 mx-auto ">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-[500px]:gap-2 overflow-x-auto max-h-[70vh]" >
                <h1 className="text-2xl font-semibold  font-[Poppins] text-(--primary-color)">Sign Up</h1>
                {/* HIDDEN ON MOBILE DEVICES */}
                {window.innerWidth > 500 && <p className="text-[13px]  w-full text-(--primary-btn)">Create your account and access our services</p>}
                <div className="flex flex-col items-start gap-4 text-black w-full">
                    <FormInputField label="Name" id="name" type="text" placeholder="Enter Name" formValidation={register("name", { required: true, minLength: 2 })} validationMessage={errors?.name} Icon={RiUserShared2Line} />
                    <FormInputField label="Email" id="email" type="email" placeholder="Enter Email" formValidation={register("email", emailValidation)} validationMessage={errors?.email} Icon={MdOutlineEmail} />
                    <FormInputField label="Password" id="password" type={isShowPassword ? "text" : "password"} placeholder="Enter Password" formValidation={register("password", passwordValidation)} validationMessage={errors?.password} Icon={isShowPassword ? BsEyeSlash : BsEye} IconOnClick={() => setIsShowPassword((prev) => !prev)} />
                    <FormInputField label="Confirm Password" id="confirmPassword" type={isShowConfirmPassword ? "text" : "password"} placeholder="Enter Confirm Password" formValidation={register("confirmPassword", confirmPasswordValidation((watch("password"))))} validationMessage={errors?.confirmPassword} Icon={isShowPassword ? BsEyeSlash : BsEye} IconOnClick={() => setIsShowConfirmPassword((prev) => !prev)} />
                    <div className="flex  justify-between flex-wrap w-full my-1">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="" id="" />
                            <p className="text-[14px]">Remember me?</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <Button className="bg-(--primary-color) text-white w-full py-1.25 rounded font-medium">Sign Up</Button>
                    </div>
                    <div className="text-sm w-full flex items-center justify-center gap-1">
                        <p className="text-gray-600">Already have an account?</p>
                        <span onClick={goToSignIn} className="text-(--primary-color) font-medium cursor-pointer">Sign In</span>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default SignUp