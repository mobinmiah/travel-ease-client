import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { LiaCarSideSolid } from "react-icons/lia";
import { MdOutlineFormatListNumbered, MdDirectionsCar, MdBookOnline } from "react-icons/md";
import { FaRegUser, FaUsers } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import { GrHome } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const getUserDisplayName = (user) => {
  if (!user) return "Guest";
  return user.displayName || user.providerData?.[0]?.displayName || user.name || user.email?.split("@")[0] || "User";
};

const getUserPhotoUrl = (user, dbUser) => {
  if (!user) return "/default-avatar.png";
  return dbUser?.photo || user.photoURL || user.providerData?.[0]?.photoURL || "/default-avatar.png";
};

const DashboardLayout = () => {
  const { user, loading, dbUser } = useAuth();
  const { isAdmin } = useRole();

  const userLinks = [
    { label: "Dashboard",   icon: <GrHome />,                      to: "/dashboard" },
    { label: "My Vehicles", icon: <LiaCarSideSolid />,             to: "/dashboard/my-vehicles" },
    { label: "Add Vehicle", icon: <AiOutlinePlus />,               to: "/dashboard/add-vehicle" },
    { label: "My Bookings", icon: <MdOutlineFormatListNumbered />,  to: "/dashboard/my-bookings" },
    { label: "My Profile",  icon: <FaRegUser />,                   to: "/dashboard/my-profile" },
  ];

  const adminLinks = [
    { label: "All Users",    icon: <FaUsers />,        to: "/dashboard/admin/users" },
    { label: "All Vehicles", icon: <MdDirectionsCar />, to: "/dashboard/admin/vehicles" },
    { label: "All Bookings", icon: <MdBookOnline />,    to: "/dashboard/admin/bookings" },
  ];

  if (loading) return null;

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <nav className="sticky top-0 z-40 flex items-center justify-between px-4 py-2 h-14 bg-base-100/80 backdrop-blur-md border-b border-base-300/50">
          <div className="flex items-center gap-2">
            <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-sm btn-square lg:hidden" aria-label="open sidebar">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <Link to="/" className="text-base font-bold text-primary hidden lg:block">TravelEase</Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <img
                src={getUserPhotoUrl(user, dbUser)}
                alt={getUserDisplayName(user)}
                className="w-8 h-8 rounded-full object-cover border-2 border-primary/30"
                onError={(e) => { e.currentTarget.src = "https://placehold.co/40x40?text=U"; }}
              />
              <span className="hidden md:block text-sm font-medium text-base-content/80">
                {getUserDisplayName(user)}
              </span>
            </div>
          </div>
        </nav>

        <div className="flex-1 bg-base-200">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <aside className="flex flex-col w-64 min-h-full bg-base-100 border-r border-base-300/50">
          <div className="px-4 py-4 border-b border-base-300/50">
            <Link to="/" className="text-lg font-bold text-primary">TravelEase</Link>
            <p className="text-xs text-base-content/40 mt-0.5">Dashboard</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {userLinks.map(({ label, icon, to }) => (
              <SidebarLink key={to} to={to} icon={icon} label={label} end={to === "/dashboard"} />
            ))}

            {isAdmin && (
              <>
                <div className="pt-3 pb-1 px-3">
                  <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wider flex items-center gap-1.5">
                    <RiAdminLine className="text-sm" /> Admin
                  </p>
                </div>
                {adminLinks.map(({ label, icon, to }) => (
                  <SidebarLink key={to} to={to} icon={icon} label={label} />
                ))}
              </>
            )}
          </nav>

          <div className="p-3 border-t border-base-300/50">
            <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-base-content/60 hover:bg-base-200 hover:text-base-content transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, end = false }) => (
  <NavLink
    to={to} end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
        isActive ? "bg-primary text-primary-content" : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
      }`
    }
  >
    <span className="text-base shrink-0">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default DashboardLayout;
