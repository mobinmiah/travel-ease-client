import React from "react";
import aboutImage from "../../assets/about.png";
import { Link } from "react-router";

const About = () => {
  return (
    <section className="bg-base-100 text-base-content rounded-lg py-14">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-3 md:mb-5 lg:mb-10">
          About TravelEase
        </h2>
        <p className="text-center max-w-xl mx-auto  mb-3 md:mb-5 lg:mb-10">
          <strong>TravelEase</strong> is your all-in-one solution for
          seamless...
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-10 px-2 lg:px-20 ">
        <div className="w-full lg:w-1/2 banner-bg rounded-lg flex justify-center items-center">
          <img
            src={aboutImage}
            alt="TravelEase About"
            className="rounded-lg w-full shadow-md object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-6 md:flex justify-between gap-5 px-5">
          <div className="space-y-3 w-full">
            <h3 className="text-2xl font-semibold">Why Choose TravelEase?</h3>

            <ul className="list-disc list-inside  space-y-2">
              <li>Instant vehicle bookings with real-time availability.</li>
              <li>Trusted vehicle owners and verified listings.</li>
              <li>Secure payment with Firebase.</li>
              <li>Responsive on every device.</li>
            </ul>
          </div>

          <div className="w-full">
            <h2 className="text-2xl font-semibold mt-6">Our Mission</h2>

            <p className=" leading-relaxed">
              At <strong>TravelEase</strong>, our mission is to simplify travel.
            </p>
          </div>
        </div>
      </div>
      <div className="pt-5 flex justify-center items-center">
        <Link to="/login" className="btn btn-primary">
          Start Your Journey
        </Link>
      </div>
    </section>
  );
};

export default About;
