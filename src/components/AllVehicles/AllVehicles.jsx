import React, { useEffect, useState } from "react";
import VehicleCard from "../VehiclsCard/VehicleCard";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const AllVehicles = () => {
  const axiosInstance = useAxios();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/vehicles")
      .then((res) => {
        console.log(res.data)
        setVehicles(res.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }, [axiosInstance]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-5 space-y-10">
      <title>All Vehicles | TravelEase</title>
      <h2 className="font-bold text-3xl gradient-text text-center">
        All Vehicles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle}></VehicleCard>
        ))}
      </div>
    </div>
  );
};

export default AllVehicles;
