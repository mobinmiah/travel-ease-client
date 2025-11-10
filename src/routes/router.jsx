import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home";
import AllVehicles from "../components/AllVehicles/AllVehicles";
import Loading from "../components/Loading/Loading";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "../routes/PrivateRoute";
import VehicleDetails from "../components/VehicleDetails/VehicleDetails";
import AddVehicle from "../pages/AddVehicle/AddVehicle";
import MyVehicles from "../pages/MyVehicles/MyVehicles";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: <Home></Home>,
        hydrateFallbackElement:<Loading></Loading>
      },
      {
        path: "/allvehicles",
        element: <AllVehicles></AllVehicles>,
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
      {
        path: "/vehicledetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/vehicles/${params.id}`),
        element: (
          <PrivateRoute>
            <VehicleDetails></VehicleDetails>
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/addvehicle",
        element: (
          <PrivateRoute>
            <AddVehicle></AddVehicle>
          </PrivateRoute>
        ),
      },
      {
        path: "/myvehicles",
        element: (
          <PrivateRoute>
            <MyVehicles></MyVehicles>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
