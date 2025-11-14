import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { user, logOutUser } = useAuth();

 
  const handleLogOut = () => {
    logOutUser().then().catch();
  };
   const navLinks = (
     <>
       <li>
         <NavLink className={`text-primary font-semibold ml-2.5`} to="/">
           Home
         </NavLink>
       </li>
       <li>
         <NavLink
           className={`text-primary font-semibold ml-2.5`}
           to="/allvehicles"
         >
           All Vehicles
         </NavLink>
       </li>
       <li>
         <NavLink
           className={`text-primary font-semibold ml-2.5`}
           to="/addvehicle"
         >
           Add Vehicle
         </NavLink>
       </li>
       <li>
         <NavLink
           className={`text-primary font-semibold ml-2.5`}
           to="/myvehicles"
         >
           My Vehicles
         </NavLink>
       </li>
       <li>
         <NavLink
           className={`text-primary font-semibold ml-2.5`}
           to="/mybookings"
         >
           My Bookings
         </NavLink>
       </li>

       {user ? (
         <button onClick={handleLogOut} className="btn block md:hidden">
           Log out
         </button>
       ) : (
         <Link className="btn block md:hidden" to="/login">
           Log In
         </Link>
       )}

       <Link className="btn block md:hidden" to="/register">
         Register
       </Link>
     </>
   );
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost md:text-2xl sm:pl-0 font-semibold gradient-text"
        >
          TravelEase
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-5">
            <img
              className="w-10 h-10 rounded-full "
              src={
                user?.photoURL || user?.providerData[0]?.photoURL || user?.photo
              }
              alt={user?.displayName}
              title={
                user?.displayName ||
                user?.providerData[0]?.displayName ||
                user?.name
              }
            />

            <button
              onClick={handleLogOut}
              className="btn btn-primary hidden md:block"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-5">
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
