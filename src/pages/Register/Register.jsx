import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [passType, setPassType] = useState(false);
  const { createUser, googleSignIn, updateUserInfo } = useAuth();
  const axiosInstance = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      // 2️⃣ Update Firebase profile
      await updateUserInfo(name, photo);

      // 3️⃣ Save user in backend DB
      await axiosInstance.post("/users", { name, email, photo });

      // 4️⃣ Request JWT from backend
      const { data } = await axiosInstance.post("/jwt", { email });
      localStorage.setItem("access-token", data.token);

      toast.success(`Welcome to TravelEase, ${name}!`);

      navigate(location.state?.from || "/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;
      if (!user) throw new Error("No user info from Google");

      const { displayName, email, photoURL } = user;

      // Save user in DB
      await axiosInstance.post("/users", {
        name: displayName,
        email,
        photo: photoURL,
      });

      // Request JWT
      const { data } = await axiosInstance.post("/jwt", { email });
      localStorage.setItem("access-token", data.token);

      toast.success(`Welcome to TravelEase, ${displayName}!`);

      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      console.error("Google login failed:", err);
      toast.error("Google login failed. Try again.");
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm md:max-w-lg shrink-0 shadow-2xl mx-auto">
      <title>Register | TravelEase</title>
      <div className="card-body">
        <h2 className="font-bold text-3xl text-primary text-center">
          Register Now
        </h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input w-full"
              placeholder="Name"
            />

            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input w-full"
              placeholder="PhotoURL"
            />

            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input w-full"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              name="password"
              type={passType ? "text" : "password"}
              className="input w-full"
              placeholder="Password"
            />

            <div
              className="absolute bottom-52 right-10 text-xl z-10"
              onClick={() => setPassType(!passType)}
            >
              {passType ? <FaEyeSlash /> : <FaEye />}
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>
          </fieldset>
        </form>

        <p className="text-center my-2">or</p>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-primary"
        >
          Continue with Google
        </button>

        <p className="mt-2">
          Already have an account?{" "}
          <Link className="link link-hover text-primary" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
