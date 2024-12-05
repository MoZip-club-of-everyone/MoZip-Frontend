import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    // baseURL: `http://${process.env.NEXT_PUBLIC_SERVER_URL}`,
    timeout: 500000, // 5000ms = 5초
});

export default axiosInstance;