import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import AuthProviders from './AuthProders/AuthProviders.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router}></RouterProvider>
    </AuthProviders>
    <ToastContainer autoClose={4000}></ToastContainer>
  </StrictMode>
);
