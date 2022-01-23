import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Search from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { searchChanged } from "../features/filters/filtersSlice";
import Close from "@material-ui/icons/Close";

export default function CustomizedInputBase() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const handleSeachText = (e) => setSearchText(e.target.value);

  const onSubmit = (e) => {
    // If the user pressed the Enter key:
    dispatch(searchChanged(searchText, "searched"));
  };
  const onClear = async (e) => {
    setSearchText("");
    dispatch(searchChanged("", "cleared"));
  };

  return (
    <Paper
      style={{ margin: "2%" }}
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={searchText ? searchText : ""}
        onChange={handleSeachText}
        placeholder="Search todos"
      />
      {searchText.length > 0 && (
        <IconButton onClick={onClear} sx={{ p: "10px" }} aria-label="search">
          <Close />
        </IconButton>
      )}
      <IconButton onClick={onSubmit} sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  );
}
