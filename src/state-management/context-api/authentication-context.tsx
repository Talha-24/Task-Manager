
import { createContext, useEffect, useState, type ReactNode } from "react"
import { supabase } from "../../database/supabase/supabaseClient";
import type { SignUpDTO } from "../../mixin/classes/sign-up.dto";
import useLocalStorage from "../../hooks/useLocalStorage";
import type { SignInDTO } from "../../mixin/classes/sign-in.dto";
import type { Session, User } from "@supabase/supabase-js";
import useNavigateHooks from "../../hooks/useNavigate";
import { toast } from "sonner";
import { ROUTES } from "../../mixin/enums/enum.routes";
import type { ForgotPasswordDTO, ResetPasswordDTO } from "../../mixin/classes/forgot-password.dto";
import type { ThemeInstance } from "../../services/interface/common.types";

type signUpInstance = (body: SignUpDTO) => void;
type signInInstance = (body: SignInDTO) => void;
type signOutInstance = () => void;
type forgotPasswordInstance = (email: ForgotPasswordDTO) => void;
type resetPasswordInstance = (body: ResetPasswordDTO) => void;
type personalizationInstance = () => void;
type updateThemeInstance=(body:ThemeInstance)=>void;
type updateSideBarInstance=(body:boolean)=>void;
interface AuthenticationDataInstance {
    signUpViaEmail: signUpInstance;
    signInViaEmail: signInInstance;
    signOut: signOutInstance;
    forgotPassword: forgotPasswordInstance;
    resetPassword: resetPasswordInstance;
    getUserPersonalization: personalizationInstance;
    updateTheme:updateThemeInstance;
    updateSideBar:updateSideBarInstance;
    isAuthenticated: boolean;
    session: Session | null | undefined;
    profile: User | null | undefined;
    loader: boolean;
    isEmailSent:boolean;
}

const defaultData: AuthenticationDataInstance = {
    signInViaEmail: (body: SignInDTO) => { },
    signUpViaEmail: (body: SignUpDTO) => { },
    signOut: () => { },
    forgotPassword: (email: ForgotPasswordDTO) => { },
    resetPassword: (body: ResetPasswordDTO) => { },
    getUserPersonalization: () => { },
    updateTheme:(body:ThemeInstance)=>{},
    updateSideBar:()=>{},
    isAuthenticated: false,
    session: null,
    profile: null,
    loader: false,
    isEmailSent:false,
}

export const Authentication = createContext<AuthenticationDataInstance>(defaultData);


const AuthenticationContext: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Helper States
    const [session, setSession] = useState<Session | null>();
    const [profile, setProfile] = useState<User>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [isEmailSent,setIsEmailSent]=useState<boolean>(false);

    /*---- Authentication Via Supabase ----*/

    const { setValue, getValue, removeValue } = useLocalStorage();
    const { goTo } = useNavigateHooks();

    // Sign-Up

    const signUpViaEmail = async (body: SignUpDTO) => {
        setLoader(true);
        const { data, error } = await supabase.auth.signUp({
            email: body.email,
            password: body.password,
            phone: body.phone,
            options: {
                data: {
                    username: body.name,
                },
            }
        })
        if (error) {
            toast.error(error.name, {
                description: error.message,
            })
            setLoader(false);
        }

        else if (!error) {
            setIsEmailSent(true);
            // if (profile) {
            const defaultPersonalization = {
                theme: "light",
                sidebar: "open",
                id: data.user?.id,
            }
            const { error } = await supabase.from("personalization").upsert([defaultPersonalization]);

            setValue("sidebar", defaultPersonalization.sidebar);
            setValue("theme", defaultPersonalization.theme);

            if (!error) {

                const newProfile = {
                    name: body.name,
                    email: body.email,
                    password: body.password,
                    phone: body.phone,
                    picture: `https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=`,
                    personalization_id: data?.user?.id,
                };
                const { data: profile } = await supabase.from("profiles").upsert([newProfile]).eq("email", body?.email).select("id").maybeSingle();

                console.log("profileId", profile?.id);
                setValue("profileId", profile?.id);

                // }

                setLoader(false);

            }
        }

    }



    // Sign-In

    const signInViaEmail = async (body: SignInDTO) => {
        setLoader(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email: body.email, password: body.password });
        if (data.session) {
            initUserAuthentication(data.session);

            goTo("/app/task-manager");
        } else {
            toast.error(error?.status, {
                description: error?.message,
                duration: 5000,
            })
        }
        setLoader(false);
    }

    const forgotPassword = async (body: ForgotPasswordDTO) => {
        setLoader(true);
        const { data } = await supabase.auth.resetPasswordForEmail(body.email, {
            redirectTo: `http://localhost:5173/public/new-password`,
        });
        if (data) {
            setValue("email", body.email);
            setIsEmailSent(true);
            console.log("DATA ",data);
        }
        setLoader(false);
    }

    const resetPassword = async (body: ResetPasswordDTO) => {
        setLoader(true);
        const { data, error } = await supabase.auth.updateUser({
            email: getValue("email") as string,
            password: body.password,
        })

        if (data) {
            toast.success("Your password is reset successfully!", {
                description: "Login with new password",
            });
            goTo(ROUTES.SIGNIN);
        } else {
            toast.success("Error in  updating password successfully!", {
                description: "Try again later,",
            });
        }


        setLoader(false);
    }

    const signOut = async () => {

        const { error: AuthError } = await supabase.auth.signOut();
        console.log("SINGED OUT ", AuthError);
        if (!AuthError) {
            toast.success("Log Out", {
                description: "You are successfully logged out",
            })
        }

    }


    // PERSONALIZATION

    const getUserPersonalization = async () => {
        const { data, error } = await supabase.from("profiles").select(`*,personalization(*)`).eq("personalization_id", getValue("userId")).maybeSingle();
        if (data) {
            setValue("sidebar", data.personalization?.sidebar);
            setValue("theme", data.personalization?.theme);
            setProfile(data);
        } else {
        }
    }

    const updateSideBar = async (sidebar: boolean) => {
        if (sidebar === true) {
            await supabase.from("personalization").update([{ sidebar: "open" }]).eq("id",getValue("userId"));
            setValue("sidebar","open");
        } else {
            await supabase.from("personalization").update([{ sidebar: "close" }]).eq("id",getValue("userId"));
            setValue("sidebar","close");
        }

    }

    const updateTheme = async (theme: "dark" | "light") => {
        await supabase.from("personalization").update([{ theme }]).eq("id",getValue("userId"));
    }

    useEffect(() => {
        getUserPersonalization();
    }, [])

    // Keep checking if user is logged out

    const initUserAuthentication = (session: Session | null) => {
        setLoader(true);
        setSession(session);
        setProfile(session?.user);
        setValue("user", session?.user);
        setValue("session", session);
        setValue("userId", session?.user.id);
        setLoader(false);
    }



    useEffect(() => {
        const { data: AuthClient } = supabase.auth.onAuthStateChange((event, session) => {
            if (event == "SIGNED_OUT") {
                setSession(null);
                setIsAuthenticated(false);
                removeValue("session");
                removeValue("user");
                removeValue("userId");
                goTo(ROUTES.SIGNIN);
            }
        })


        return () => {
            AuthClient.subscription.unsubscribe();
        }
    }, [])



    return (
        <Authentication.Provider value={{ signInViaEmail, signUpViaEmail, signOut, forgotPassword, resetPassword, getUserPersonalization,updateSideBar,updateTheme,isAuthenticated, session, profile, loader,isEmailSent }} >{children}</Authentication.Provider>
    )
}
export default AuthenticationContext