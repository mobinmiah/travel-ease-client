import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://travel-ease-server-pi.vercel.app";
const ACCESS_TOKEN_KEY = "access-token";

const axiosSecure = axios.create({ baseURL: API_BASE_URL });

const useAxiosSecure = () => {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          await logOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
