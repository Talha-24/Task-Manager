
import { createContext, useEffect, useState, type ReactNode } from "react"
import { supabase } from "../../database/supabase/supabaseClient";
import type { SignUpDTO } from "../../mixin/classes/sign-up.dto";
import useLocalStorage from "../../hooks/useLocalStorage";
import type { SignInDTO } from "../../mixin/classes/sign-in.dto";
import type { Session, User } from "@supabase/supabase-js";
import useNavigateHooks from "../../hooks/useNavigate";
import { toast } from "sonner";
import { ROUTES } from "../../mixin/enums/enum.routes";

type signUpInstance = (body: SignUpDTO) => void;
type signInInstance = (body: SignInDTO) => void;
type signOutInstance = () => void;


interface AuthenticationDataInstance {
    signUpViaEmail: signUpInstance;
    signInViaEmail: signInInstance;
    signOut: signOutInstance;
    isAuthenticated: boolean;
    session: Session | null | undefined,
    profile: User | null | undefined,
}

const defaultData: AuthenticationDataInstance = {
    signInViaEmail: () => { },
    signUpViaEmail: () => { },
    signOut: () => { },
    isAuthenticated: false,
    session: null,
    profile: null,
}

export const Authentication = createContext<AuthenticationDataInstance>(defaultData);


const AuthenticationContext: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Helper States
    const [session, setSession] = useState<Session | null>();
    const [profile, setProfile] = useState<User>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    /*---- Authentication Via Supabase ----*/
    const { setValue, removeValue } = useLocalStorage();
    const { goTo } = useNavigateHooks();

    // Sign-Up

    const signUpViaEmail = async (body: SignUpDTO) => {

        const { error } = await supabase.auth.signUp({
            email: body.email,
            password: body.password,
            options: {
                data: {
                    username: body.name,
                },
            }
        })

        if (!error) {
            toast.success("Account is created successfully ", {
                description: `We have sent verification email at ${body.email}`,
                duration: 5000,
            })
        }

    }



    // Sign-In

    const signInViaEmail = async (body: SignInDTO) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email: body.email, password: body.password });
        if (data.session) {
            setSession(data.session);
            setProfile(data.user);
            setValue("user", JSON.stringify(data.user));
            setValue("session", JSON.stringify(data.session));
            setValue("userId",data?.user?.id);
            goTo("/app/task-manager");
        } else {
            toast.error(error?.status, {
                description: error?.message,
                duration: 5000,
            })
        }
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



    // Keep checking if user is logged out

    useEffect(() => {


        const { data: AuthClient } = supabase.auth.onAuthStateChange((event, session) => {
            if (event == "SIGNED_IN") {
                setSession(session);
                setProfile(session?.user);
                setValue("userId",session?.user?.id);
                setIsAuthenticated(true);
                
            } else if (event == "SIGNED_OUT") {
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
        <Authentication.Provider value={{ signInViaEmail, signUpViaEmail, signOut, isAuthenticated, session, profile }} >{children}</Authentication.Provider>
    )
}
export default AuthenticationContext