import { Route, Routes } from "react-router-dom"
import SignIn from "../components/pages/sign-in"
import SignUp from "../components/pages/sign-up"
import AuthLayout from "../components/templates/auth-layout"
import { useAuthentication } from "../hooks/useAuthentication"
import { useEffect } from "react"
import useNavigateHooks from "../hooks/useNavigate"
import { ROUTES } from "../mixin/enums/enum.routes"

const PublicRoutes: React.FC = () => {

    const {session}=useAuthentication();
    const {goTo}=useNavigateHooks();

    useEffect(()=>{
        if(session?.user){
            goTo(ROUTES.TASK_MANAGER);
            return;
        }
    },[session])

    return (
        <AuthLayout>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<SignUp />} />
            </Routes>
        </AuthLayout>
    )
}

export default PublicRoutes