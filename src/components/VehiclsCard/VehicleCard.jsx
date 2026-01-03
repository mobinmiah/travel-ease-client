import React from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaGasPump } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

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
    createdAt,
  } = vehicle;

  return (
    <div className="flex flex-col h-full bg-base-200 backdrop-blur-lg shadow-md border border-blue-100 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <figure className="relative">
        <img
          src={coverImage}
          alt={vehicleName}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-3 right-3 px-3 py-1 text-sm rounded-full font-semibold">
          {availability === "Available" ? (
            <div className="badge badge-success">{availability}</div>
          ) : (
            <div className="badge badge-error">{availability}</div>
          )}
        </div>
      </figure>

      {/* Card content */}
      <div className="p-5 flex flex-col flex-1 space-y-3">
        {/* Title + Price */}
        <h3 className="text-lg md:text-xl font-semibold text-primary flex justify-between items-center mb-2 border-b md:border-none">
          {vehicleName}
          <span className="text-primary text-base md:font-bold">
            ${pricePerDay}/day
          </span>
        </h3>

        {/* Category + Created */}
        <div className="flex justify-between items-center text-sm mb-2">
          {category && <p className="capitalize">{category}</p>}
          <p className="capitalize">
            {formatDistanceToNow(new Date(createdAt))} ago
          </p>
        </div>

        {/* Description */}
        <p className="text-sm line-clamp-3 flex-1 text-start">
          {description || "No description available"}
        </p>

        {/* Location + Fuel */}
        <div className="flex items-center justify-between text-sm mt-3">
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

        {/* View Details button */}
        <div className="mt-auto text-right pt-4">
          <Link
            to={`/vehicledetails/${_id}`}
            className="btn btn-primary font-medium w-full sm:w-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
