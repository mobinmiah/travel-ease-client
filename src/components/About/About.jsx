import React from "react";
import aboutImage from "../../assets/about.png";

const About = () => {
  return (
    <section className="min-h-screen bg-base-100 text-base-content py-14">
      <div>
        {" "}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-10">
          About TravelEase
        </h2>
        <p className="text-base-content/70 leading-relaxed text-center">
          <strong>TravelEase</strong> is your all-in-one solution for
          seamless...
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-20 px-5 lg:px-20 ">
        {" "}
        <div className="lg:w-1/2 banner-bg rounded-lg">
          <img
            src={aboutImage}
            alt="TravelEase About"
            className="rounded-2xl shadow-md w-full object-cover"
          />
        </div>
        <div className="lg:w-1/2 space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-secondary">
              Why Choose TravelEase?
            </h3>

            <ul className="list-disc list-inside text-base-content/70 space-y-2">
              <li>Instant vehicle bookings with real-time availability.</li>
              <li>Trusted vehicle owners and verified listings.</li>
              <li>Secure payment with Firebase.</li>
              <li>Responsive on every device.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-secondary mt-6">
              Our Mission
            </h2>

            <p className="text-base-content/70 leading-relaxed">
              At <strong>TravelEase</strong>, our mission is to simplify travel.
            </p>
          </div>

          <div className="pt-5">
            <button className="btn btn-primary">Start Your Journey</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
