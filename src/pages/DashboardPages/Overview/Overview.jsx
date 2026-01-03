import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Overview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    myVehicles: 0,
    myBookings: 0,
  });

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/dashboard/stats?email=${user.email}`)
      .then((res) => setStats(res.data));

    axiosSecure
      .get(`/dashboard/chart?email=${user.email}`)
      .then((res) => setChartData(res.data));
  }, [axiosSecure, user]);

  return (
    <div className="min-h-screen bg-base-100 px-4 sm:px-6 md:px-10 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-10">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <StatCard title="My Vehicles" value={stats.myVehicles} />
        <StatCard title="My Bookings" value={stats.myBookings} />
      </div>

      {/* ===== Chart Section ===== */}
      <div className="card-standard p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
          Bookings by Category
        </h2>

        <div style={{ width: "100%", height: "350px", minHeight: "350px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#133960" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="card-standard flex flex-col items-center justify-center py-8">
    <h3 className="text-gray-500 text-sm uppercase tracking-wide">{title}</h3>
    <p className="text-3xl sm:text-4xl font-bold mt-3 text-primary">{value}</p>
  </div>
);

export default Overview;
