import { useEffect, useState, type ReactNode } from "react";
import RoundLoader from "../components/molecules/loader";
import useNavigateHooks from "../hooks/useNavigate";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../mixin/enums/enum.routes";


const isAuthenticated = () => {

    return localStorage.getItem("session");
}


const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<null | string>(isAuthenticated());

    const goTo = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuth) {
            goTo('/auth/signin', { state: { from: location }, replace: true });

        }
    }, [location, isAuth, goTo])


    // KEEP CHECKING CHANGE IN TOKEN

    useEffect(() => {

        const checkAuth = () => {
            setIsAuth(isAuthenticated());
        }

        window.addEventListener("storage", checkAuth);

        return () => {
            window.addEventListener("storage", checkAuth)
        }

    }, [])


    if (!isAuth) {
        return <RoundLoader />
    }

    return children;

}

export default AuthGuard;