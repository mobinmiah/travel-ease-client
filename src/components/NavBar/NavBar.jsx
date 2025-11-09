import React from "react";
import { Link, NavLink } from "react-router";

const NavBar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink className={`text-primary font-semibold ml-2.5`} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={`text-primary font-semibold ml-2.5`} to="/allvehicles">
          All Vehicles
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/">Home</NavLink>
      </li> */}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
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
        <a className="btn btn-ghost text-2xl font-semibold gradient-text">
          TravelEase
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end flex items-center gap-5">
        <div>
          <img className="w-10 h-10 rounded-full gradient-bg" src={''} alt="" />
        </div>
        <Link className="btn btn-primary">Log out</Link>
      </div>
    </div>
  );
};

export default NavBar;
