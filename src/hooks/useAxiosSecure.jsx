import axios from "axios";
import useAuth from "./useAuth";

const secureInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  secureInstance.interceptors.request.use(async (config) => {
    if (user) {
      const token = await user.getIdToken();
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  });

  return secureInstance;
};

export default useAxiosSecure;
