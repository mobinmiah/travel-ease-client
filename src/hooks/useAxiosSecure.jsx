import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Add Authorization header dynamically before every request
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            const token = await user.getIdToken(); // get fresh Firebase token
            config.headers.Authorization = `Bearer ${token}`;
          } catch (error) {
            console.error("Failed to get Firebase token:", error);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 🔹 Global error handler for expired/invalid token
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          logOutUser()
            .then(() => navigate("/login"))
            .catch(() => navigate("/login"));
        }
        return Promise.reject(error);
      }
    );

    // Cleanup on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
