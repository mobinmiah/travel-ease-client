import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home";
import AllVehicles from "../components/AllVehicles/AllVehicles";
import Loading from "../components/Loading/Loading";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/allvehicles",
        element: <AllVehicles></AllVehicles>,
        loader: () => fetch("http://localhost:3000/vehicles"),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

export default router;
