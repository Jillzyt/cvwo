// src/components/auth/Logout.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authsSlice";
import { Button } from "@mui/material";
import { clearTodo } from "../../features/todos/todosSlice";

const Logout = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
    dispatch(clearTodo());
    navigate("/");
  };

  return (
    <Button onClick={handleClick} color="secondary">
      Log out
    </Button>
  );
};

export default Logout;
