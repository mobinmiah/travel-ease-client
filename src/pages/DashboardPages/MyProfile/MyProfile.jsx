import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import { Link, useNavigate } from "react-router";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { logOutUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
  });
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalBookings: 0,
  });

  // Fetch profile and stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axiosSecure.get("/users/me");
        setProfile(profileRes.data);
        setFormData({
          name: profileRes.data.name || "",
          photo: profileRes.data.photo || "",
        });

        const email = profileRes.data.email;

        const vehiclesRes = await axiosSecure.get(`/myvehicles`);
        const bookingsRes = await axiosSecure.get(`/bookings`);
        setStats({
          totalVehicles: vehiclesRes.data.length,
          totalBookings: bookingsRes.data.length,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile or stats");
      }
    };
    fetchData();
  }, [axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    try {
      await logOutUser();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch("/users/me", formData);
      setProfile(res.data);
      toast.success("Profile updated successfully!");
      document.getElementById("editProfileModal").close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (!profile) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto mt-12 p-8 shadow-xl rounded-2xl bg-base-100">
      <h2 className="text-4xl font-extrabold text-primary text-center mb-12">
        My Profile
      </h2>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Profile Image */}
        <div className="shrink-0 w-full md:w-1/3 flex justify-center">
          <img
            src={profile.photo || ""}
            alt="Profile"
            className="w-64 h-64 md:w-80 md:h-80 rounded object-cover shadow-lg border-4 border-primary"
          />
        </div>

        {/* Profile Info + Stats */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2 text-lg">
            <p>
              <span className="font-semibold">Name:</span> {profile.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {profile.email}
            </p>

          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              className="badge badge-primary p-4 text-lg"
              to="/dashboard/my-vehicles"
            >
              Vehicles Added: {stats.totalVehicles}
            </Link>
            <Link
              className="badge badge-primary p-4 text-lg"
              to="/dashboard/my-bookings"
            >
              Bookings: {stats.totalBookings}
            </Link>
          </div>

          {/* Edit Profile and Logout Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              className="btn btn-primary btn-lg flex-1"
              onClick={() =>
                document.getElementById("editProfileModal").showModal()
              }
            >
              Edit Profile
            </button>

            <button
              className="btn btn-error btn-lg flex-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* DaisyUI Modal for Edit Profile */}
      <dialog
        id="editProfileModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-lg">
          <h3 className="font-bold text-xl mb-4">Edit Profile</h3>

          {/* Card style form inside modal */}
          <div className="card bg-base-100 w-full shadow-lg">
            <div className="card-body">
              <form onSubmit={handleSave}>
                <fieldset className="fieldset space-y-4">
                  <label className="label">
                    Name
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input w-full input-bordered"
                      placeholder="Name"
                      required
                    />
                  </label>

                  <label className="label">
                    Photo URL
                    <input
                      name="photo"
                      value={formData.photo}
                      onChange={handleChange}
                      className="input w-full input-bordered"
                      placeholder="Photo URL"
                    />
                  </label>



                  <div className="flex gap-3 mt-4 justify-end">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        document.getElementById("editProfileModal").close()
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyProfile;
