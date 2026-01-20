import axios from "axios"
import api from "./axios-instance"


const useHttppp = () => {



    const configureInterceptor = () => {
        const token=localStorage.getItem("token");

        

        api.interceptors.request.use((config) => {

            const token="token";
            if(token){
                config.headers.Authorization=`Bearer ${token}`;
            }

            return config;
        })

        api.interceptors.response.use((config) => {
            
            return config;
        })


    }

    return {
        configureInterceptor,
    }
}
export default useHttppp