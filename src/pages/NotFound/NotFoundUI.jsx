import React from "react";
import { Link } from "react-router-dom";

const NotFoundUI = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      
      <h1 className="text-6xl font-bold">404</h1>

      <p className="text-xl mt-4">
        Page Not Found
      </p>

      <p className="text-gray-500 mt-2">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-black text-white rounded"
      >
        Go Home
      </Link>

    </div>
  );
};

export default NotFoundUI;