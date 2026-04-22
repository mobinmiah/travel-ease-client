import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://travel-ease-server-pi.vercel.app";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") console.error("Request timeout");
    return Promise.reject(error);
  }
);

const useAxios = () => axiosInstance;

export default useAxios;
