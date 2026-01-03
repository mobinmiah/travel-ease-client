import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router";
import {
  FaCar,
  FaDollarSign,
  FaGasPump,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { format } from "date-fns";
import Loading from "../../components/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyVehicles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vehicles
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/myvehicles?email=${user.email}`)
      .then((res) => {
        setVehicles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
        setLoading(false);
      });
  }, [user?.email, axiosSecure]);

  // Update vehicle
  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();
    const form = e.target;

    const updatedVehicle = {
      vehicleName: form.vehicleName.value.trim(),
      owner: form.owner.value.trim(),
      category: form.category.value,
      fuel_type: form.fuel.value.trim(),
      pricePerDay: Number(form.price.value),
      location: form.location.value.trim(),
      availability: form.availability.value,
      description: form.description.value.trim(),
      coverImage: form.coverImage.value.trim(),
      updatedAt: format(new Date(), "yyyy-MM-dd"),
    };

    try {
      const res = await axiosSecure.patch(`/myvehicles/${id}`, updatedVehicle);
      if (res.status === 200) {
        toast.success("Vehicle updated successfully!");
        setVehicles((prev) =>
          prev.map((v) => (v._id === id ? { ...v, ...updatedVehicle } : v))
        );
        document.getElementById(`update_modal_${id}`).close();
      } else {
        toast.error("Failed to update vehicle.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // Delete vehicle
  const handleDeleteVehicle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the vehicle!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/myvehicles/${id}?userEmail=${user.email}`)
          .then(() => {
            setVehicles((prev) => prev.filter((v) => v._id !== id));
            Swal.fire("Deleted!", "Vehicle removed successfully.", "success");
          })
          .catch((err) => {
            toast.error(err.response?.data?.message || err.message);
          });
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 md:px-6 rounded-lg">
      <title>My Vehicles | TravelEase</title>
      <h2 className="font-bold text-3xl text-primary text-center mb-10">
        My Vehicles
      </h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-500 text-lg py-10">
          You haven’t added any vehicles yet.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Table for md and above */}
          <div className="hidden md:block bg-white/80 backdrop-blur-xl rounded-lg shadow-lg md:p-8 border border-gray-200 overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-200 text-sm uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4 rounded-tl-xl text-primary">
                    SL No.
                  </th>
                  <th className="py-3 px-4 text-primary">Vehicle</th>
                  <th className="py-3 px-4 text-primary">Added On</th>
                  <th className="py-3 px-4 text-primary">Price / Day</th>
                  <th className="py-3 px-4 text-primary">Availability</th>
                  <th className="py-3 px-4 text-center rounded-tr-xl text-primary">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {vehicles.map((vehicle, index) => (
                  <tr
                    key={vehicle._id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="py-3 px-4 font-semibold">{index + 1}</td>
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={vehicle.coverImage}
                            alt={vehicle.vehicleName}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-primary">
                          {vehicle.vehicleName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {vehicle.category}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-primary">
                        {format(new Date(vehicle.createdAt), "PPP")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {vehicle.userEmail}
                      </p>
                    </td>
                    <td className="py-3 px-4 font-medium text-primary">
                      ৳{vehicle.pricePerDay}
                    </td>
                    <td className="py-3 px-4 font-semibold text-primary">
                      {vehicle.availability}
                    </td>
                    <td className="py-3 px-4 text-center flex justify-center gap-2">
                      <Link
                        to={`/vehicledetails/${vehicle._id}`}
                        className="btn btn-outline btn-primary btn-sm"
                      >
                        View
                      </Link>
                      <button
                        onClick={() =>
                          document
                            .getElementById(`update_modal_${vehicle._id}`)
                            .showModal()
                        }
                        className="btn btn-success btn-sm text-white"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(vehicle._id)}
                        className="btn btn-error btn-sm text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for small screens */}
          <div className="md:hidden flex flex-col gap-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-4 flex flex-col gap-3 border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="mask mask-squircle h-16 w-16">
                      <img src={vehicle.coverImage} alt={vehicle.vehicleName} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary text-lg">
                      {vehicle.vehicleName}
                    </p>
                    <p className="text-sm text-gray-500">{vehicle.category}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Added: {format(new Date(vehicle.createdAt), "PPP")}
                    </p>
                    <p className="text-sm text-gray-500">{vehicle.userEmail}</p>
                    <p className="font-semibold text-primary mt-1">
                      ৳{vehicle.pricePerDay}/day
                    </p>
                    <p className="font-semibold text-primary">
                      {vehicle.availability}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Link
                    to={`/vehicledetails/${vehicle._id}`}
                    className="btn btn-outline btn-primary btn-sm flex-1"
                  >
                    View
                  </Link>
                  <button
                    onClick={() =>
                      document
                        .getElementById(`update_modal_${vehicle._id}`)
                        .showModal()
                    }
                    className="btn btn-success btn-sm text-white flex-1"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle._id)}
                    className="btn btn-error btn-sm text-white flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Update modals for each vehicle */}
      {vehicles.map((vehicle) => (
        <dialog
          key={vehicle._id}
          id={`update_modal_${vehicle._id}`}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 w-full max-w-3xl mx-auto transition-all duration-300">
            <h2 className="font-extrabold text-2xl text-primary text-center mb-6">
              Update Your Vehicle
            </h2>

            <form
              onSubmit={(e) => handleUpdateSubmit(e, vehicle._id)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Vehicle Name</label>
                  <input
                    name="vehicleName"
                    type="text"
                    className="input input-bordered w-full"
                    defaultValue={vehicle.vehicleName}
                    required
                  />
                </div>
                <div>
                  <label className="label">Owner</label>
                  <input
                    name="owner"
                    type="text"
                    readOnly
                    className="input input-bordered w-full bg-gray-50"
                    defaultValue={user?.displayName || user?.name}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Category</label>
                  <select
                    name="category"
                    className="select select-bordered w-full"
                    defaultValue={vehicle.category}
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="Bike">Bike</option>
                    <option value="Bus">Bus</option>
                    <option value="Van">Van</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>
                <div>
                  <label className="label">Fuel Type</label>
                  <input
                    name="fuel"
                    type="text"
                    className="input input-bordered w-full"
                    defaultValue={vehicle.fuel_type}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Price Per Day</label>
                  <input
                    name="price"
                    type="number"
                    className="input input-bordered w-full"
                    defaultValue={vehicle.pricePerDay}
                    required
                  />
                </div>
                <div>
                  <label className="label">Location</label>
                  <input
                    name="location"
                    type="text"
                    className="input input-bordered w-full"
                    defaultValue={vehicle.location}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Availability</label>
                  <select
                    name="availability"
                    className="select select-bordered w-full"
                    defaultValue={vehicle.availability}
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                  </select>
                </div>
                <div>
                  <label className="label">Cover Image URL</label>
                  <input
                    name="coverImage"
                    type="url"
                    className="input input-bordered w-full"
                    defaultValue={vehicle.coverImage}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  defaultValue={vehicle.description}
                  required
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button type="submit" className="btn btn-primary w-full">
                  Update Vehicle
                </button>
                <form method="dialog" className="w-full">
                  <button className="btn w-full btn-ghost">Cancel</button>
                </form>
              </div>
            </form>
          </div>
        </dialog>
      ))}
    </div>
  );
};

export default MyVehicles;
