// import axios, { AxiosError, type AxiosRequestConfig } from "axios";
// import { toast } from "sonner";

import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import { toast } from "sonner";

// Request Method
export const getRequest = async (url: string, params = {}, config: AxiosRequestConfig = {}) => {

    try {
        const response = await axios.get(url, { params, ...config });
        return response?.data;
    } catch (error) {
        errorHandler(error as AxiosError);
    }

}

// Post METHOD
export const postRequest = async (url: string, body: any, params = {}, config: AxiosRequestConfig = {}) => {
    try {
        const response = await axios.post(url, body, { params, ...config });
        return response?.data;
    } catch (error) {
        errorHandler(error as AxiosError)

    }
}

// PUT METHODS
export const putRequest = async (url: string, body: any, params = {}, config: AxiosRequestConfig = {}) => {
    try {
        const response = await axios.put(url, body, { params, ...config });
        return response?.data;
    } catch (error) {
        errorHandler(error as AxiosError);

    }
}

// PATCH METHODS

export const patchRequest = async (url: string, body: any, params = {}, config: AxiosRequestConfig = {}) => {
    try {
        const response = await axios.patch(url, body, { params, ...config });
        return response.data;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
}


// DELETE METHODS
export const deleteRequest = async (url: string, params = {}, config: AxiosRequestConfig = {}) => {
    try {
        const response = await axios.delete(url, { params, ...config });
        return response.data;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
}



const errorHandler = async (error: AxiosError) => {

    toast.error(error.message);
}