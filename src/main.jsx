import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProviders from "./AuthProders/AuthProviders.jsx";
import useAuth from "./hooks/useAuth.jsx";
import Loading from "./components/Loading/Loading.jsx";

const AppWrapper = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  return <RouterProvider router={router} />;
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      {/* <RouterProvider router={router}></RouterProvider> */}
      <AppWrapper />
    </AuthProviders>
    <ToastContainer autoClose={3000}></ToastContainer>
  </StrictMode>
);

