import React from "react";
import { Link } from "react-router";

const VehicleCard = ({ vahicle }) => {
  const { coverImage, availability, vehicleName, description } = vahicle;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="border border-primary">
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
        <div className="card-actions justify-end">
          <Link className="btn btn-primary ">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
