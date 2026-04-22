import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const fixImgUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  return url.replace("i.ibb.co.com", "i.ibb.co");
};

const FALLBACK_AVATAR = "https://placehold.co/40x40?text=U";

const AdminUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = useCallback(
    (query = "") => {
      setLoading(true);
      axiosSecure
        .get("/users", { params: query ? { search: query } : {} })
        .then((res) => setUsers(res.data))
        .catch(() => toast.error("Failed to load users"))
        .finally(() => setLoading(false));
    },
    [axiosSecure]
  );

  // Debounce so we only hit the API 400ms after the user stops typing
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(debounce((q) => fetchUsers(q), 400), [fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    debouncedFetch(val);
  };

  const promoteToAdmin = (userId) => {
    Swal.fire({
      title: "Promote to Admin?",
      text: "This user will gain admin privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, promote",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${userId}/role`, { role: "admin" })
          .then(() => {
            toast.success("User promoted to admin");
            fetchUsers(search);
          })
          .catch(() => toast.error("Failed to promote user"));
      }
    });
  };

  const deleteUser = (userId) => {
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
          .delete(`/users/${userId}`)
          .then(() => {
            toast.success("User deleted");
            fetchUsers(search);
          })
          .catch(() => toast.error("Failed to delete user"));
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Manage Users</h2>
          <p className="text-sm text-base-content/50 mt-0.5">
            {loading ? "Loading..." : `${users.length} result${users.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by name or email…"
            className="input input-bordered input-sm w-full pl-9 rounded-lg"
          />
          {search && (
            <button
              onClick={() => { setSearch(""); fetchUsers(""); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-base-content/70 text-xs uppercase tracking-wide">
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-12">
                  <span className="loading loading-spinner loading-md text-primary" />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-base-content/40 text-sm">
                  No users found{search ? ` for "${search}"` : ""}.
                </td>
              </tr>
            ) : (
              users.map((u, i) => (
                <tr key={u._id}>
                  <td className="text-sm text-base-content/50">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={fixImgUrl(u.photo) || FALLBACK_AVATAR}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover bg-base-300"
                        onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }}
                      />
                      <span className="text-sm font-medium">{u.name || "—"}</span>
                    </div>
                  </td>
                  <td className="text-sm text-base-content/70">{u.email}</td>
                  <td>
                    <span className={`badge badge-sm ${u.role === "admin" ? "badge-primary" : "badge-ghost"}`}>
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="text-sm text-base-content/50">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/admin/users/${u._id}`}
                        className="btn btn-xs btn-outline btn-info"
                      >
                        View
                      </Link>
                      {u.role !== "admin" && (
                        <button
                          onClick={() => promoteToAdmin(u._id)}
                          className="btn btn-xs btn-outline btn-primary"
                        >
                          Make Admin
                        </button>
                      )}
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
