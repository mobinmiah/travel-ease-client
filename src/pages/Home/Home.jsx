import React, { Suspense, useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import Loading from "../../components/Loading/Loading";
import RecentVehicles from "../../components/RecentVehicles/RecentVehicles";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import About from "../../components/About/About";
import CustomerTestimonial from "../../components/CustomerTestimonial/CustomerTestimonial";
import WorkingStrategy from "../../components/WorkingStrategy/WorkingStrategy";

const Home = () => {
  const axiosInstance = useAxios();
  const [vehicles, setVehicles] = useState([]);
  const { loading, setLoading } = useAuth();

  useEffect(() => {
    axiosInstance
      .get("/recentvehicles")
      .then((data) => {
        setVehicles(data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [axiosInstance, setLoading]);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="space-y-20">
      <title>Home | TravelEase</title>
      <Banner></Banner>
      <RecentVehicles vehicles={vehicles}></RecentVehicles>
      <About></About>
      <CustomerTestimonial></CustomerTestimonial>
      <WorkingStrategy></WorkingStrategy>
    </div>
  );
};

export default Home;
