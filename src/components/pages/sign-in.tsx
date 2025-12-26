import {  useState } from "react";
import { useForm, } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import type { SignInDTO } from "../../mixin/classes/sign-in.dto";
import useValidations from "../../hooks/useValidation";
import FormInputField from "../molecules/form-input-field";
import useNavigateHooks from "../../hooks/useNavigate";
import Button from "../atoms/button";
import { useAuthentication } from "../../hooks/useAuthentication";



const SignIn = () => {

    // Hooks
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    //Validations
    const { emailValidation,passwordValidation } = useValidations();
    const {goToSignUp,goToForgotPassword}=useNavigateHooks();
    // React Hook Form
    const { register, handleSubmit, formState: { errors }, } = useForm<SignInDTO>();
    const {signInViaEmail}=useAuthentication();

    // FUNCTIONS
    const onSubmit = (data: SignInDTO) => {
        signInViaEmail(data);
    }


// console.log("USERSSS ",user);
    return (
        <div className="px-8 py-5 max-[500px]:p-6  bg-white rounded-lg w-100 max-w-125 max-[500px]:w-[92vw] font-[Poppins] drop-shadow-sm drop-shadow-gray-400">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-[500px]:gap-2" >
                <h1 className="text-(--primary-color) text-2xl font-semibold  font-[Poppins]">Sign In</h1>

                {/* HIDDEN ON MOBILE DEVICES */}
                {window.innerWidth > 500 && <p className="text-[13px]  w-full text-(--primary-btn)">Enter your credentials to access your account</p>}
                <div className="flex flex-col items-start gap-4 text-black w-full">
                        <FormInputField label="Email" type="email" placeholder="Enter Email" id="email"  validationMessage={errors?.email} formValidation={register("email", emailValidation)} Icon={MdOutlineEmail} />
                        <FormInputField label="Password" type={isShowPassword ? "text" : "password"} placeholder="Enter Password" id="password"  validationMessage={errors?.email} formValidation={register("password", passwordValidation)} Icon={isShowPassword ? BsEyeSlash  : BsEye } IconOnClick={()=>{setIsShowPassword((prev)=>!prev)}} />
                    <div className="flex  justify-between flex-wrap w-full my-1">
                        <div className="flex items-center gap-2">
                            <input type="checkbox"  id="rememberMe"  />
                            <label htmlFor="rememberMe" className="text-[14px]">Remember me?</label>
                        </div>
                        <div className="w-full text-right cursor-pointer" onClick={goToForgotPassword}>
                            <p className="text-[14px]  text-(--primary-color) font-medium text-right">Forgot password?</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <Button className="bg-(--primary-color) text-white w-full py-1.25 rounded font-medium cursor-pointer">Sign in</Button>
                    </div>
                    <div className="text-sm w-full flex items-center justify-center gap-1">
                        <p className="text-gray-600">Don't have an account?</p>
                        <span className="text-(--primary-color) font-medium cursor-pointer" onClick={goToSignUp}>Create one</span>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default SignIn;