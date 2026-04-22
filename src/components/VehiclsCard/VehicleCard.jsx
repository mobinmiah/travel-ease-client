import React from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaGasPump } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const fixImgUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  return url.replace("i.ibb.co.com", "i.ibb.co");
};

const FALLBACK_IMG = "https://placehold.co/400x208?text=No+Image";

const formatCurrency = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) return "৳0";
  return `৳${amount.toLocaleString()}`;
};

const VehicleCard = ({ vehicle }) => {
  const { _id, coverImage, vehicleName, description, availability, category, location, fuel_type, pricePerDay, createdAt } = vehicle;

  return (
    <div className="flex flex-col h-full bg-base-300 backdrop-blur-lg shadow-md border border-blue-100 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <figure className="relative">
        <img
          src={fixImgUrl(coverImage) || FALLBACK_IMG}
          alt={vehicleName}
          className="w-full h-52 object-cover"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
        />
        <div className="absolute top-3 right-3 px-3 py-1 text-sm rounded-full font-semibold">
          {availability === "Available"
            ? <div className="badge badge-success">{availability}</div>
            : <div className="badge badge-error">{availability}</div>}
        </div>
      </figure>

      <div className="p-5 flex flex-col flex-1 space-y-3 bg-base-300">
        <h3 className="text-lg md:text-xl font-semibold text-primary flex justify-between items-center mb-2 border-b md:border-none">
          {vehicleName}
          <span className="text-primary text-base md:font-bold">{formatCurrency(pricePerDay)}/day</span>
        </h3>

        <div className="flex justify-between items-center text-sm mb-2">
          {category && <p className="capitalize">{category}</p>}
          <p className="capitalize">{formatDistanceToNow(new Date(createdAt))} ago</p>
        </div>

        <p className="text-sm line-clamp-3 flex-1 text-start">
          {description || "No description available"}
        </p>

        <div className="flex items-center justify-between text-sm mt-3">
          {location && <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-blue-500" /> {location}</span>}
          {fuel_type && <span className="flex items-center gap-1"><FaGasPump className="text-blue-500" /> {fuel_type}</span>}
        </div>

        <div className="mt-auto text-right pt-4">
          <Link to={`/vehicledetails/${_id}`} className="btn btn-primary font-medium w-full sm:w-auto">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
