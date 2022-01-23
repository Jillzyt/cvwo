import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { tagFilterChanged } from "../features/filters/filtersSlice";
import { Typography } from "@mui/material";
import moment from "moment";
import utf8 from "utf8";
export default function Statistics() {
  const todos = useSelector((state) => {
    // This creates a new array reference!
    if (!state.todos.entities) return null;
    return JSON.parse(JSON.stringify(state.todos.entities));
  });

  console.log(todos);
  const [chipData, setChipData] = React.useState([]);
  const dispatch = useDispatch();
  let counter = 0;

  for (let todo in todos) {
    if (
      todos[todo].status &&
      todos[todo].completed_date > moment().subtract(7, "days").format()
    ) {
      counter += 1;
    }
  }

  return (
    <React.Fragment>
      <Typography variant={"h6"}>Tasks completed this week: </Typography>
      <Typography variant={"h6"}>{counter}</Typography>
    </React.Fragment>
  );
}
