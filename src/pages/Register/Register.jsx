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

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passLow = /[a-z]/;
    const passUp = /[A-Z]/;

    if (password < 6) {
      toast.error("Password should be at least 6 charecters");

      return;
    }
    if (!passLow.test(password)) {
      toast.error("Password should contain at least one lowercase charecter");

      return;
    }
    if (!passUp.test(password)) {
      toast.error("Password should contain at least one uppercase charecter");

      return;
    }

    createUser(email, password)
      .then(() => {
        const newUser = {
          name: name,
          email: email,
          photo: photo,
        };

        axiosInstance.post("/users", newUser).then();

        updateUserInfo(name, photo)
          .then(() => {
            navigate(`${location.state ? location.state : "/"}`);
            toast.success("your profile is created", name);
          })
          .catch((error) => {
            toast.error(error.message);
          });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;

        const name =
          result.user.displayName || result.user.providerData[0].displayName;
        const email = result.user.email || result.user.providerData[0].email;
        const photo =
          result.user.photoURL || result.user.providerData[0].photoURL;

        const newUser = {
          name: name,
          email: email,
          photo: photo,
        };

        axiosInstance.post("/users", newUser).then((data) => {
          console.log(data.data);
          toast(
            `Welcome to Travel Ease ${
              user?.displayName || user?.providerData[0].displayName
            }`
          );
        });

        navigate('/');
      })
      .catch();
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm md:max-w-lg shrink-0 shadow-2xl mx-auto">
      <title>Reagister | TravelEase</title>
      <div className="card-body">
        <h2 className="font-bold text-3xl gradient-text text-center">
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
              className="absolute bottom-52  right-10 text-xl z-10"
              onClick={() => setPassType(!passType)}
            >
              {passType ? <FaEyeSlash></FaEyeSlash> : <FaEye />}
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>
          </fieldset>
        </form>
        <p className="text-center">or</p>
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-primary"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Continue with Google
        </button>
        <p>
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
