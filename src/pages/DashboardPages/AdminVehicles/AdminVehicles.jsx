import React, { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const formatCurrency = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) return "৳0";
  return `৳${amount.toLocaleString()}`;
};

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

const FALLBACK_IMG = "https://placehold.co/80x60?text=No+Image";

const AdminVehicles = () => {
  const axiosSecure = useAxiosSecure();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchVehicles = useCallback(
    (query = "") => {
      setLoading(true);
      axiosSecure
        .get("/admin/vehicles", { params: query ? { search: query } : {} })
        .then((res) => setVehicles(res.data))
        .catch(() => toast.error("Failed to load vehicles"))
        .finally(() => setLoading(false));
    },
    [axiosSecure]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(debounce((q) => fetchVehicles(q), 400), [fetchVehicles]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    debouncedFetch(val);
  };

  const deleteVehicle = (id) => {
    Swal.fire({
      title: "Delete Vehicle?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/admin/vehicles/${id}`)
          .then(() => {
            toast.success("Vehicle deleted");
            fetchVehicles(search);
          })
          .catch(() => toast.error("Failed to delete vehicle"));
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Manage Vehicles</h2>
          <p className="text-sm text-base-content/50 mt-0.5">
            {loading ? "Loading..." : `${vehicles.length} result${vehicles.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Search */}
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
            placeholder="Search by name, location, owner…"
            className="input input-bordered input-sm w-full pl-9 rounded-lg"
          />
          {search && (
            <button
              onClick={() => { setSearch(""); fetchVehicles(""); }}
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
              <th>Vehicle</th>
              <th>Category</th>
              <th>Price/day</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-12">
                  <span className="loading loading-spinner loading-md text-primary" />
                </td>
              </tr>
            ) : vehicles.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-base-content/40 text-sm">
                  No vehicles found{search ? ` for "${search}"` : ""}.
                </td>
              </tr>
            ) : (
              vehicles.map((v, i) => (
                <tr key={v._id}>
                  <td className="text-sm text-base-content/50">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={fixImgUrl(v.coverImage) || FALLBACK_IMG}
                        alt={v.vehicleName}
                        className="w-12 h-9 rounded object-cover bg-base-300"
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                      />
                      <span className="text-sm font-medium">{v.vehicleName}</span>
                    </div>
                  </td>
                  <td className="text-sm text-base-content/70">{v.category}</td>
                  <td className="text-sm font-semibold text-primary">
                    {formatCurrency(v.pricePerDay || 0)}
                  </td>
                  <td className="text-sm text-base-content/50">{v.userEmail}</td>
                  <td>
                    <span className={`badge badge-sm ${
                      v.availability === "Available" ? "badge-success"
                      : v.availability === "Booked"  ? "badge-warning"
                      : "badge-error"
                    }`}>
                      {v.availability || "Unknown"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteVehicle(v._id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      Delete
                    </button>
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

export default AdminVehicles;
