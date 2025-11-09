import React from 'react';
import { useLoaderData } from 'react-router';
import VehicleCard from '../VehiclsCard/VehicleCard';

const AllVehicles = () => {
    const vahicles= useLoaderData()

    return (
      <div className='my-5 space-y-10'>
        <h2 className="font-bold text-3xl gradient-text text-center">All Vehicles</h2>
        <div className='grid grid-cols-4 gap-5 '>
          {vahicles.map(vahicle=><VehicleCard key={vahicle._id} vahicle={vahicle}></VehicleCard>)}
        </div>
      </div>
    );
};

export default AllVehicles;