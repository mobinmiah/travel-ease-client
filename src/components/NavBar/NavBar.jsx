import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Logo from "../Logo/Logo";

const NavBar = () => {
  const { user, logOutUser } = useAuth();

  const handleLogOut = () => {
    logOutUser().then().catch();
  };

  const navLinks = (
    <>
      {[
        { name: "Home", to: "/" },
        { name: "All Vehicles", to: "/allvehicles" },
        { name: "About Us", to: "/aboutus" },
        { name: "Contact Us", to: "/contactus" },
      ].map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              `font-semibold ml-2.5 px-3 py-1 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-linear-to-r from-primary to-secondary text-white"
                  : "text-primary hover:text-secondary"
              }`
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}

      {user && (
        <>
          {[
            { name: "Add Vehicle", to: "/dashboard/add-vehicle" },
            { name: "My Vehicles", to: "/dashboard/my-vehicles" },
            { name: "My Bookings", to: "/dashboard/my-bookings" },
          ].map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `font-semibold ml-2.5 px-3 py-1 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-linear-to-r from-primary to-secondary text-white"
                      : "text-primary hover:text-secondary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </>
      )}

      {user ? (
        <button
          onClick={handleLogOut}
          className="btn btn-primary block md:hidden w-full mt-2"
        >
          Log Out
        </button>
      ) : (
        <>
          <Link
            to="/login"
            className="btn btn-primary block md:hidden w-full mt-2"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="btn btn-primary block md:hidden w-full mt-2"
          >
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 backdrop-blur-md rounded-lg px-4 md:px-8 lg:px-16">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-2 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="ml-2 flex items-center">
          <Logo className="w-52" />
        </Link>
      </div>

      {/* Navbar Center - Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-4">
        <ThemeToggle />

        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <img
                className="w-10 h-10 rounded-full border-2 border-primary"
                src={
                  user?.photoURL ||
                  user?.providerData[0]?.photoURL ||
                  user?.photo
                }
                alt={user?.displayName || "User"}
                title={user?.displayName || user?.name}
              />
            </Link>
            <button
              onClick={handleLogOut}
              className="btn btn-primary hidden md:block"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link className="btn btn-primary" to="/login">
              Log In
            </Link>
            <Link className="btn btn-primary" to="/register">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
