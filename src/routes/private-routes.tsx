import { Route, Routes } from "react-router-dom"
import MainLayout from "../components/templates/main-layout"
import TaskManager from "../components/pages/task-manager"
import Settings from "../pages/app/settings"
import LogOut from "../components/pages/log-out"
import useNavigateHooks from "../hooks/useNavigate"
import { useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import RoundLoader from "../components/molecules/loader"
import Profile from "../components/pages/profile"
import MyJournals from "../components/pages/my-journals"
import SupabaseProducts from "../components/supabase-products"
import Subscriptions from "../components/subscriptions"
import ProductRoutes from "./products-routes"


const PrivateRoutes = () => {



    // ROUTE PROTECTION
    const { goToSignIn } = useNavigateHooks();
    const { getValue } = useLocalStorage();
    const session = getValue("session");

    useEffect(() => {
        if (!session) {
            goToSignIn();
        }
    }, [session])


    if (!session) {

        return <h1><RoundLoader /></h1>
    }





    return (
        <MainLayout>
            <Routes>
                <Route path="task-manager" element={<TaskManager />} />
                <Route path="my-journals" element={<MyJournals />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="logout" element={<LogOut />} />
                <Route path="products/*" element={<ProductRoutes />} />
            </Routes>
        </MainLayout>
    )

}

export default PrivateRoutes