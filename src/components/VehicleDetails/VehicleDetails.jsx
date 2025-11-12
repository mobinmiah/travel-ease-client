import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaGasPump,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";

const VehicleDetails = () => {
  const [vehicle, setVehicle] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure
      .get(`/vehicledetails/${id}`)
      .then((res) => {
        setVehicle(res.data);
      })
      .catch((err) => toast.error(err.message));
  }, [axiosSecure, id]);

  if (!vehicle) {
    return <Loading></Loading>;
  }

  const {
    availability,
    category,
    coverImage,
    createdAt,
    description,
    fuel_type,
    location,
    owner,
    pricePerDay,
    userEmail,
    vehicleName,
  } = vehicle;

  const handleBookings = async () => {
    const newBooking = {
      availability,
      category,
      coverImage,
      createdAt,
      description,
      fuel_type,
      location,
      owner,
      pricePerDay,
      userEmail,
      vehicleName,
      buyerEmail: user.email,
    };

    try {
      await axiosSecure.post("/bookings", newBooking);
      toast.success("✅ Booked successfully!");
    } catch (error) {
      toast.error("❌ " + error.message);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 w-full">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <img
            src={coverImage}
            alt={vehicleName}
            className="w-full h-full object-cover rounded-l-2xl"
          />
          <span className="absolute top-4 right-4 px-3 py-1 font-semibold">
            {availability === "Available" ? (
              <div className="badge badge-success">{availability}</div>
            ) : (
              <div className="badge badge-error">{availability}</div>
            )}
          </span>
        </div>
        <div className="flex flex-col justify-between p-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 gradient-text">
              {vehicleName}
            </h1>
            <p className="text-sm text-gray-500 mb-4">Added on {createdAt}</p>

            <p className="text-gray-700 mb-6">{description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <FaGasPump className="text-primary text-lg" />
                <span>{fuel_type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaMapMarkerAlt className="text-primary text-lg" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaCalendarAlt className="text-primary text-lg" />
                <span>{category}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaBangladeshiTakaSign className="text-primary text-lg" />
                <span>৳{pricePerDay} / day</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-gray-500 text-2xl" />
                <div>
                  <p className="font-semibold text-gray-800">{owner}</p>
                  <p className="text-sm text-gray-500">{userEmail}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={handleBookings}
              disabled={availability !== "Available"}
              className={`w-full  ${
                availability === "Available"
                  ? "btn-primary"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed py-3 rounded-xl font-semibold transition-all"
              }`}
            >
              {availability === "Available"
                ? "Book This Vehicle"
                : "Not Available"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
