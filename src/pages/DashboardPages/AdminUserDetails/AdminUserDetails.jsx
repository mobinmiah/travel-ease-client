import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const fixImgUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  return url.replace("i.ibb.co.com", "i.ibb.co");
};

const FALLBACK_AVATAR = "https://placehold.co/120x120?text=U";

const AdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/users/${id}`)
      .then((res) => setUserData(res.data))
      .catch(() => toast.error("Failed to load user details"))
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  const promoteToAdmin = () => {
    Swal.fire({
      title: "Promote to Admin?",
      text: "This user will gain admin privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, promote",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${id}/role`, { role: "admin" })
          .then(() => {
            toast.success("User promoted to admin");
            setUserData((prev) => ({ ...prev, role: "admin" }));
          })
          .catch(() => toast.error("Failed to promote user"));
      }
    });
  };

  const demoteToUser = () => {
    Swal.fire({
      title: "Demote to User?",
      text: "This admin will lose admin privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, demote",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${id}/role`, { role: "user" })
          .then(() => {
            toast.success("User demoted");
            setUserData((prev) => ({ ...prev, role: "user" }));
          })
          .catch(() => toast.error("Failed to demote user"));
      }
    });
  };

  const deleteUser = () => {
    Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${id}`)
          .then(() => {
            toast.success("User deleted");
            navigate("/dashboard/admin/users");
          })
          .catch(() => toast.error("Failed to delete user"));
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-6 text-center text-base-content/50">User not found.</div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate("/dashboard/admin/users")}
        className="flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Users
      </button>

      {/* Profile card */}
      <div className="rounded-2xl border border-base-300 bg-base-100 overflow-hidden">
        {/* Header banner */}
        <div className="h-24 bg-gradient-to-r from-primary to-secondary" />

        {/* Avatar + name */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
            <img
              src={fixImgUrl(userData.photo) || FALLBACK_AVATAR}
              alt={userData.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-base-100 shadow-md bg-base-300"
              onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }}
            />

            {/* Role badge */}
            <span className={`self-start sm:self-auto mt-14 sm:mt-0 badge badge-lg font-semibold ${
              userData.role === "admin" ? "badge-primary" : "badge-ghost"
            }`}>
              {userData.role === "admin" ? "🛡️ Admin" : "👤 User"}
            </span>
          </div>

          <div className="mt-4 space-y-1">
            <h2 className="text-2xl font-bold text-base-content">{userData.name || "—"}</h2>
            <p className="text-sm text-base-content/50">{userData.email}</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="Role" value={userData.role || "user"} />
        <StatCard label="Vehicles Listed" value={userData.vehicleCount ?? 0} />
        <StatCard label="Bookings Made" value={userData.bookingCount ?? 0} />
      </div>

      {/* Info card */}
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-base-content/50 uppercase tracking-wide">Account Info</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <InfoRow label="Full Name"  value={userData.name  || "—"} />
          <InfoRow label="Email"      value={userData.email || "—"} />
          <InfoRow label="Role"       value={userData.role  || "user"} />
          <InfoRow
            label="Member Since"
            value={userData.createdAt ? new Date(userData.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {userData.role !== "admin" ? (
          <button onClick={promoteToAdmin} className="btn btn-primary btn-sm">
            Make Admin
          </button>
        ) : (
          <button onClick={demoteToUser} className="btn btn-outline btn-sm">
            Demote to User
          </button>
        )}
        <button onClick={deleteUser} className="btn btn-error btn-sm text-white">
          Delete User
        </button>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="rounded-xl border border-base-300 bg-base-100 p-4 text-center">
    <p className="text-2xl font-bold text-primary">{value}</p>
    <p className="text-xs text-base-content/50 mt-1">{label}</p>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-xs text-base-content/40 uppercase tracking-wide mb-0.5">{label}</p>
    <p className="text-sm font-medium text-base-content">{value}</p>
  </div>
);

export default AdminUserDetails;
