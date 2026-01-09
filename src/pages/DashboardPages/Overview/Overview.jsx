import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCar, FaCalendarAlt, FaList } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";

const Overview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    myVehicles: 0,
    myBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  useEffect(() => {
    if (!user?.email) return;

    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const statsRes = await axiosSecure.get('/dashboard/stats');
        setStats(statsRes.data || {
          myVehicles: 0,
          myBookings: 0,
        });

        // Fetch chart data (existing endpoint)
        try {
          const chartRes = await axiosSecure.get('/dashboard/chart');
          setChartData(chartRes.data || []);
        } catch (chartError) {
          console.log('Chart data not available',chartError);
          setChartData([]);
        }

      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        // Set default values on error
        setStats({
          myVehicles: 0,
          myBookings: 0,
        });
        setChartData([]);

      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [axiosSecure, user]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-100 px-4 sm:px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-10">
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white! text-base font-bold uppercase tracking-wide mb-2">
                  My Vehicles
                </h3>
                <p className="text-4xl font-extrabold mt-2">
                  {stats.myVehicles}
                </p>
                <p className="text-blue-100 text-sm mt-2 font-medium">
                  Total vehicles listed
                </p>
              </div>
              <div className="bg-blue-400 bg-opacity-30 p-4 rounded-full group-hover:bg-opacity-50 transition-all duration-300">
                <FaCar className="text-3xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            {/* Hover tooltip */}
            <div className="absolute inset-0 bg-blue-700 bg-opacity-95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
              <div className="text-center">
                <FaCar className="text-4xl mb-2 mx-auto" />
                <p className="text-lg font-semibold">Vehicle Management</p>
                <p className="text-sm text-blue-100 mt-1">
                  Click to manage your vehicles
                </p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white! text-base font-bold uppercase tracking-wide mb-2">
                  My Bookings
                </h3>
                <p className="text-4xl font-extrabold mt-2">
                  {stats.myBookings}
                </p>
                <p className="text-green-100 text-sm mt-2 font-medium">
                  Total bookings made
                </p>
              </div>
              <div className="bg-green-400 bg-opacity-30 p-4 rounded-full group-hover:bg-opacity-50 transition-all duration-300">
                <FaCalendarAlt className="text-3xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            {/* Hover tooltip */}
            <div className="absolute inset-0 bg-green-700 bg-opacity-95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
              <div className="text-center">
                <FaCalendarAlt className="text-4xl mb-2 mx-auto" />
                <p className="text-lg font-semibold">Booking History</p>
                <p className="text-sm text-green-100 mt-1">
                  View all your bookings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-10">
          {/* Bar Chart - Full Width */}
          <div className="bg-base-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold mb-6 text-center text-primary flex items-center justify-center gap-2">
              <FaCalendarAlt className="text-primary" />
              Bookings by Category
            </h2>
            <div style={{ width: "100%", height: "400px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={
                    chartData.length > 0
                      ? chartData
                      : [
                          { _id: "Car", total: 5 },
                          { _id: "Van", total: 3 },
                          { _id: "Bike", total: 8 },
                          { _id: "Bus", total: 2 },
                        ]
                  }
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="_id"
                    tick={{ fill: "#666", fontSize: 12 }}
                    axisLine={{ stroke: "#e0e0e0" }}
                  />
                  <YAxis
                    tick={{ fill: "#666", fontSize: 12 }}
                    axisLine={{ stroke: "#e0e0e0" }}
                    gridLine={{ stroke: "#f0f0f0" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "12px 16px",
                    }}
                    labelStyle={{
                      color: "#60a5fa",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                    cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                    formatter={(value, name) => [
                      `${value} bookings`,
                      "Total Bookings",
                    ]}
                    labelFormatter={(label) => `Vehicle Type: ${label}`}
                  />
                  <Bar
                    dataKey="total"
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                    stroke="#3b82f6"
                    strokeWidth={1}
                  />
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {chartData.length === 0 && (
              <p className="text-center text-sm text-gray-500 mt-2">
                Sample data shown - actual data will appear after bookings
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            title="Add New Vehicle"
            description="List a new vehicle for rent"
            link="/dashboard/add-vehicle"
            icon={<FaCar />}
          />
          <QuickActionCard
            title="View All Vehicles"
            description="Manage your vehicle listings"
            link="/dashboard/my-vehicles"
            icon={<FaList />}
          />
          <QuickActionCard
            title="View Bookings"
            description="Check your booking history"
            link="/dashboard/my-bookings"
            icon={<FaCalendarAlt />}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-base-200 rounded-lg shadow-lg p-6 flex items-center">
    <div className={`${color} text-white p-3 rounded-full mr-4`}>
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 text-sm uppercase tracking-wide">{title}</h3>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  </div>
);

const QuickActionCard = ({ title, description, link, icon }) => (
  <div className="bg-base-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-center mb-4">
      <div className="text-primary text-2xl mr-3">{icon}</div>
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <a href={link} className="btn btn-primary btn-sm">
      Go to {title}
    </a>
  </div>
);

export default Overview;
