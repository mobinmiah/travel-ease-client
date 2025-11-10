import React from "react";
import VehicleCard from "../VehiclsCard/VehicleCard";

const RecentVehicles = ({ vehicles }) => {
  return (
    <div className="space-y-10">
      <h2 className="font-bold text-3xl gradient-text text-center">
        Recent Vehicles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default RecentVehicles;
