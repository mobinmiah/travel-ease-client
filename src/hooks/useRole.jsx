import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const useRole = () => {
  const { dbUser, loading } = useContext(AuthContext);
  const role = dbUser?.role ?? null; // "admin" | "user" | null

  return {
    role,
    isAdmin: role === "admin",
    isUser: role === "user",
    loading,
  };
};

export default useRole;
