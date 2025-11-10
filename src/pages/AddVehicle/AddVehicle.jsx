import React from "react";
// import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddVehicle = () => {
  //   const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  const handleAddProduct = (e) => {
    e.preventDefault();

    const vehicleName = e.target.vehicleName.value;
    const owner = e.target.owner.value;
    const category = e.target.category.value;
    const fuel_type = e.target.fuel.value;
    const pricePerDay = Number(e.target.price.value);
    const location = e.target.location.value;
    const availability = e.target.availability.value;
    const description = e.target.description.value;
    const coverImage = e.target.coverImage.value;
    const userEmail = e.target.userEmail.value;
    const createdAt = e.target.createdAt.value;

    console.log(
      vehicleName,
      owner,
      category,
      fuel_type,
      pricePerDay,
      location,
      availability,
      description,
      coverImage,
      userEmail,
      createdAt
    );

    const newVehicle = {
      vehicleName,
      owner,
      category,
      fuel_type,
      pricePerDay,
      location,
      availability,
      description,
      coverImage,
      userEmail,
      createdAt,
    };
    axiosSecure
      .post("/vehicles", newVehicle)
      .then((data) => {
        console.log(data.data);
        toast.success("Your Vehicle is Added");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="w-6/12 mx-auto">
      <h2 className="font-bold text-3xl gradient-text text-center">
        Add Your Vehicle
      </h2>
      <form onSubmit={handleAddProduct}>
        <fieldset className="fieldset">
          <label className="label">Vehicle Name</label>
          <input
            name="vehicleName"
            type="text"
            className="input w-full"
            placeholder="NaVehicle Name"
          />
          <label className="label">Owner</label>
          <input
            name="owner"
            type="text"
            className="input w-full"
            placeholder="Owner Name"
          />
          <label className="label">Category</label>
          <input
            name="category"
            type="text"
            className="input w-full"
            placeholder="Category"
          />
          <label className="label">Fuel Type</label>
          <input
            name="fuel"
            type="text"
            className="input w-full"
            placeholder="Fuel Type"
          />
          <label className="label">Price Per Day</label>
          <input
            name="price"
            type="text"
            className="input w-full"
            placeholder="Price Per Day"
          />
          <label className="label">Location</label>
          <input
            name="location"
            type="text"
            className="input w-full"
            placeholder="Location"
          />
          <label className="label">Availability</label>
          <input
            name="availability"
            type="text"
            className="input w-full"
            placeholder="Availability"
          />
          <label className="label">Description</label>
          <input
            name="description"
            type="text"
            className="input w-full"
            placeholder="Description"
          />
          <label className="label">CoverImage URL</label>
          <input
            name="coverImage"
            type="text"
            className="input w-full"
            placeholder="CoverImage URL"
          />
          <label className="label">Owner Email</label>
          <input
            name="userEmail"
            type="email"
            className="input w-full"
            placeholder="Owner Email"
          />
          <label className="label">Created At</label>
          <input
            name="createdAt"
            type="date"
            className="input w-full"
            placeholder="Set Time"
          />

          <button type="submit" className="btn btn-primary mt-4">
            Add Vehicle
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddVehicle;
