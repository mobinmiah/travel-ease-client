import React, { useEffect, useState } from "react";
import { FaUsers, FaCarSide, FaMapMarkedAlt, FaSmile } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/Loading";

const PlatformStats = () => {
  const [stast, setStats] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axiosInstance.get("/vehicles");
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicles();
  }, [axiosInstance]);

  const stats = [
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      number: "5,000+",
      label: "Happy Customers",
    },
    {
      icon: <FaCarSide className="text-4xl text-primary" />,
      number: `${stast.length}`,
      label: "Vehicles Available",
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
      number: "300+",
      label: "Cities Covered",
    },
    {
      icon: <FaSmile className="text-4xl text-primary" />,
      number: "99%",
      label: "Satisfaction Rate",
    },
  ];

  if (!stast) {
    return <Loading></Loading>;
  }
  return (
    <section className="py-20 bg-base-100 rounded-lg">
      <div className="max-w-7xl mx-auto px-5">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-3 md:mb-5 lg:mb-10">
            Our Growing Community
          </h2>
          <p className="text-center max-w-xl mx-auto  mb-3 md:mb-5 lg:mb-10">
            Trusted by thousands of travelers across the country
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {stats.map((item, index) => (
            <div
              key={index}
              className="p-6 card bg-base-200 shadow-sm rounded-lg hover:shadow-xl transition-all"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-4xl font-bold">{item.number}</h3>
              <p className="mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
