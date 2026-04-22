import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const DEMO_CREDENTIALS = {
  user:  { email: "user@travelease.com",  password: "user1234" },
  admin: { email: "admin@travelease.com", password: "admin1234" },
};

const Login = () => {
  const { logInUser, setLoading, googleSignIn, refreshDbUser } = useAuth();
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const [passType, setPassType] = useState(false);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const fillCredentials = (type) => {
    const creds = DEMO_CREDENTIALS[type];
    if (emailRef.current)    emailRef.current.value    = creds.email;
    if (passwordRef.current) passwordRef.current.value = creds.password;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    logInUser(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Request JWT from backend
        const { data } = await axiosInstance.post("/jwt", {
          email: user.email,
        });

        // Store JWT in localStorage
        localStorage.setItem("access-token", data.token);
        await refreshDbUser();

        toast.success(`Welcome back, ${user.displayName || user.email}!`);
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Login failed. Check your credentials.");
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;

        const name = user.displayName || user.providerData[0]?.displayName;
        const email = user.email || user.providerData[0]?.email;
        const photo = user.photoURL || user.providerData[0]?.photoURL;

        // Create or update user in DB
        await axiosInstance.post("/users", { name, email, photo });

        // Request JWT from backend
        const { data } = await axiosInstance.post("/jwt", { email });

        // Store JWT
        localStorage.setItem("access-token", data.token);

        toast.success(`Welcome to TravelEase, ${name}!`);
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google sign-in failed.");
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm md:max-w-lg shrink-0 shadow-2xl mx-auto">
      <title>Login | TravelEase</title>
      <div className="card-body">
        <h2 className="font-bold text-3xl text-primary text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              ref={emailRef}
              name="email"
              type="email"
              className="input w-full"
              placeholder="Email"
            />
            <div className="relative">
              <label className="label">Password</label>
              <input
                ref={passwordRef}
                name="password"
                type={passType ? "text" : "password"}
                className="input w-full"
                placeholder="Password"
              />
              <div
                className="absolute top-7 right-5 text-xl z-10 cursor-pointer"
                onClick={() => setPassType(!passType)}
              >
                {passType ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            {/* Demo Credentials */}
            <div className="mt-4 rounded-xl border border-base-300 overflow-hidden">
              <div className="bg-base-200 px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wide">
                  Demo Credentials
                </p>
              </div>
              <div className="p-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillCredentials("user")}
                  className="flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-lg border border-base-300 hover:border-primary hover:bg-primary/5 transition-colors text-left group"
                >
                  <span className="text-xs font-semibold text-base-content/80 group-hover:text-primary transition-colors">
                    👤 Demo User
                  </span>
                  <span className="text-[10px] text-base-content/40 font-mono">
                    user@travelease.com
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => fillCredentials("admin")}
                  className="flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-lg border border-base-300 hover:border-primary hover:bg-primary/5 transition-colors text-left group"
                >
                  <span className="text-xs font-semibold text-base-content/80 group-hover:text-primary transition-colors">
                    🛡️ Demo Admin
                  </span>
                  <span className="text-[10px] text-base-content/40 font-mono">
                    admin@travelease.com
                  </span>
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Login
            </button>
          </fieldset>
        </form>

        <p className="text-center my-2">or</p>

        <button onClick={handleGoogleSignIn} className="btn btn-primary">
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

        <p className="mt-2">
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
