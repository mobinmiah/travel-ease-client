import React from "react";
import VehicleCard from "../VehiclsCard/VehicleCard";
import { Link } from "react-router";
import Loading from "../Loading/Loading";

const RecentVehicles = ({ vehicles = [] }) => {
  if(vehicles.length===0){
    return <Loading></Loading>
  }
  return (
    <section className="py-14 bg-base-100 rounded-lg space-y-10 felx flex-col text-center">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-3 md:mb-5 lg:mb-10">
          Recent Vehicles
        </h2>
        <p className="text-center max-w-xl mx-auto  mb-3 md:mb-5 lg:mb-10">
          Explore the latest vehicles added to our collection, featuring modern
          designs, reliable performance, and great value.
        </p>
        {vehicles.length === 0 ? (
          <p className="text-center text-lg">
            No vehicles found. Add one to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle, index) => (
              <div
                className="transition-transform transform hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Link className="btn btn-primary md:w-2xs" to="/allvehicles">
        See All
      </Link>
    </section>
  );
};

export default RecentVehicles;
