import React from "react";
import hero from "../../assets/hero.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a1e33] via-[#133960] to-[#1a4f7a] min-h-[520px] flex items-center">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#ffffff33_0%,_transparent_60%)]" />

      <div className="relative w-full px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Trusted by 10,000+ travelers
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Your Journey,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-emerald-300">
                Simplified
              </span>
            </h1>

            <p className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed">
              From city cars to family vans — book, manage, and explore your
              travel options in one seamless platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                to="/allvehicles"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#133960] font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Browse Vehicles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/about-us"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={hero}
              alt="TravelEase vehicle"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
