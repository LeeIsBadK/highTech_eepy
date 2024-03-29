import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'http://localhost:3500';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL
});

const axiosPrivate: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export default axiosInstance;
export { axiosPrivate };
