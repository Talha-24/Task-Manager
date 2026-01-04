import { useState } from "react";
import { useForm, } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import type { SignInDTO } from "../../mixin/classes/sign-in.dto";
import useValidations from "../../hooks/useValidation";
import { RiUserShared2Line } from "react-icons/ri";
import type { SignUpDTO } from "../../mixin/classes/sign-up.dto";
import useNavigateHooks from "../../hooks/useNavigate";
import FormInputField from "../molecules/form-input-field";
import Button from "../atoms/button";
import { useAuthentication } from "../../hooks/useAuthentication";
import BounceLoader from "../molecules/bounce-loader";



const SignUp = () => {


    // custom Hooks

    const { emailValidation, passwordValidation, phoneNumberValidation, confirmPasswordValidation, validatePhoneNumber } = useValidations();
    const { goToSignIn, goTo } = useNavigateHooks();
    const { signUpViaEmail,isEmailSent, loader } = useAuthentication();
    // Hooks
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);


    // React Hook Form
    const { register, handleSubmit, watch, setValue,getValues, formState: { errors }, } = useForm<SignUpDTO>();



    // FUNCTIONS
    const onSubmit = async (data: SignInDTO) => {
        signUpViaEmail(data);
    }






    return (
        <div className="auth-box">
            {isEmailSent ? 
            
             <div>
                    <div className="modal-container ">
                        <div className="modal">
                            <div className="modal-header">
                                <h1 className="text-xl font-semibold  font-[Poppins] text-(--primary-color)">Account is created successfully!</h1>
                            </div>
                            <div className="modal-body">
                                <div className="text-sm">
                                    We have successfully sent a verification link to your email <h1 className="font-semibold  font-[Poppins] text-(--primary-color) text-lg"> {getValues("email")}</h1> Kindly check your email in Email box for further processing.
                                </div>
                            </div>
                            <div className="modal-footer">
                                <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank">
                                <Button className="primary-auth-btn mt-4">
                                        Open Gmail
                                </Button>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            
            : 
            
            
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-[500px]:gap-2 overflow-x-auto max-h-[70vh]" >
                <h1 className="text-2xl font-semibold  font-[Poppins] text-(--primary-color)">Sign Up</h1>
                {/* HIDDEN ON MOBILE DEVICES */}
                {window.innerWidth > 500 && <p className="text-[13px]  w-full text-(--primary-btn)">Create your account and access our services</p>}
                <div className="flex flex-col items-start gap-4 text-black w-full">
                    <FormInputField label="Name" id="name" type="text" placeholder="Enter Name" formValidation={register("name", { required: true, minLength: 2 })} validationMessage={errors?.name} Icon={RiUserShared2Line} fieldClassName="auth-input" />
                    <FormInputField label="Email" id="email" type="email" placeholder="Enter Email" formValidation={register("email", emailValidation)} validationMessage={errors?.email} Icon={MdOutlineEmail} fieldClassName="auth-input" />
                    <FormInputField label="Phone" id="phone" type="text" placeholder="Enter Email" formValidation={register("phone", phoneNumberValidation)} validationMessage={errors?.phone} Icon={MdOutlinePhone} fieldClassName="auth-input" />
                    <FormInputField label="Password" id="password" type={isShowPassword ? "text" : "password"} placeholder="Enter Password" formValidation={register("password", passwordValidation)} validationMessage={errors?.password} Icon={isShowPassword ? BsEyeSlash : BsEye} IconOnClick={() => setIsShowPassword((prev) => !prev)} fieldClassName="auth-input" />
                    <FormInputField label="Confirm Password" id="confirmPassword" type={isShowConfirmPassword ? "text" : "password"} placeholder="Enter Confirm Password" formValidation={register("confirmPassword", confirmPasswordValidation((watch("password"))))} validationMessage={errors?.confirmPassword} Icon={isShowPassword ? BsEyeSlash : BsEye} IconOnClick={() => setIsShowConfirmPassword((prev) => !prev)} fieldClassName="auth-input" />
                    <div className="flex  justify-between flex-wrap w-full my-1">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="" id="" />
                            <p className="text-[14px] text-(--primary-text)">Remember me?</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <Button disabled={loader} className="primary-auth-btn">
                            {loader ? <BounceLoader /> : "Sign Up"}</Button>
                    </div>
                    <div className="text-sm w-full flex items-center justify-center gap-1">
                        <p className="text-gray-600">Already have an account?</p>
                        <span onClick={goToSignIn} className="text-(--primary-color) font-medium cursor-pointer">Sign In</span>
                    </div>
                </div>
            </form>
            
            
            
            }
            
        </div>
    )

}

export default SignUp