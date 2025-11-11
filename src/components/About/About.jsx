import React from "react";
import aboutImage from '../../assets/about.png'

const About = () => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between gap-10 py-20 px-5 lg:px-20 bg-base-100">
      <div className="lg:w-1/2 banner-bg rounded-lg">
        <img
          src={aboutImage}
          alt="TravelEase About"
          className="rounded-2xl shadow-md w-full object-cover"
        />
      </div>

      <div className="lg:w-1/2 space-y-6">
        <h2 className="font-bold text-3xl gradient-text text-center">
          About TravelEase
        </h2>
        <p className="text-gray-600 leading-relaxed">
          <strong>TravelEase</strong> is your all-in-one solution for seamless
          vehicle booking and trip management. Whether you’re planning a family
          vacation, a weekend getaway, or a business trip, our platform makes
          finding and managing your ride effortless and secure.
        </p>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-secondary">
            Why Choose TravelEase?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Instant vehicle bookings with real-time availability.</li>
            <li>Trusted vehicle owners and verified listings.</li>
            <li>Secure payment and authentication with Firebase.</li>
            <li>Manage your trips, bookings, and vehicles with ease.</li>
            <li>Responsive design for smooth use on any device.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-secondary mt-6">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At <strong>TravelEase</strong>, our mission is to simplify the way
            people explore. We believe travel should be easy, transparent, and
            stress-free — whether you’re booking a car, van, or bike, our goal
            is to connect travelers and vehicle owners in one trusted platform.
          </p>
        </div>

        <div className="pt-5">
          <button className="btn btn-primary">
            Start Your Journey with TravelEase
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
