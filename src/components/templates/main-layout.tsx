import { LuMoon } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";
import useTheme from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { useState, type ReactNode } from "react";
import SideBar from "./sidebar";

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [isDark, setIsDark] = useState<boolean>(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
    const { toggleTheme } = useTheme();





    return (
        <div className="flex justify-between items-center h-screen max-[380px]:px-5 bg-(--primary-dark-bg)">
            <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />

            {/* App Pages */}
            <div className={`${isSideBarOpen ? 'w-[calc(100% - 280px)]' : 'w-[calc(100% - 80px )]'}`}>{children}</div>


            {/* THEME MANAGEMENT */}
            <div onClick={() => { toggleTheme(setIsDark); }} className="cursor-pointer">
                {isDark ?
                    <MdOutlineWbSunny
                        fontSize={20}
                         className="fixed top-6 right-5 text-white" />
                    :
                    <LuMoon fontSize={20} className="fixed top-6 right-5 text-black" />
                }
            </div>
        </div>
    )
}
export default MainLayout