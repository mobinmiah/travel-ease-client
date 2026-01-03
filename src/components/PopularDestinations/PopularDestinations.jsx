import React from "react";

const PopularDestinations = () => {
  const destinations = [
    {
      name: "Cox's Bazar",
      image: "https://i.ibb.co.com/CpR3Lm7N/cox.jpg",
      price: "From $3,500",
    },
    {
      name: "Sylhet",
      image: "https://i.ibb.co.com/B5nQ62Kg/sylhet.jpg",
      price: "From $2,800",
    },
    {
      name: "Bandarban",
      image: "https://i.ibb.co.com/VcXQr49f/bandarban.jpg",
      price: "From $4,200",
    },
    {
      name: "Sajek Valley",
      image: "https://i.ibb.co.com/wNcSnB91/sajek.jpg",
      price: "From $3,000",
    },
  ];

  return (
    <section className="py-20 bg-base-100 rounded-lg">
      <div className="max-w-7xl mx-auto px-5">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-3 md:mb-5 lg:mb-10">
            Popular Destinations
          </h2>
          <p className="text-center max-w-xl mx-auto  mb-3 md:mb-5 lg:mb-10">
            Discover trending places travelers love
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-5">
          {destinations.map((place, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-64 w-full object-cover group-hover:scale-110 transition duration-400"
              />

              <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6">
                <h3 className="text-white! text-2xl font-semibold">
                  {place.name}
                </h3>
                <p className="text-gray-200">{place.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
