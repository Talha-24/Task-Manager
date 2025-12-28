import { useState, type FormEvent } from "react";
import { MdOutlineEmail } from "react-icons/md";
import useNavigateHooks from "../../hooks/useNavigate";
import Button from "../atoms/button";
import FormInputField from "../molecules/form-input-field";
import { useAuthentication } from "../../hooks/useAuthentication";
import BounceLoader from "../molecules/bounce-loader";



const ForgotPassword = () => {

    const [email, setEmail] = useState<string>("");
    const { forgotPassword,loader } = useAuthentication();
    const {  goToSignUp } = useNavigateHooks();



    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        forgotPassword({ email: email });
    }

    return (
        <div className="auth-box">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-[500px]:gap-2" >
                <h1 className="text-2xl font-semibold  font-[Poppins] text-(--primary-color)">Recover Account Password</h1>
                {/* HIDDEN ON MOBILE DEVICES */}
                {window.innerWidth > 500 && <p className="text-[13px]  w-full text-gray-600">Enter your email address to recover your account</p>}
                <div className="flex flex-col items-start gap-4 text-black w-full">
                    <FormInputField type="email" placeholder="Enter Email" label="Email" required pattern="^([A-Za-z0-9])+@([A-Za-z])+.([A-Za-z]{3,})$" title="Invalid email address (e.g, abc@gmail.com )" id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} fieldClassName="auth-input" Icon={MdOutlineEmail} />
                    <div className="w-full">
                        <Button disabled={loader} className="primary-auth-btn">
                            {loader ? <BounceLoader /> : "Send verification link"}
                        </Button>
                    </div>
                    <div className="text-sm w-full flex items-center justify-center gap-1">
                        <p className="text-gray-600">Don't have an account?</p>
                        <span onClick={goToSignUp} className="text-(--primary-color) font-medium cursor-pointer">Create one</span>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default ForgotPassword