import axios from "axios";

const secureInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  secureInstance.interceptors.request.use((config) => {
    console.log(config);
    return config;
  });

  return secureInstance;
};

export default useAxiosSecure;
