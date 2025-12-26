import type { Dispatch, SetStateAction } from "react";
import useLocalStorage from "./useLocalStorage";

const useTheme = () => {

    let isDarkMode = document.body.classList.contains("dark");

    const {getTheme,removeTheme,setTheme}=useLocalStorage();
    const toggleTheme = (setIsDarkMode:Dispatch<SetStateAction<boolean>>) => {
        if (document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");
            isDarkMode=false;
            setIsDarkMode(false);
            removeTheme();
        } else {
            document.body.classList.add("dark");
            isDarkMode=true;
            setIsDarkMode(true);
            setTheme("dark");
        }


    }

    return {
        toggleTheme,
        isDarkMode,
    }

}

export default useTheme;