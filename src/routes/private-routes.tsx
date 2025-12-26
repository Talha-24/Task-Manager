import { Route, Routes } from "react-router-dom"
import MainLayout from "../components/templates/main-layout"
import TaskManager from "../components/pages/tast-manager"
import Settings from "../pages/app/settings"
import LogOut from "../components/pages/log-out"
import useNavigateHooks from "../hooks/useNavigate"
import { useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import RoundLoader from "../components/molecules/loader"


const PrivateRoutes = () => {



    // ROUTE PROTECTION
    const { goToSignIn } = useNavigateHooks();
    const {getValue}=useLocalStorage();
    const session=getValue("session");

    useEffect(()=>{
        if(!session){
            goToSignIn();
        }
    },[session])


    if(!session){

        return <h1><RoundLoader/></h1>
    }
    




    return (
        <MainLayout>
            <Routes>
                <Route path="task-manager" element={<TaskManager />} />
                <Route path="settings" element={<Settings />} />
                <Route path="logout" element={<LogOut />} />
            </Routes>
        </MainLayout>
    )

}

export default PrivateRoutes