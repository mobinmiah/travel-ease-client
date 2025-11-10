import React, { Suspense } from "react";
import Banner from "../../components/Banner/Banner";
import Loading from "../../components/Loading/Loading";
import RecentVehicles from "../../components/RecentVehicles/RecentVehicles";

const recentVehiclesPromise = fetch("http://localhost:3000/recentvehicles").then(res=>res.json())

const Home = () => {
  return (
    <div className="space-y-20">
      <title>Home | TravelEase</title>
      <Banner></Banner>
      <Suspense fallback={<Loading></Loading>}>
        <RecentVehicles recentVehiclesPromise={recentVehiclesPromise}></RecentVehicles>
      </Suspense>
    </div>
  );
};

export default Home;
