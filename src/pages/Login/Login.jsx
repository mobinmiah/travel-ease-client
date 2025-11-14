import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const { logInUser, setLoading, googleSignIn } = useAuth();
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const [passType, setPassType] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    logInUser(email, password)
      .then(() => {
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch();
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

        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch();
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm md:max-w-lg shrink-0 shadow-2xl mx-auto">
      <title>Login | TravelEase</title>
      <div className="card-body">
        <h2 className="font-bold text-3xl gradient-text text-center">Login</h2>
        <form onSubmit={handleLogin}>
          {" "}
          <fieldset className="fieldset">
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
              className="absolute bottom-58 right-10 text-xl z-10"
              onClick={() => setPassType(!passType)}
            >
              {passType ? <FaEyeSlash></FaEyeSlash> : <FaEye />}
            </div>

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Login
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
          Don't have an account?{" "}
          <Link className="link link-hover text-primary" to="/register">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
