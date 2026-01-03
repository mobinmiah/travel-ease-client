import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const { user, loading, setLoading } = useAuth();

  // Fetch bookings
  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const { data } = await axiosSecure.get(`/bookings?email=${user.email}`);
        setBookings(data);
        console.log(data);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [axiosSecure, user?.email, setLoading]);

  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this booking deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/bookings/${id}`);
          setBookings((prev) => prev.filter((b) => b._id !== id));
          Swal.fire("Canceled!", "Your booking has been removed.", "success");
        } catch {
          Swal.fire(
            "Error!",
            "Failed to delete booking. Try again later.",
            "error"
          );
        }
      }
    });
  };

  if (loading) return <Loading />;

  if (!bookings || bookings.length === 0)
    return (
      <div className="md:min-h-screen flex items-center justify-center py-20">
        <p className="text-gray-500 text-lg">
          You haven’t booked any vehicles yet.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-100 py-3 md:py-16 md:px-6 rounded-lg">
      <title>My Bookings | TravelEase</title>
      <div className="max-w-6xl mx-auto bg-base-200 backdrop-blur-xl rounded-lg shadow-lg p-8 border border-gray-500">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-primary mb-10">
          My Bookings
        </h1>

        {/* Table for large screens */}
        <div className="hidden md:block overflow-x-auto rounded-xl">
          <table className="table w-full">
            <thead className="bg-base-200 text-sm uppercase tracking-wide">
              <tr>
                <th className="py-3 px-4 rounded-tl-xl text-primary">SL No.</th>
                <th className="py-3 px-4 text-primary">Vehicle</th>
                <th className="py-3 px-4 text-primary">Owner</th>
                <th className="py-3 px-4 text-primary">Price / Day</th>
                <th className="py-3 px-4 text-primary">Availability</th>
                <th className="py-3 px-4 text-center rounded-tr-xl text-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b._id} className="transition-all">
                  <td className="py-3 px-4 font-semibold">{i + 1}</td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={b.coverImage} alt={b.vehicleName} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">
                        {b.vehicleName}
                      </p>
                      <p className="text-sm">{b.category}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-primary">{b.owner}</p>
                    <p className="text-sm">{b.userEmail}</p>
                  </td>
                  <td className="py-3 px-4 font-medium text-primary">
                    ৳{b.pricePerDay}
                  </td>
                  <td className="py-3 px-4 font-semibold text-primary">
                    {b.availability}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDeleteBooking(b._id)}
                      className="border border-primary px-4 py-1.5 rounded-full hover:bg-primary hover:text-white transition font-semibold text-primary"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for small screens */}
        <div className="md:hidden flex flex-col gap-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bbg-base-200 backdrop-blur-xl rounded-lg shadow-lg p-4 flex flex-col gap-3 border border-gray-200"
            >
              <div className="grid gap-4">
                <div className="avatar">
                  <div className="rounded w-full">
                    <img src={b.coverImage} alt={b.vehicleName} />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-primary">{b.vehicleName}</p>
                  <p className="text-sm">{b.category}</p>
                </div>
              </div>
              <p>
                <strong>Owner:</strong> {b.owner}
              </p>
              <p>
                <strong>Email:</strong> {b.userEmail}
              </p>
              <div className="flex justify-between items-center">
                <p>
                  <strong>Price / Day:</strong> ৳{b.pricePerDay}
                </p>
                <p>
                  <strong>Availability:</strong> {b.availability}
                </p>
              </div>
              <button
                onClick={() => handleDeleteBooking(b._id)}
                className="border border-primary px-4 py-1.5 rounded-full hover:bg-primary hover:text-white transition font-semibold text-primary"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
