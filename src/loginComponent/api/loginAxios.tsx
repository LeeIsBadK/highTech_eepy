import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://backend-fund.vercel.app';

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
