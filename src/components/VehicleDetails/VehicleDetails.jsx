import React from "react";
import { useLoaderData } from "react-router";

const VehicleDetails = () => {
  const vehicle = useLoaderData();
  console.log(vehicle);
  const {
    _id: id,
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
  return (
    <div className="card lg:card-side bg-base-100 shadow-sm grid grid-cols-2">
      <figure>
        <img src={coverImage} alt={vehicleName} />
      </figure>
      <div className="card-body text-center ">
        <h2 className="card-title text-4xl mx-auto">{vehicleName}</h2>
        <div>
          <p>{description}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>{category}</p>
          <p>{fuel_type}</p>
        </div>
        <div className="flex justify-between items-center">
          {availability === "Available" ? (
            <div className="badge badge-success">{availability}</div>
          ) : (
            <div className="badge badge-error">{availability}</div>
          )}
          {availability === "Available" ? (
            <button className="btn btn-primary w-fit">Book Now</button>
          ) : (
            <button disabled className="btn btn-primary w-fit">
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
