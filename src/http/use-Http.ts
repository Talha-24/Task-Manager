import axios from "axios"


const useHttppp = () => {



    const configureInterceptor = () => {
        axios.interceptors.request.use((config) => {
            // setLoader(true);
            return config;
        })

        axios.interceptors.response.use((config) => {
            // setLoader(false);
            return config;
        })


    }

    return {
        configureInterceptor,
    }
}
export default useHttppp