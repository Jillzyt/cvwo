import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({loggedIn}) => {

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}


const mapStateToProps = ({
  auth: { authChecked, loggedIn, currentUser },
}) => {
  return { authChecked, loggedIn, currentUser };
};

export default connect(mapStateToProps)(ProtectedRoute);