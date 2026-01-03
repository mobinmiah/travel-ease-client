import React from "react";
import user_one from "../../assets/user_one.jpg";
import user_two from "../../assets/user_two.jpg";
import user_three from "../../assets/user_three.jpg";

const CustomerTestimonial = () => {
  return (
    <section className="py-20 bg-base-100 rounded-lg">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-10">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 lg:px-20">
        {[
          {
            name: "Aminul Haque",
            feedback:
              "TravelEase made my Dhaka trip so easy! Booking a car took less than 2 minutes.",
            image: `${user_one}`,
          },
          {
            name: "Sadia Rahman",
            feedback:
              "Loved the smooth experience. The owner was verified and the car was spotless!",
            image: `${user_three}`,
          },
          {
            name: "Nayeem Hasan",
            feedback:
              "Best vehicle booking site so far — everything is clear, secure, and quick.",
            image: `${user_two}`,
          },
        ].map((user, i) => (
          <div key={i} className="card bg-base-100 shadow-md p-5 text-center">
            <img
              src={user.image}
              alt={user.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />

            <p className="italic  mb-3">"{user.feedback}"</p>
            <h3 className="font-semibold">{user.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerTestimonial;
