import React from "react";
import VehicleCard from "../VehiclsCard/VehicleCard";

const RecentVehicles = ({ vehicles = [] }) => {

  return (
    <section className="py-14 bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center gradient-text mb-10">
      Recent Vehicles
        </h2>

        {vehicles.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No vehicles found. Add one to get started!
          </p>
        ) : (
          <div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle._id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentVehicles;
