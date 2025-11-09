import React, { use } from 'react';
import VehicleCard from '../VehiclsCard/VehicleCard';

const RecentVehicles = ({ recentVehiclesPromise }) => {
    const vehicles = use(recentVehiclesPromise);
    console.log(vehicles)
  return (
    <div className='space-y-10'>
      <h2 className="font-bold text-3xl gradient-text text-center">
        Recent Vehicles
      </h2>
      <div className='grid grid-cols-3 gap-5'>
        {vehicles.map(vehicle=> <VehicleCard key={vehicle._id} vahicle={vehicle}></VehicleCard>)}
      </div>
    </div>
  );
};

export default RecentVehicles;