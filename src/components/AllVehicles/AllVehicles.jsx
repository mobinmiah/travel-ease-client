import React, { useEffect, useState } from "react";
import VehicleCard from "../VehiclsCard/VehicleCard";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import useAxios from "../../hooks/useAxios";

const AllVehicles = () => {
  const axiosInstance = useAxios();

  const [vehicles, setVehicles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

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
            page: currentPage,
            limit: 12
          },
        });
        
        // Handle both old and new response formats for backward compatibility
        if (data.vehicles) {
          setVehicles(data.vehicles);
          setPagination(data.pagination);
        } else {
          // Fallback for old format
          setVehicles(data);
          setPagination(null);
        }
      } catch (error) {
        toast.error("Failed to load vehicles");
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [search, category, sort, order, currentPage, axiosInstance]);

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
        <>
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
          
          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline"
              >
                Previous
              </button>
              
              <span className="px-4 py-2">
                Page {currentPage} of {pagination.pages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
                disabled={currentPage === pagination.pages}
                className="btn btn-sm btn-outline"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No vehicles found.</p>
      )}
    </div>
  );
};

export default AllVehicles;
