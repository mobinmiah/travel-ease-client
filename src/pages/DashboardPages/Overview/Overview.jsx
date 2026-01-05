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
  LineChart,
  Line,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCar, FaCalendarAlt, FaDollarSign, FaEye } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";

const Overview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [stats, setStats] = useState({
    myVehicles: 0,
    myBookings: 0,
    totalEarnings: 0,
    availableVehicles: 0,
  });
  const [loading, setLoading] = useState(true);

  const COLORS = ['#133960', '#0e2a47', '#22c55e', '#facc15', '#ef4444'];

  useEffect(() => {
    if (!user?.email) return;

    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const statsRes = await axiosSecure.get(`/dashboard/stats?email=${user.email}`);
        setStats(statsRes.data || {
          myVehicles: 0,
          myBookings: 0,
          totalEarnings: 0,
          availableVehicles: 0,
        });

        // Fetch chart data
        const chartRes = await axiosSecure.get(`/dashboard/chart?email=${user.email}`);
        setChartData(chartRes.data || []);

        // Fetch pie chart data (vehicle categories)
        const pieRes = await axiosSecure.get(`/dashboard/pie?email=${user.email}`);
        setPieData(pieRes.data || []);

        // Fetch recent bookings
        const bookingsRes = await axiosSecure.get(`/dashboard/recent-bookings?email=${user.email}`);
        setRecentBookings(bookingsRes.data || []);

      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        // Set default values on error
        setStats({
          myVehicles: 0,
          myBookings: 0,
          totalEarnings: 0,
          availableVehicles: 0,
        });
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="My Vehicles" 
            value={stats.myVehicles} 
            icon={<FaCar />}
            color="bg-blue-500"
          />
          <StatCard 
            title="My Bookings" 
            value={stats.myBookings} 
            icon={<FaCalendarAlt />}
            color="bg-green-500"
          />
          <StatCard 
            title="Total Earnings" 
            value={`৳${stats.totalEarnings || 0}`} 
            icon={<FaDollarSign />}
            color="bg-yellow-500"
          />
          <StatCard 
            title="Available Vehicles" 
            value={stats.availableVehicles} 
            icon={<FaEye />}
            color="bg-purple-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Bar Chart */}
          <div className="bg-base-200 rounded-lg shadow-lg p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center text-primary">
              Bookings by Category
            </h2>
            <div style={{ width: "100%", height: "300px" }}>
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

          {/* Pie Chart */}
          <div className="bg-base-200 rounded-lg shadow-lg p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center text-primary">
              Vehicle Distribution
            </h2>
            <div style={{ width: "100%", height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-base-200 rounded-lg shadow-lg p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary">
            Recent Bookings
          </h2>
          {recentBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.slice(0, 5).map((booking, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={booking.coverImage} alt={booking.vehicleName} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{booking.vehicleName}</div>
                            <div className="text-sm opacity-50">{booking.category}</div>
                          </div>
                        </div>
                      </td>
                      <td>{booking.customerName || 'N/A'}</td>
                      <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${
                          booking.status === 'confirmed' ? 'badge-success' : 
                          booking.status === 'pending' ? 'badge-warning' : 'badge-info'
                        }`}>
                          {booking.status || 'Active'}
                        </span>
                      </td>
                      <td>৳{booking.pricePerDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No recent bookings found</p>
            </div>
          )}
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
            icon={<FaEye />}
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
