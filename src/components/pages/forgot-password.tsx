import { use, useEffect, useState, type FormEvent } from "react";
import { MdCancel, MdOutlineEmail } from "react-icons/md";
import useNavigateHooks from "../../hooks/useNavigate";
import Button from "../atoms/button";
import FormInputField from "../molecules/form-input-field";
import { useAuthentication } from "../../hooks/useAuthentication";
import BounceLoader from "../molecules/bounce-loader";
import Dialog from "../templates/dialog-modale";
import { toast } from "sonner";
import { BiCross } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
import { GiMailbox } from "react-icons/gi";
import { GoMail } from "react-icons/go";



const ForgotPassword = () => {

    const [email, setEmail] = useState<string>("");
    const { forgotPassword, loader, isEmailSent } = useAuthentication();
    const [emailCount, setEmailCount] = useState<number>(1);

    const { goToSignUp } = useNavigateHooks();



    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (emailCount <= 5) {
            setEmailCount((prev) => prev + 1);
            forgotPassword({ email: email });
        } else {
            toast.warning("Error", {
                description: "You have reached maximum email sent request. Try again after 5 minutes",
            })

            return;
        }
    }

    useEffect(() => {

        if (emailCount > 5) {
            setTimeout(() => {
                setEmailCount(0);
            }, 50000);
        }
    }, [emailCount])



    return (
        <div className="auth-box">
            {isEmailSent ?

                <div>
                    <div className="modal-container ">
                        <div className="modal">
                            <div className="modal-header">
                                <h1 className="text-xl font-semibold  font-[Poppins] text-(--primary-color)">Verification link jas successfully sent!</h1>
                            </div>
                            <div className="modal-body">
                                <div className="text-sm">
                                    We have successfully sent a verification link to your email <h1 className="font-semibold  font-[Poppins] text-(--primary-color) text-lg"> {email}</h1> Kindly check your email in Gmail box for further processing.
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


                // <Dialog title={"`} footer={<Button className="primary-auth-btn">Open Gmail</Button>} /> 
                :
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
            }
        </div>
    )

}

export default ForgotPassword