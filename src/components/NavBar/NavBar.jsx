import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Logo from "../Logo/Logo";
import useRole from "../../hooks/useRole";

const getUserDisplayName = (user) => {
  if (!user) return "Guest";
  return user.displayName || user.providerData?.[0]?.displayName || user.name || user.email?.split("@")[0] || "User";
};

const getUserPhotoUrl = (user, dbUser) => {
  if (!user) return "/default-avatar.png";
  return dbUser?.photo || user.photoURL || user.providerData?.[0]?.photoURL || "/default-avatar.png";
};

const NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "All Vehicles", to: "/allvehicles" },
  { name: "About Us", to: "/about-us" },
  { name: "Contact Us", to: "/contactus" },
];

const NavBar = () => {
  const { user, logOutUser, dbUser } = useAuth();
  const { isAdmin } = useRole();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogOut = () => { logOutUser(); setDropdownOpen(false); setMobileOpen(false); };

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200 py-1 ${
      isActive
        ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
        : "text-base-content/70 hover:text-base-content"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300/50 bg-base-100/80 backdrop-blur-md">
      <nav className="w-full px-4 md:px-8 lg:px-16 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center shrink-0">
          <Logo width={130} height={36} />
        </Link>

        <ul className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} className={linkClass}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Open profile menu"
              >
                <img
                  src={getUserPhotoUrl(user, dbUser)}
                  alt={getUserDisplayName(user)}
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary/40"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/40x40?text=U"; }}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-base-100 shadow-xl border border-base-300/60 overflow-hidden origin-top-right animate-dropdown z-50">
                  <div className="px-4 py-3 border-b border-base-300/60">
                    <p className="text-sm font-semibold text-base-content truncate">
                      {dbUser?.name || getUserDisplayName(user)}
                    </p>
                    <span className="mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
                      {isAdmin ? "Admin" : "User"}
                    </span>
                  </div>

                  <div className="py-1">
                    <DropdownLink to="/dashboard" onClick={() => setDropdownOpen(false)}>Dashboard</DropdownLink>
                    <DropdownLink to="/dashboard/my-vehicles" onClick={() => setDropdownOpen(false)}>My Vehicles</DropdownLink>
                    <DropdownLink to="/dashboard/my-bookings" onClick={() => setDropdownOpen(false)}>My Bookings</DropdownLink>
                    <DropdownLink to="/dashboard/add-vehicle" onClick={() => setDropdownOpen(false)}>Add Vehicle</DropdownLink>
                    {isAdmin && (
                      <DropdownLink to="/dashboard/admin/users" onClick={() => setDropdownOpen(false)}>Admin Panel</DropdownLink>
                    )}
                  </div>

                  <div className="border-t border-base-300/60 py-1">
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors duration-150"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="text-sm font-medium text-base-content/70 hover:text-base-content transition-colors px-3 py-1.5">
                Log In
              </Link>
              <Link to="/register" className="text-sm font-semibold px-4 py-1.5 rounded-lg bg-primary text-white hover:opacity-90 transition-opacity">
                Register
              </Link>
            </div>
          )}

          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-base-200 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-base-300/50 bg-base-100 px-4 py-3 space-y-1 animate-dropdown">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to} to={link.to} end={link.to === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {!user && (
            <div className="pt-2 flex gap-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm font-medium py-2 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">Log In</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm font-semibold py-2 rounded-lg bg-primary text-white hover:opacity-90 transition-opacity">Register</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

const DropdownLink = ({ to, onClick, children }) => (
  <Link to={to} onClick={onClick} className="block px-4 py-2 text-sm text-base-content/80 hover:bg-base-200 hover:text-base-content transition-colors duration-150">
    {children}
  </Link>
);

export default NavBar;
