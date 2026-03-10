import React from "react";
import aboutImage from "../../assets/about.png";
import { Link } from "react-router";

const About = () => {
  return (
    <section className="bg-base-100 text-base-content rounded-lg py-14 px-4 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          About TravelEase
        </h2>
        <p className="max-w-2xl mx-auto">
          <strong>TravelEase</strong> is your all-in-one solution for seamless
          travel planning, vehicle bookings, and managing trips effortlessly.
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={aboutImage}
            alt="TravelEase About"
            className="rounded-lg w-full shadow-lg object-cover"
          />
        </div>

        {/* Text content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 px-2 md:px-5">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-primary">
              Why Choose TravelEase?
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Instant vehicle bookings with real-time availability.</li>
              <li>Trusted vehicle owners and verified listings.</li>
              <li>Secure payment with Firebase.</li>
              <li>Responsive on every device.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-primary">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              At <strong>TravelEase</strong>, our mission is to simplify travel
              and make it accessible, efficient, and enjoyable for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="pt-10 flex justify-center">
        <Link to="/login" className="btn btn-primary">
          Start Your Journey
        </Link>
      </div>
    </section>
  );
};

export default About;
