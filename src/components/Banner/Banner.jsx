import React from 'react';
import hero from '../../assets/hero.png'
import { Link } from 'react-router';

const Banner = () => {
    return (
      <div className="hero banner-bg  rounded-lg p-20">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={hero} className="rounded-lg shadow-2xl w-6/12" />
          <div className="w-6/12">
            <h1 className="text-5xl font-bold text-white">Travel Ease</h1>
            <p className="py-6 text-white">
              Find your perfect ride with TravelEase — from city cars to family
              vans, we make your trips effortless and affordable. Book, manage,
              and explore your travel options in one seamless platform.
            </p>
            <Link
              className="btn btn-primary outline-1 outline-white"
              to="/allvehicles"
            >
              View All Vehicles
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Banner;