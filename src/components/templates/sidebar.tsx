
import { useState, type ReactNode } from "react";
import NavItem from "../atoms/NavItem";
import ListIcon from "../../../public/icons/ListIcon";
import SettingIcon from "../../../public/icons/SettingIcon";
import MenuIcon from "../../../public/icons/MenuIcon";
import { NavLink, useNavigate } from "react-router-dom";
import MoonIcon from "../../../public/icons/MoonIcon.tsx"

const SideBar: React.FC<{ children: ReactNode }> = ({ children }) => {


    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const goTo = useNavigate();


    // const SideBarItems = {

    //     desktop:
    //         [
    //             {
    //                 svg: MenuIcon,
    //             },

    //             {
    //                 title: "Mohammad Talha",
    //                 email: "talhacoder1033@gmail.com",

    //             },

    //             {
    //                 title: "My Tasks",
    //                 svg: ListIcon,
    //             },

    //             {
    //                 title: "Setting",
    //                 svg: SettingIcon,
    //             },
    //         ],

    //     mobile: [
    //         MenuIcon,
    //         ListIcon,
    //         SettingIcon,
    //     ]

    // }

    // let children = document.getElementById("children") as any;
    // useEffect(() => {
    //     if (isOpen) {
    //         children.style.backgroundColor = "var(--text-primary)";
    //         window.document.body.style.opacity = "40%"

    //     } else {
    //         children.style.backgroundColor = "var(--text-primary)";
    //         window.document.body.style.opacity = "40%";
    //     }
    // }, [isOpen])


    return (
        <div className="flex justify-between items-center h-screen max-[380px]:px-5 bg-(--primary-dark-bg)">
            {/* SIDE BAR */}
            {window.innerWidth > 440 && !isMobile &&
                <div className={`transition-all duration-300  bg-(--secondary-dark-bg) ${isOpen ? ` w-70` : ` w-20 `} absolute`}>
                    {isOpen ?
                        <div className="flex flex-col gap-4 p-4 px-6 mr-auto   shadow-[2px_0_5px_rgba(0,0,0,0.2)] min-h-screen ">

                            <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer  flex  justify-start mt-2">
                                <MenuIcon stroke="var(--primary-text)" />
                            </div>

                            <div className="profile flex items-center justify-center  border-b-(--text-gray) border-b-[1.5px] py-4">
                                <div className="flex flex-col gap-2 items-center justify-center text-center">
                                    <div className="h-[60] w-[60] border-black  border-b-[1.5px] rounded-full">
                                        <img src="" alt="" className="w-full h-full" />
                                    </div>
                                    <div >
                                        <h1 className="font-bold py-2 text-(--primary-text)">Name</h1>
                                        <h2 className="text-sm text-(--text-gray)">talhacoder1033@gmail.com</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="features flex flex-col gap-3 whitespace-nowrap">
                                <NavLink to={"/app/home/task-manager"}
                                    className={({ isActive }) => ( isActive ? 'my-active-class': '')}
                                >

                                    <NavItem title="My Tasks"

                                        svg={<ListIcon stroke="var(--primary-text)" />} onClick={() => { goTo("/app/home/task-manager") }} />
                                </NavLink>
                                <NavLink to={"/app/home/settings"}
                                    className={({ isActive }) => (isActive ? "my-active-class" : "inactive")}

                                >
                                    <NavItem title="Settings" svg={<SettingIcon stroke="var(--primary-text)" />} onClick={() => { goTo("/app/home/settings") }} />
                                </NavLink>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col gap-4  h-screen p-4   mr-auto px-3  shadow-[2px_0_5px_rgba(0,0,0,0.2)]">
                            <div onClick={() => { setIsOpen((prev) => !prev) }} className="border-b-(--text-gray) border-b-[1.5px] flex items-center justify-center py-3 pb-6">
                                <MenuIcon stroke="var(--primary-text)" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <NavLink to={"/app/home/task-manager"}

                                    className={({ isActive }) => (isActive ? "my-active-class" : "inactive")}

                                >
                                    <div className="burger-icon flex items-center justify-center py-2 hover:bg-[#F3F4F6] rounded-lg cursor-pointer">
                                        <ListIcon stroke="var(--primary-text)" />
                                    </div>
                                </NavLink>

                                <NavLink to={"/app/home/settings"}
                                    className={({ isActive }) => (isActive ? "my-active-class" : "inactive")}
                                >
                                    <div className="burger-icon flex items-center justify-center py-2 hover:bg-[#F3F4F6] rounded-lg cursor-pointer">
                                        <SettingIcon stroke="var(--primary-text)" />
                                    </div>
                                </NavLink>
                            </div>
                        </div>

                    }
                </div>
            }


            <div className={`${window.innerWidth > 440 && `w-20`}`}>
                {window.innerWidth < 440
                    &&
                    <MenuIcon className="absolute top-6 left-5" />
                }
            </div>
            <div className={`${isOpen ? 'w-[calc(100% - 280px)]' : 'w-[calc(100% - 80px )]'}`}>
                {children}</div>
            <div className="">
                <MoonIcon className="absolute top-6 right-5" />
            </div>
        </div>
    )

}

export default SideBar