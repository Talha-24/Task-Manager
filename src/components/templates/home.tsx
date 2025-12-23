import { Route, Routes } from "react-router-dom"
import TaskManager from "../pages/tast-manager"
import Settings from "../../pages/app/settings"

const Home: React.FC = () => {



    return (
        <Routes>
            <Route path="task-manager" element={<TaskManager />} />
            <Route path="settings" element={<Settings />} />
        </Routes>
    )
}
export default Home