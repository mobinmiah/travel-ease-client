import React from 'react';

const WorkingStrategy = () => {
    return (
      <section className="py-20 bg-base-100 rounded-lg">
        <h2 className="font-bold text-3xl gradient-text text-center mb-10">
          How TravelEase Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-5 lg:px-20">
          <div className="p-6 card bg-base-200 shadow-sm rounded-xl">
            <div className="text-primary text-5xl mb-4">🚙</div>
            <h3 className="font-bold text-xl mb-2">1. Find Your Ride</h3>
            <p>
              Browse from a wide range of verified vehicles across multiple
              categories.
            </p>
          </div>
          <div className="p-6 card bg-base-200 shadow-sm rounded-xl">
            <div className="text-primary text-5xl mb-4">📅</div>
            <h3 className="font-bold text-xl mb-2">2. Book Instantly</h3>
            <p>
              Choose your dates, confirm availability, and book in just a few
              clicks.
            </p>
          </div>
          <div className="p-6 card bg-base-200 shadow-sm rounded-xl">
            <div className="text-primary text-5xl mb-4">🧭</div>
            <h3 className="font-bold text-xl mb-2">3. Enjoy the Journey</h3>
            <p>
              Pick up your vehicle and hit the road — TravelEase handles the
              rest!
            </p>
          </div>
        </div>
      </section>
    );
};

export default WorkingStrategy;