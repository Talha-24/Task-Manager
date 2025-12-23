import axios from "axios"
import { useContext } from "react"
import { ThemeProvider } from "../state-management/context/ThemeContext"


const useHttp = () => {



    const { setLoader } = useContext(ThemeProvider);
    
    const configureInterceptor = () => {
        axios.interceptors.request.use((config) => {
            setLoader(true);
            return config;
        })

        axios.interceptors.response.use((config) => {
            setLoader(false);
            return config;
        })


    }

    return {
        configureInterceptor,
    }
}
export default useHttp