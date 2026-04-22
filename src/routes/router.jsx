import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../pages/Home/Home";
import AllVehicles from "../components/AllVehicles/AllVehicles";
import Loading from "../components/Loading/Loading";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";
import VehicleDetails from "../components/VehicleDetails/VehicleDetails";
import AddVehicle from "../pages/AddVehicle/AddVehicle";
import MyVehicles from "../pages/MyVehicles/MyVehicles";
import MyBookings from "../pages/MyBookings/MyBookings";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../pages/DashboardPages/DashboardHome/DashboardHome";
import MyProfile from "../pages/DashboardPages/MyProfile/MyProfile";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService/TermsOfService";
import HelpCenter from "../pages/HelpCenter/HelpCenter";
import AdminUsers from "../pages/DashboardPages/AdminUsers/AdminUsers";
import AdminBookings from "../pages/DashboardPages/AdminBookings/AdminBookings";
import AdminVehicles from "../pages/DashboardPages/AdminVehicles/AdminVehicles";
import AdminUserDetails from "../pages/DashboardPages/AdminUserDetails/AdminUserDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "allvehicles",
        Component: AllVehicles,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "vehicledetails/:id",
        Component: VehicleDetails,
        hydrateFallbackElement: <Loading />,
      },
      { path: "/about-us", Component: AboutPage },
      { path: "/contactus", Component: ContactPage },
      { path: "/privacy", Component: PrivacyPolicy },
      { path: "/terms", Component: TermsOfService },
      { path: "/help", Component: HelpCenter },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, Component: DashboardHome },
      { path: "add-vehicle", Component: AddVehicle },
      { path: "my-vehicles", Component: MyVehicles },
      { path: "my-bookings", Component: MyBookings },
      { path: "my-profile", Component: MyProfile },
      // Admin-only routes
      {
        path: "admin/users",
        element: <AdminRoute><AdminUsers /></AdminRoute>,
      },
      {
        path: "admin/users/:id",
        element: <AdminRoute><AdminUserDetails /></AdminRoute>,
      },
      {
        path: "admin/bookings",
        element: (
          <AdminRoute>
            <AdminBookings />
          </AdminRoute>
        ),
      },
      {
        path: "admin/vehicles",
        element: (
          <AdminRoute>
            <AdminVehicles />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
