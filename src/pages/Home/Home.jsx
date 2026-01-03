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
import PopularDestinations from "../../components/PopularDestinations/PopularDestinations";
import PlatformStats from "../../components/PlatformStats/PlatformStats";
import PlatformBenefits from "../../components/PlatformBenefits/PlatformBenefits";

const Home = () => {
  const axios = useAxios();
  const [vehicles, setVehicles] = useState([]);
  const { loading, setLoading } = useAuth();

  useEffect(() => {
    axios
      .get("/recentvehicles")
      .then((data) => {
        setVehicles(data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [axios, setLoading]);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="space-y-3 md:space-y-5 lg:space-y-10 bg-base-1000">
      <title>Home | TravelEase</title>
      <Banner></Banner>
      <RecentVehicles vehicles={vehicles}></RecentVehicles>
      <PopularDestinations></PopularDestinations>
      <PlatformStats></PlatformStats>
      <About></About>
      <PlatformBenefits></PlatformBenefits>
      <CustomerTestimonial></CustomerTestimonial>
      <WorkingStrategy></WorkingStrategy>
    </div>
  );
};

export default Home;
