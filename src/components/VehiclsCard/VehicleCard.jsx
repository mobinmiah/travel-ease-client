import React from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaGasPump } from "react-icons/fa";

const VehicleCard = ({ vehicle }) => {
  const {
    _id,
    coverImage,
    vehicleName,
    description,
    availability,
    category,
    location,
    fuel_type,
    pricePerDay,
  } = vehicle;

  return (
    <div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white/80 backdrop-blur-lg shadow-md border border-blue-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <figure className="relative">
        <img
          src={coverImage}
          alt={vehicleName}
          className="w-full h-52 object-cover"
        />
        <div
          className={`absolute top-3 right-3 px-3 py-1 text-sm rounded-full font-semibold ${
            availability === "Available"
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          {availability}
        </div>
      </figure>

      <div className="p-5 space-y-2">
        <h3 className="text-xl font-semibold gradient-text flex justify-between items-center">
          {vehicleName}
          <span className="text-blue-600 text-base font-bold">
            ${pricePerDay}/day
          </span>
        </h3>

        {category && (
          <p className="text-sm text-gray-500 capitalize">{category}</p>
        )}

        <p className="text-gray-600 text-sm line-clamp-2">
          {description || "No description available"}
        </p>

        <div className="flex items-center justify-between text-gray-500 text-sm mt-3">
          {location && (
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-blue-500" /> {location}
            </span>
          )}
          {fuel_type && (
            <span className="flex items-center gap-1">
              <FaGasPump className="text-blue-500" /> {fuel_type}
            </span>
          )}
        </div>

        <div className="mt-5 text-right">
          <Link
            to={`/vehicledetails/${_id}`}
            className="btn btn-primary font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
