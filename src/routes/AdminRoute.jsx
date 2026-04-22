import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading, dbUser } = useAuth();
  const { isAdmin } = useRole();
  const location = useLocation();

  // Wait until both Firebase auth AND the DB user record are resolved
  if (loading || (user && dbUser === null)) return <Loading />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
