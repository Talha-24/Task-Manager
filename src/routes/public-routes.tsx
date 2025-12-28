import { Route, Routes } from "react-router-dom"
import SignIn from "../components/pages/sign-in"
import SignUp from "../components/pages/sign-up"
import AuthLayout from "../components/templates/auth-layout"
import { useAuthentication } from "../hooks/useAuthentication"
import { useEffect } from "react"
import useNavigateHooks from "../hooks/useNavigate"
import { ROUTES } from "../mixin/enums/enum.routes"
import ForgotPassword from "../components/pages/forgot-password"
import NewPassword from "../components/pages/new-password"
import useLocalStorage from "../hooks/useLocalStorage"

const PublicRoutes: React.FC = () => {

    const {session}=useAuthentication();
    const {getValue}=useLocalStorage();
    const {goTo}=useNavigateHooks();

    useEffect(()=>{
        if(getValue("session")){
            goTo(ROUTES.TASK_MANAGER);
            return;
        }
    },[session])

    return (
        <AuthLayout>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/new-password" element={<NewPassword />} />
            </Routes>
        </AuthLayout>
    )
}

export default PublicRoutes