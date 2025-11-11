import React from "react";
import { Link } from "react-router";

const VehicleCard = ({  vehicle }) => {
  const {_id, coverImage, availability, vehicleName, description } = vehicle;
  return (
    <div className="card bg-base-200 shadow-sm p-5">
      <figure>
        <img
          className="w-full h-[255px] object-cover"
          src={coverImage}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {vehicleName}
          <div className="badge ">
            {availability === "Available" ? (
              <div className="badge badge-success">{availability}</div>
            ) : (
              <div className="badge badge-error">{availability}</div>
            )}
          </div>
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end mt-5">
          <Link className="btn btn-primary" to={`/vehicledetails/${_id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
