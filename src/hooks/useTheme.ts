import type { Dispatch, SetStateAction } from "react";
import useLocalStorage from "./useLocalStorage";
import { useAuthentication } from "./useAuthentication";

const usePersonalization = () => {

    let isDarkMode = document.body.classList.contains("dark");

    const {removeTheme,setTheme,getSideBar}=useLocalStorage();
    const {updateTheme}=useAuthentication();
    const toggleTheme = async(setIsDarkMode:Dispatch<SetStateAction<boolean>>) => {
        if (document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");
            isDarkMode=false;
            setIsDarkMode(false);
            removeTheme();
            updateTheme("light");
        } else {
            document.body.classList.add("dark");
            isDarkMode=true;
            setIsDarkMode(true);
            setTheme("dark");
             updateTheme("dark");
        }


    }

    type SideBarFunctionInstance=()=> boolean;
    const getPersistedSideBar:SideBarFunctionInstance=()=>{

        if(getSideBar() === "open" ){
            return true;
        }else if(getSideBar()=== "close") {
            return false;
        }else{
            // Default 
            return true;
        }

    }

    return {
        toggleTheme,
        isDarkMode,
        getPersistedSideBar,
    }

}

export default usePersonalization;