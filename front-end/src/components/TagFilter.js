import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { tagFilterChanged } from "../features/filters/filtersSlice";

const retrieveTagList = (todos) => {
  let string = "";
  for (let x in todos) {
    string += todos[x].tag_list + ",";
  }
  // console.log(string);
  return string.split(",");
};

export default function Tags() {
  const todos = useSelector((state) => {
    // This creates a new array reference!
    if (!state.todos.entities) return null;
    return JSON.parse(JSON.stringify(state.todos.entities));
  });

  const [chipData, setChipData] = React.useState([]);
  const dispatch = useDispatch();

  const tagList = Array.from(new Set(retrieveTagList(todos)));

  const handleKeyDown = async (e, values) => {
    if (values.length === 0) {
      dispatch(tagFilterChanged(null, "reset"));
    }
    if (values[values.length - 1] != null) {
      dispatch(tagFilterChanged(values[values.length - 1], "added"));
    }
  };

  const handleDelete = async (chipToDelete) => {
    dispatch(tagFilterChanged(chipToDelete, "removed"));
  };

  return (
    <Stack spacing={3}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={tagList}
        getOptionLabel={(option) => "#" + option}
        onChange={handleKeyDown} // prints the selected value
        value={chipData}
        onChange={(event, newValue) => {
          setChipData(newValue);
          handleKeyDown(event, newValue);
        }}
        renderTags={(values, getTagProps) =>
          values.map((option, index) => (
            <Chip
              label={"#" + option}
              onDelete={() => {
                setChipData(values.filter((value) => value !== option));
                handleDelete(option);
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="filled" color="secondary" />
        )}
      />
    </Stack>
  );
}
