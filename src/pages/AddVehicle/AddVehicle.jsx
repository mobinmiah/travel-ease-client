import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaCar,
  FaGasPump,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { VEHICLE_CATEGORIES, FUEL_TYPES, AVAILABILITY_STATUS } from "../../utils/constants";
import { getUserDisplayName, getErrorMessage } from "../../utils/helpers";

const AddVehicle = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const newVehicle = {
      vehicleName: form.vehicleName.value.trim(),
      owner: form.owner.value.trim(),
      category: form.category.value,
      fuel_type: form.fuel.value.trim(),
      pricePerDay: Number(form.price.value),
      location: form.location.value.trim(),
      availability: form.availability.value,
      description: form.description.value.trim(),
      coverImage: form.coverImage.value.trim(),
      userEmail: user.email,
      createdAt: new Date(),
    };

    // Basic validation
    if (newVehicle.pricePerDay <= 0) {
      toast.error("Price must be greater than 0");
      setIsSubmitting(false);
      return;
    }

    if (!newVehicle.vehicleName || !newVehicle.description) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axiosSecure.post("/vehicles", newVehicle);
      toast.success("Vehicle added successfully!");
      form.reset();
      navigate(`/dashboard/my-vehicles`);
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center py-12 bg-gradient-to-br from-sky-50 to-blue-100 rounded-lg">
      <title>Add Vehicle | TravelEase</title>

      <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-10 w-full max-w-2xl border border-blue-100">
        <h2 className="font-bold text-3xl text-primary text-center mb-8">
          🚗 Add Your Vehicle
        </h2>

        <form onSubmit={handleAddVehicle} className="space-y-6">
          {/* Vehicle Name & Owner */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold">Vehicle Name *</label>
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
                  defaultValue={getUserDisplayName(user)}
                  className="input input-bordered w-full pl-10 bg-gray-50"
                  placeholder="Owner Name"
                />
              </div>
            </div>
          </div>

          {/* Category & Fuel */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold">Category *</label>
              <select
                name="category"
                required
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose category
                </option>
                {VEHICLE_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text font-semibold">Fuel Type *</label>
              <div className="relative">
                <FaGasPump className="absolute left-3 top-3 text-gray-400" />
                <select
                  name="fuel"
                  required
                  className="select select-bordered w-full pl-10"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose fuel type
                  </option>
                  {FUEL_TYPES.map((fuel) => (
                    <option key={fuel.value} value={fuel.value}>
                      {fuel.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price & Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold">Price Per Day (৳) *</label>
              <div className="relative">
                <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                <input
                  name="price"
                  type="number"
                  min="1"
                  required
                  className="input input-bordered w-full pl-10"
                  placeholder="e.g., 50"
                />
              </div>
            </div>

            <div>
              <label className="label-text font-semibold">Location *</label>
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

          {/* Availability & Cover Image */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold">Availability *</label>
              <select
                name="availability"
                required
                className="select select-bordered w-full"
                defaultValue="Available"
              >
                {AVAILABILITY_STATUS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text font-semibold">
                Cover Image URL *
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

          {/* User Email & Description */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold">Owner Email</label>
              <input
                name="email"
                type="email"
                readOnly
                defaultValue={user?.email || user?.providerData?.[0]?.email}
                className="input input-bordered w-full bg-gray-50"
              />
            </div>

            <div>
              <label className="label-text font-semibold">Description *</label>
              <textarea
                name="description"
                required
                className="textarea textarea-bordered w-full"
                placeholder="Short description about your vehicle..."
                rows={3}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary w-full mt-6 ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Vehicle...' : 'Add Vehicle'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
