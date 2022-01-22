import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  const user = useSelector((state) => state.auth.user);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
