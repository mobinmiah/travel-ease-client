import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { LiaCarSideSolid } from "react-icons/lia";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import { GrHome } from "react-icons/gr";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard Home", icon: <GrHome />, to: "/dashboard" },
    {
      label: "My Vehicles",
      icon: <LiaCarSideSolid />,
      to: "/dashboard/my-vehicles",
    },
    {
      label: "Add Vehicle",
      icon: <AiOutlinePlus />,
      to: "/dashboard/add-vehicle",
    },
    {
      label: "My Bookings",
      icon: <MdOutlineFormatListNumbered />,
      to: "/dashboard/my-bookings",
    },
    { label: "My Profile", icon: <FaRegUser />, to: "/dashboard/my-profile" },
  ];
  if (loading) return;
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 flex justify-between items-center px-4 py-2 shadow-sm">
          <div>
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <NavLink
              to="/"
              className="btn btn-ghost md:text-2xl sm:pl-0 font-semibold text-primary"
            >
              TravelEase
            </NavLink>
          </div>
          <div className="flex justify-between items-center gap-3 mr-2 lg:mr-5 ">
            <ThemeToggle></ThemeToggle>
            <Link to="/">
              <img
                className="w-10 h-10 rounded-full "
                src={
                  user?.photoURL ||
                  user?.providerData[0]?.photoURL ||
                  user?.photo
                }
                alt={user?.displayName}
                title={
                  user?.displayName ||
                  user?.providerData[0]?.displayName ||
                  user?.name
                }
              />
            </Link>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 overflow-y-auto">
          {/* Sidebar content here */}
          <ul className="menu w-full grow p-2">
            {sidebarLinks.map(({ label, icon, to }, index) => (
              <li key={index} className="mb-1">
                <NavLink
                  to={to}
                  end={to === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-base-300 relative group ${
                      isActive
                        ? "bg-primary text-primary-content font-semibold"
                        : ""
                    }`
                  }
                >
                  <span className="text-xl shrink-0 z-10">{icon}</span>
                  <span className="is-drawer-close:hidden font-medium">
                    {label}
                  </span>

                  {/* Enhanced tooltip that appears on hover */}
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 pointer-events-none">
                    {label}
                    {/* Tooltip arrow */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
