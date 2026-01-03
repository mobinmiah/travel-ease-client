import React from 'react';
import { useRouteError, useNavigate } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-lg w-full bg-base-200 rounded-2xl shadow-xl p-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-error/10 text-error p-5 rounded-full">
            <FaExclamationTriangle className="text-5xl" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-base-content mb-3">
          Oops! Something went wrong
        </h1>

        <p className="text-neutral mb-6">
          {error?.statusText ||
            error?.message ||
            "An unexpected error has occurred."}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Go Home
          </button>

          <button onClick={() => navigate(-1)} className="btn btn-outline">
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-neutral">
          If the problem continues, please contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
