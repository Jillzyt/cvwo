import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "../features/todos/todosSlice";
import ChipsArray from "./Chip";
import { Button } from "@mui/material";
import { restartState } from "../features/filters/filtersSlice";
import { Grid } from "@mui/material";
const AddTodo = () => {
  const [text, setText] = useState("");
  const [tag_list, setTagList] = useState("");
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  const handleText = (e) => setText(e.target.value);
  const handleTags = (e) => setTagList(e.target.value);

  const onClick = async (e) => {
    // If the user pressed the Enter key:
    const trimmedText = text.trim();
    const trimmedTagList = tag_list
      .replace(" ,", ",")
      .replace(", ", ",")
      .trim();
    // console.log("trimmedlIST " + trimmedTagList);
    const object = {
      text: trimmedText,
      tag_list: trimmedTagList,
    };
    if (trimmedText) {
      // Create and dispatch the thunk function itself
      setStatus("loading");
      await dispatch(saveNewTodo(object));
      dispatch(restartState());
      // And clear out the text input
      setText("");
      setTagList("");
      setStatus("idle");
    }
  };

  let isLoading = status === "loading";
  let placeholder = isLoading ? "" : "What needs to be done?";
  let loader = isLoading ? <div className="loader" /> : null;

  return (
    <React.Fragment>
      <div style={{ padding: "10px" }}>
        <Grid container direction="row">
          <Grid container item xs={12} md={12} lg={4}>
            <TextField
              placeholder={placeholder}
              value={text}
              fullWidth
              onChange={handleText}
              disabled={isLoading}
              label="Description"
              style={{ padding: "5px" }}
            />
          </Grid>
          <Grid container item xs={12} md={12} lg={4}>
            <TextField
              value={tag_list}
              onChange={handleTags}
              disabled={isLoading}
              label="Tags"
              fullWidth
              style={{ padding: "5px" }}
              helperText="Tags are seperated by a comma ,"
            />
          </Grid>
          <Grid container item xs={12} md={12} lg={4}>
            <Button
              style={{ height: "75%" }}
              color="secondary"
              variant="contained"
              fullWidth
              onClick={onClick}
            >
              {"Add Todo"}
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default AddTodo;
