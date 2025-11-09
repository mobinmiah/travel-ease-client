import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createUser, googleSignIn, updateUserInfo } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUser(email, password).then((result) => {
      const user = result.user;
    });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm md:max-w-lg shrink-0 shadow-2xl mx-auto">
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
              type="password"
              className="input w-full"
              placeholder="Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>
          </fieldset>
        </form>
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
