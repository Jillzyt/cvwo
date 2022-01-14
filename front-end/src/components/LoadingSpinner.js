// src/components/LoadingSpinner.js
import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 flex items-center w-screen h-screen z-20 bg-gray-700 bg-opacity-70">
      <div className="text-5xl text-white text-center w-10 mx-auto">
        <CircularProgress />
      </div>
    </div>
  );
};

export default LoadingSpinner;
