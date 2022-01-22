import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "../features/todos/todosSlice";
import ChipsArray from "./Chip";
import { Button } from "@mui/material";
import { restartState } from "../features/filters/filtersSlice";

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
    console.log("trimmedlIST " + trimmedTagList);
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
        <TextField
          id="standard-basic"
          variant="standard"
          placeholder={placeholder}
          value={text}
          onChange={handleText}
          disabled={isLoading}
          style={{ padding: "5px" }}
        />
        <TextField
          id="asdfasdf"
          variant="standard"
          placeholder={"tags"}
          value={tag_list}
          onChange={handleTags}
          disabled={isLoading}
          style={{ padding: "5px" }}
        />
        <Button color="secondary" variant="contained" onClick={onClick}>
          {"Add Todo"}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AddTodo;
