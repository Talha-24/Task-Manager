import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";


export const ThemeProvider=createContext<{loader:boolean,setLoader:Dispatch<SetStateAction<boolean>>}>(null);
const ThemeContext:React.FC<{children:ReactNode}>=({children})=>{


    const [loader,setLoader]=useState<boolean>(false);


    return (
        <ThemeProvider.Provider value={{loader,setLoader}}>{children}</ThemeProvider.Provider>
    )
}
export default ThemeContext