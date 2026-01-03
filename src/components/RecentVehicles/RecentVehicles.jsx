import React from "react";
import VehicleCard from "../VehiclsCard/VehicleCard";
import { Link } from "react-router";

const RecentVehicles = ({ vehicles = [] }) => {
  return (
    <section className="py-14 bg-base-100 rounded-lg space-y-10 felx flex-col text-center">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-10">
          Recent Vehicles
        </h2>

        {vehicles.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No vehicles found. Add one to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle._id}
                className="transition-transform transform hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        )}
      </div>
  
        <Link className="btn btn-primary w-2xs" to="/allvehicles">
          See All
        </Link>
   
    </section>
  );
};

export default RecentVehicles;
