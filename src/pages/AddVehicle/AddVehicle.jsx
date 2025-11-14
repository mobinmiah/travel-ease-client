import React from "react";
import { toast } from "react-toastify";
import {
  FaCar,
  FaGasPump,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const AddVehicle = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const form = e.target;
 const newVehicle = {
   vehicleName: form.vehicleName.value,
   owner: form.owner.value,
   category: form.category.value,
   fuel_type: form.fuel.value,
   pricePerDay: Number(form.price.value),
   location: form.location.value,
   availability: form.availability.value,
   description: form.description.value,
   coverImage: form.coverImage.value,
   userEmail: user.email,
   createdAt: new Date(),
 };


    try {
      await axiosSecure.post("/vehicles", newVehicle).then((data) => data);
      toast.success("✅ Vehicle added successfully!");
      form.reset();
    } catch (error) {
      toast.error("❌ " + error.message);
    }
  };

  return (
    <div className="flex justify-center py-10 bg-gradient-to-br from-sky-50 to-blue-100  rounded-lg">
      <title>Add Vahicle | TravelEase</title>
      <div className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-8 w-full max-w-2xl border border-blue-100">
        <h2 className="font-bold text-3xl gradient-text text-center">
          🚗 Add Your Vehicle
        </h2>

        <form onSubmit={handleAddProduct} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold">Vehicle Name</label>
              <div className="relative">
                <FaCar className="absolute left-3 top-3 text-gray-400" />
                <input
                  name="vehicleName"
                  type="text"
                  required
                  className="input input-bordered w-full pl-10"
                  placeholder="e.g., Toyota Corolla"
                />
              </div>
            </div>

            <div>
              <label className="label-text font-semibold">Owner</label>
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
                  className="input input-bordered w-full pl-10"
                  placeholder="Owner Name"
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold">Category</label>
              <select
                name="category"
                required
                className="select select-bordered w-full"
                defaultValue=""
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
              <label className="label-text font-semibold">Fuel Type</label>
              <div className="relative">
                <FaGasPump className="absolute left-3 top-3 text-gray-400" />
                <input
                  name="fuel"
                  type="text"
                  required
                  className="input input-bordered w-full pl-10"
                  placeholder="e.g., Petrol / Diesel / Electric"
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold">Price Per Day</label>
              <div className="relative">
                <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                <input
                  name="price"
                  type="text"
                  required
                  className="input input-bordered w-full pl-10"
                  placeholder="e.g., 50"
                />
              </div>
            </div>

            <div>
              <label className="label-text font-semibold">Location</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  name="location"
                  type="text"
                  required
                  className="input input-bordered w-full pl-10"
                  placeholder="e.g., Dhaka, Bangladesh"
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold">Availability</label>
              <select
                name="availability"
                required
                className="select select-bordered w-full"
              >
                <option value="Choose availability" disabled>
                  Choose availability
                </option>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>
            </div>

            <div>
              <label className="label-text font-semibold">
                Cover Image URL
              </label>
              <input
                name="coverImage"
                type="url"
                required
                className="input input-bordered w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold">Owner Email</label>
              <input
                name="email"
                type="email"
                readOnly
                defaultValue={user?.email || user?.providerData[0]?.email}
                className="input input-bordered w-full"
                placeholder="owner@email.com"
              />
            </div>
            <div>
              <label className="label-text font-semibold">Description</label>
              <textarea
                name="description"
                required
                className="textarea textarea-bordered w-full"
                placeholder="Short description about your vehicle..."
                rows={3}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full mt-6">
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
