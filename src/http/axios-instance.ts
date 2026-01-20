import axios from "axios";

export const BASE_URL = "http://localhost:4242"
export const IMAGES_URL = "http://192.168.100.106:3000/api/public/"

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export default api;
