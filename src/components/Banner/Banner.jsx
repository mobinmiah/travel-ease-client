import React from "react";
import hero from "../../assets/hero.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative rounded-lg overflow-hidden px-4 md:px-8 lg:px-20 py-16 md:py-24 bg-linear-to-r from-primary to-secondary">
      <div className="flex flex-col md:flex-row-reverse items-center md:items-center gap-8 md:gap-12">
        {/* Hero Image */}
        <img
          src={hero}
          alt="TravelEase Hero"
          className="w-full md:w-6/12 lg:w-5/12 rounded-lg shadow-xl object-contain"
        />

        {/* Text Content */}
        <div className="w-full md:w-6/12 text-center md:text-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white! mb-4">
            Travel Ease
          </h1>
          <p className="text-white sm:text-lg md:text-xl lg:text-2xl mb-6 leading-relaxed">
            Find your perfect ride with TravelEase — from city cars to family
            vans, we make your trips effortless and affordable. Book, manage,
            and explore your travel options in one seamless platform.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              className="btn btn-primary px-6 py-3 text-lg md:text-xl shadow-lg"
              to="/allvehicles"
            >
              View All Vehicles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
