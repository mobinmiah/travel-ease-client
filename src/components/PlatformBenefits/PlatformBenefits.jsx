import React from 'react';
import {
  FaMobileAlt,
  FaRoute,
  FaClock,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import appImage from '../../assets/appImage.png'


const PlatformBenefits = () => {
    const benefits = [
      {
        icon: <FaMobileAlt className="text-3xl text-primary" />,
        title: "Easy Online Booking",
        description: "Book your vehicle in just a few clicks from any device.",
      },
      {
        icon: <FaRoute className="text-3xl text-primary" />,
        title: "Real-Time Trip Tracking",
        description:
          "Track your trip live and stay updated throughout your journey.",
      },
      {
        icon: <FaClock className="text-3xl text-primary" />,
        title: "Time-Saving Management",
        description: "Manage your bookings, trips, and invoices in one place.",
      },
      {
        icon: <FaFileInvoiceDollar className="text-3xl text-primary" />,
        title: "Instant Invoice Generation",
        description: "Download invoices and trip details anytime after booking.",
      },
    ];
  return (
    <section className="py-20 bg-base-100 rounded-lg">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-3 md:mb-5 lg:mb-10">
            TravelEase App
          </h2>
          <p className="text-center max-w-xl mx-auto  mb-3 md:mb-5 lg:mb-10">
            Everything you need to plan and manage your trip effortlessly
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <img
            src={appImage}
            alt="Travel Ease"
            className="rounded-lg shadow-lg  w-full"
          />

          {/* Right Benefits */}
          <div className="space-y-6">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="flex gap-5 p-5 bg-base-200 rounded-lg hover:shadow transition"
              >
                <div>{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformBenefits;
