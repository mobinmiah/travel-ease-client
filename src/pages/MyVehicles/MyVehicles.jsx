import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
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

const MyVehicles = () => {
  const { user, setLoading } = useAuth();
  const axios = useAxios();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`/myvehicles?email=${user.email}`)
      .then((res) => {
        setVehicles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [user?.email, axios, setLoading]);

  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();

    const form = e.target;

    const updatedFields = {
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
      const res = await axios.patch(`/myvehicles/${id}`, updatedFields);

      if (res.status === 200) {
        toast.success("Vehicle updated successfully!");
        setVehicles((prev) =>
          prev.map((v) => (v._id === id ? { ...v, ...updatedFields } : v))
        );
        document.getElementById(`update_modal_${id}`).close();
      } else {
        toast.error("Something went wrong while updating.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update vehicle.");
    }
  };

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
        axios
          .delete(`/myvehicles/${id}?email=${user.email}`)
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

  if (!vehicles) {
    return <Loading></Loading>;
  }

  return (
    <div className="md:min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 rounded-lg">
      <title>My Vahicles | TreavelEase</title>
      <h2 className="font-bold text-3xl gradient-text text-center mb-10">
        My Vehicles
      </h2>
      {vehicles.length === 0 ? (
        <p className="text-center text-gray-500 text-lg py-10">
          You haven’t added any vehicles yet.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-lg shadow-lg md:p-8 border border-gray-200">
          <div className="overflow-x-auto rounded-xl">
            <table className="table w-full">
              <thead className="bg-base-200 text-sm uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4 rounded-tl-xl gradient-text">
                    SL No.
                  </th>
                  <th className="py-3 px-4 gradient-text">Vehicle</th>
                  <th className="py-3 px-4 gradient-text">Added On</th>
                  <th className="py-3 px-4 gradient-text">Price / Day</th>
                  <th className="py-3 px-4 gradient-text">Availability</th>
                  <th className="py-3 px-4 text-center rounded-tr-xl gradient-text">
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

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={vehicle.coverImage}
                              alt={vehicle.vehicleName}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold gradient-text">
                            {vehicle.vehicleName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {vehicle.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold gradient-text">
                        {vehicle.createdAt}
                      </p>
                      <p className="text-sm text-gray-500">
                        {vehicle.ownerEmail}
                      </p>
                    </td>
                    <td className="py-3 px-4 font-medium gradient-text">
                      ৳{vehicle.pricePerDay}
                    </td>
                    <td className="py-3 px-4 font-semibold gradient-text">
                      {vehicle.availability}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <Link
                          to={`/vehicledetails/${vehicle._id}`}
                          className="btn btn-outline btn-primary btn-sm"
                        >
                          View
                        </Link>

                        {/* Update Button */}
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
                        <dialog
                          id={`update_modal_${vehicle._id}`}
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 w-full max-w-3xl mx-auto transition-all duration-300">
                            {/* Title */}
                            <h2 className="font-extrabold text-2xl gradient-text text-center mb-6">
                              Update Your Vehicle
                            </h2>

                            <div className="modal-action mt-0">
                              <form
                                onSubmit={(e) =>
                                  handleUpdateSubmit(e, vehicle._id)
                                }
                                className="space-y-6 w-full"
                              >
                                {/* Row 1: Category + Fuel Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div>
                                    <label className="label-text font-semibold mb-1 block">
                                      Category
                                    </label>
                                    <select
                                      name="category"
                                      required
                                      className="select select-bordered w-full"
                                      defaultValue={vehicle.category}
                                    >
                                      <option value="Choose category" disabled>
                                        Choose category
                                      </option>
                                      <option value="Sedan">Sedan</option>
                                      <option value="Bike">Bike</option>
                                      <option value="Bus">Bus</option>
                                      <option value="Van">Van</option>
                                      <option value="SUV">SUV</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="label-text font-semibold mb-1 block">
                                      Fuel Type
                                    </label>
                                    <div className="relative">
                                      <FaGasPump className="absolute left-3 top-3 text-gray-400" />
                                      <input
                                        name="fuel"
                                        type="text"
                                        required
                                        className="input input-bordered w-full pl-10"
                                        defaultValue={vehicle.fuel_type}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Row 2: Vehicle Name + Owner */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div>
                                    <label className="label-text font-semibold mb-1 block">
                                      Vehicle Name
                                    </label>
                                    <div className="relative">
                                      <FaCar className="absolute left-3 top-3 text-gray-400" />
                                      <input
                                        name="vehicleName"
                                        type="text"
                                        className="input input-bordered w-full pl-10"
                                        defaultValue={vehicle.vehicleName}
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="label-text font-semibold mb-1 block">
                                      Owner
                                    </label>
                                    <div className="relative">
                                      <FaUser className="absolute left-3 top-3 text-gray-400" />
                                      <input
                                        name="owner"
                                        type="text"
                                        readOnly
                                        defaultValue={
                                          user?.displayName ||
                                          user?.providerData[0]?.displayName ||
                                          user?.name
                                        }
                                        className="input input-bordered w-full pl-10 bg-gray-50"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Row 3: Availability + Cover Image */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div>
                                    <label className="label-text font-semibold mb-1 block">
                                      Availability
                                    </label>
                                    <select
                                      name="availability"
                                      required
                                      className="select select-bordered w-full"
                                      defaultValue={vehicle.availability}
                                    >
                                      <option
                                        value="Choose availability"
                                        disabled
                                      >
                                        Choose availability
                                      </option>
                                      <option value="Available">
                                        Available
                                      </option>
                                      <option value="Booked">Booked</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="label-text font-semibold mb-1 block">
                                      Cover Image URL
                                    </label>
                                    <input
                                      name="coverImage"
                                      type="url"
                                      required
                                      className="input input-bordered w-full"
                                      defaultValue={vehicle.coverImage}
                                    />
                                  </div>
                                </div>

                                {/* Row 4: Price + Location */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div>
                                    <label className="label-text font-semibold mb-1 block">
                                      Price Per Day
                                    </label>
                                    <div className="relative">
                                      <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                                      <input
                                        name="price"
                                        type="text"
                                        required
                                        className="input input-bordered w-full pl-10"
                                        defaultValue={vehicle.pricePerDay}
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="label-text font-semibold mb-1 block">
                                      Location
                                    </label>
                                    <div className="relative">
                                      <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                                      <input
                                        name="location"
                                        type="text"
                                        required
                                        className="input input-bordered w-full pl-10"
                                        defaultValue={vehicle.location}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Row 5: Email + Description */}
                                <div className="grid grid-cols-1 gap-5">
                                  <div>
                                    <label className="label-text font-semibold mb-1 block">
                                      Owner Email
                                    </label>
                                    <input
                                      name="ownerEmail"
                                      type="email"
                                      readOnly
                                      defaultValue={
                                        user?.email ||
                                        user?.providerData[0]?.email ||
                                        user?.email
                                      }
                                      className="input input-bordered w-full bg-gray-50"
                                    />
                                  </div>

                                  <div>
                                    <label className="label-text font-semibold mb-1 block">
                                      Description
                                    </label>
                                    <textarea
                                      name="description"
                                      required
                                      className="textarea textarea-bordered w-full min-h-28"
                                      defaultValue={vehicle.description}
                                    />
                                  </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                                  <button
                                    type="submit"
                                    className="btn btn-primary w-full sm:w-1/2 font-semibold tracking-wide shadow-md"
                                  >
                                    Update Vehicle
                                  </button>
                                  <form
                                    method="dialog"
                                    className="w-full sm:w-1/2"
                                  >
                                    <button className="btn w-full font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700">
                                      Cancel
                                    </button>
                                  </form>
                                </div>
                              </form>
                            </div>
                          </div>
                        </dialog>

                        <button
                          onClick={() => handleDeleteVehicle(vehicle._id)}
                          className="btn btn-error btn-sm text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
