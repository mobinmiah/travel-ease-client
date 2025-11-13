import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useParams } from "react-router";
import Swal from "sweetalert2";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const { user, loading, setLoading } = useAuth();
  // const {id}=useParams()

  useEffect(() => {
    axiosSecure
      .get(`/bookings?email=${user?.email}`)
      .then((data) => {
        setBookings(data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }, [axiosSecure, setLoading, user]);

  if (loading) return <Loading />;

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
        const res = await axiosSecure.delete(`/bookings/${id}`);

        if (res.data?.success) {
          // ✅ Update local state instantly
          setBookings((prev) => prev.filter((b) => b._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "Your booking has been removed.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Not Found",
            text: "This booking could not be deleted.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete booking. Try again later.",
          icon: "error",
        });
      }
    }
  });
};

  // const handleDeleteBooking = () => {
  //   toast.info("🚧 Delete feature coming soon!");

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "Your file has been deleted.",
  //         icon: "success",
  //       });
  //     }
  //   });
    
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 rounded-lg">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-lg shadow-lg p-8 border border-gray-200">
        <h1 className="text-4xl font-bold text-center gradient-text mb-10">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-10">
            You haven’t booked any vehicles yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl">
            <table className="table w-full">
              <thead className="bg-base-200 text-sm uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4 rounded-tl-xl gradient-text">
                    SL No.
                  </th>
                  <th className="py-3 px-4 gradient-text">Vehicle</th>
                  <th className="py-3 px-4 gradient-text">Owner</th>
                  <th className="py-3 px-4 gradient-text">Price / Day</th>
                  <th className="py-3 px-4 gradient-text">Availability</th>
                  <th className="py-3 px-4 text-center rounded-tr-xl gradient-text">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="py-3 px-4 font-semibold">{index + 1}</td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={booking.coverImage}
                              alt={booking.vehicleName}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold gradient-text">
                            {booking.vehicleName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold gradient-text">
                        {booking.owner}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.ownerEmail}
                      </p>
                    </td>
                    <td className="py-3 px-4 font-medium gradient-text">
                      ৳{booking.pricePerDay}
                    </td>
                    <td className="py-3 px-4 font-semibold gradient-text">
                      {booking.availability}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="border border-primary px-4 py-1.5 rounded-full hover:bg-primary hover:text-white transition font-semibold gradient-text"
                      >
                        Cencel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
