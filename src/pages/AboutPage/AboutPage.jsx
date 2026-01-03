import React from "react";
import aboutImage from "../../assets/about.png";
import { Link } from "react-router";

const AboutPage = () => {
  return (
    <section className="bg-base-100 text-base-content min-h-screen py-20 rounded-lg">
      {/* Heading */}
      <div className="text-center mb-14 px-5">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          About TravelEase
        </h1>
        <p className="max-w-2xl mx-auto">
          <strong>TravelEase</strong> is your all-in-one solution for seamless
          vehicle booking and hassle-free travel management. We combine
          technology and trust to give you the smoothest journey experience.
        </p>
      </div>

      {/* Image + Features */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-5 lg:px-20 mb-16">
        {/* Image */}
        <div className="w-full lg:w-1/2 rounded-lg overflow-hidden shadow-lg">
          <img
            src={aboutImage}
            alt="TravelEase About"
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 space-y-10">
          {/* Why Choose */}
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-primary">
              Why Choose TravelEase?
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Instant vehicle bookings with real-time availability.</li>
              <li>Trusted vehicle owners and verified listings.</li>
              <li>Secure payments powered by Firebase.</li>
              <li>Responsive design across all devices.</li>
              <li>24/7 customer support for every trip.</li>
            </ul>
          </div>

          {/* Mission */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-primary">Our Mission</h2>
            <p className="leading-relaxed">
              At <strong>TravelEase</strong>, our mission is to simplify travel
              by connecting users with reliable vehicles, providing transparent
              pricing, and ensuring a seamless experience from booking to
              journey completion.
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-primary">Our Vision</h2>
            <p className="leading-relaxed">
              We aim to be the most trusted travel platform in the country,
              empowering travelers to explore new places easily while giving
              vehicle owners a secure platform to share their services.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center">
        <Link to="/login" className="btn btn-primary btn-lg">
          Start Your Journey
        </Link>
      </div>
    </section>
  );
};

export default AboutPage;
