import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const formatCurrency = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) return "৳0";
  return `৳${amount.toLocaleString()}`;
};

const fixImgUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  return url.replace("i.ibb.co.com", "i.ibb.co");
};

const FALLBACK_IMG = "https://placehold.co/80x60?text=No+Image";

const AdminBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/admin/bookings")
      .then((res) => setBookings(res.data))
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-base-content">All Bookings</h2>
        <p className="text-sm text-base-content/50 mt-1">{bookings.length} total bookings</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-base-content/70 text-xs uppercase tracking-wide">
              <th>#</th>
              <th>Vehicle</th>
              <th>Booked By</th>
              <th>Price/day</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b._id}>
                <td className="text-sm text-base-content/50">{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    {b.coverImage && (
                      <img
                        src={fixImgUrl(b.coverImage)}
                        alt={b.vehicleName}
                        className="w-10 h-8 rounded object-cover bg-base-300"
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                      />
                    )}
                    <span className="text-sm font-medium">{b.vehicleName || "—"}</span>
                  </div>
                </td>
                <td className="text-sm text-base-content/70">{b.buyerEmail}</td>
                <td className="text-sm font-semibold text-primary">
                  {formatCurrency(b.pricePerDay || 0)}
                </td>
                <td className="text-sm text-base-content/50">
                  {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "—"}
                </td>
                <td>
                  <span className="badge badge-sm badge-success">Confirmed</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
