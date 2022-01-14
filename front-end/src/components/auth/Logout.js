// src/components/auth/Logout.js
import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { Typography } from "@mui/material";

const Logout = ({ dispatchLogoutUser }) => {
  let navigate = useNavigate();

  const handleClick = () => {
    dispatchLogoutUser().then(() => navigate("/"));
  };

  return (
    <MenuItem key={"logout"} onClick={handleClick}>
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
