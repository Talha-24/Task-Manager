
import { Fragment, useEffect, type Dispatch, type SetStateAction } from "react";
import NavItem from "../atoms/NavItem";
import ListIcon from "../../../public/icons/ListIcon";
import SettingIcon from "../../../public/icons/SettingIcon";
import MenuIcon from "../../../public/icons/MenuIcon";
import { NavLink, } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { ROUTES } from "../../mixin/enums/enum.routes";
import { BiBook, BiLogOut } from "react-icons/bi";
const SideBar: React.FC<{ isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }> = ({ isOpen, setIsOpen }) => {

    const { profile,updateSideBar} = useAuthentication();

    useEffect(()=>{
        if(isOpen){
            updateSideBar(true);
        }else{
            updateSideBar(false);
        }
    },[isOpen])

    return (
        <Fragment>
            {/* FOR MOBILE SCREENS */}
            <div className={`min-[440px]:w-20`}>
                <MenuIcon onClick={() => { setIsOpen((prev) => !prev) }} className="absolute top-6 left-5" stroke="var(--primary-text)" />
            </div>

            {window.innerWidth > 440 &&

                <div className={`transition-all duration-300  bg-(--secondary-dark-bg) ${isOpen ? ` w-70` : ` w-20 `} absolute`}>
                    {isOpen ?
                        <div className="flex flex-col gap-4 p-4 px-6 mr-auto   shadow-[2px_0_5px_rgba(0,0,0,0.2)] min-h-screen ">

                            <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer  flex  justify-start mt-2">
                                <MenuIcon stroke="var(--primary-text)" />
                            </div>

                            <div className="profile flex items-center justify-center  border-b-(--text-gray) border-b-[1.5px] py-4">
                                <div className="flex flex-col gap-2 items-center justify-center text-center">
                                    <div className="h-[60] w-[60] border-black  border-b-[1.5px] rounded-full">
                                        <img src="" alt="" className="w-full h-full " />
                                    </div>
                                    <div >
                                        <h1 className="font-bold py-2 text-(--primary-text)">{profile?.user_metadata?.username}</h1>
                                        <h2 className="text-sm text-(--text-gray)">{profile?.email}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 whitespace-nowrap">
                                <NavLink to={ROUTES.TASK_MANAGER}
                                    className={({ isActive }) => (isActive ? 'my-active-class' : '')}
                                >

                                    <NavItem title="My Tasks"

                                        svg={<ListIcon stroke="var(--primary-text)" />} />
                                </NavLink>


                                <NavLink to={ROUTES.MY_JOURNALS}
                                    className={({ isActive }) => (isActive ? 'my-active-class' : '')}
                                >
                                    <NavItem title="My Journals"
                                        svg={<BiBook stroke="var(--primary-text)" />} />
                                </NavLink>
                                <NavLink to={ROUTES.SETTINGS}
                                    className={({ isActive }) => (isActive ? "my-active-class" : "inactive")}

                                >
                                    <NavItem title="Settings" svg={<SettingIcon fontSize={40} />} />
                                </NavLink>

                                <NavLink to={ROUTES.LOGOUT}
                                    className={({ isActive }) => (isActive ? "my-active-class" : "inactive")}

                                >
                                    <NavItem title="Log out" svg={<BiLogOut fontSize={40} />} />
                                </NavLink>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col gap-4  h-screen p-4   mr-auto px-3  shadow-[2px_0_5px_rgba(0,0,0,0.2)]">
                            <div onClick={() => { setIsOpen((prev) => !prev) }} className="border-b-(--text-gray) border-b-[1.5px] flex items-center justify-center py-3 pb-6">
                                <MenuIcon stroke="var(--primary-text)" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <NavLink to={ROUTES.TASK_MANAGER}

                                    className={({ isActive }) => (isActive ? "my-active-class" : "inactive")}

                                >
                                    <div className="burger-icon flex items-center justify-center py-2  rounded-lg cursor-pointer">
                                        <ListIcon stroke="var(--primary-text)" />
                                    </div>
                                </NavLink>
                                <NavLink to={ROUTES.MY_JOURNALS}

                                    className={({ isActive }) => (isActive ? "my-active-class" : "inactive")}

                                >
                                    <div className="burger-icon flex items-center justify-center py-2  rounded-lg cursor-pointer">
                                        <BiBook stroke="var(--primary-text)" />
                                    </div>
                                </NavLink>
                                <NavLink to={ROUTES.SETTINGS}
                                    className={({ isActive }) => (isActive ? "my-active-class" : "inactive")}
                                >
                                    <div className="burger-icon flex items-center justify-center py-2  rounded-lg cursor-pointer">
                                        <SettingIcon />
                                    </div>
                                </NavLink>



                                <NavLink to={ROUTES.LOGOUT}
                                    className={({ isActive }) => (isActive ? "my-active-class" : "inactive")}
                                >
                                    <div className="burger-icon flex items-center justify-center py-2  rounded-lg cursor-pointer">
                                        <BiLogOut />
                                    </div>
                                </NavLink>



                            </div>
                        </div>

                    }
                </div>



            }
        </Fragment>
    )

}

export default SideBar