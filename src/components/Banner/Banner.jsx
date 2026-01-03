import React from 'react';
import hero from '../../assets/hero.png'
import { Link } from 'react-router';

const Banner = () => {
    return (
      <div className="hero banner-bg  rounded-lg md:p-2 lg:p-20">
        <div className="hero-content flex-col md:flex-row-reverse">
          <img src={hero} className="md :w-6/12" />
          <div className="md:w-6/12">
            <h1 className="text-4xl md:text-5xl text-center md:text-start font-bold text-white">
              Travel Ease
            </h1>
            <p className="py-4 md:py-6 text-gray-300 text-center md:text-start">
              Find your perfect ride with TravelEase — from city cars to family
              vans, we make your trips effortless and affordable. Book, manage,
              and explore your travel options in one seamless platform.
            </p>
            <div className='flex justify-center md:justify-start items-center'>
              <Link
                className="btn btn-primary outline-1 outline-white"
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