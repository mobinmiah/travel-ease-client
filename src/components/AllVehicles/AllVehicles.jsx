import React, { useEffect, useState } from "react";
import VehicleCard from "../VehiclsCard/VehicleCard";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import useAxios from "../../hooks/useAxios";

const AllVehicles = () => {
  const axiosInstance = useAxios();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/vehicles", {
          params: {
            search,
            category,
            sort,
            order,
          },
        });
        setVehicles(data);
      } catch (error) {
        toast.error("Failed to load vehicles", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [search, category, sort, order, axiosInstance]);

  if (loading) return <Loading />;

  return (
    <div className="my-6 bg-base-100 rounded-xl p-4 md:p-8 space-y-6">
      <title>All Vehicles | TravelEase</title>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center gradient-text">
        All Vehicles
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Search by name or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input w-full md:w-64"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input w-full cursor-pointer md:w-48"
        >
          <option value="">All Categories</option>
          <option value="Car">Car</option>
          <option value="Van">Van</option>
          <option value="Bike">Bike</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input w-full cursor-pointer md:w-40"
        >
          <option value="createdAt">Time</option>
          <option value="vehicleName">Name</option>
          <option value="pricePerDay">Price</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="input cursor-pointer w-36!"
        >
          <option value="desc">⬆️</option>
          <option value="asc">⬇️</option>
        </select>
      </div>

      {/* Vehicles */}
      {vehicles.length ? (
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
      ) : (
        <p>No vehicles found.</p>
      )}
    </div>
  );
};

export default AllVehicles;
