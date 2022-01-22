import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Checkbox } from "@mui/material";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Tags from "./TagFilter";
import {
  deleteTodo,
  todoToggled,
  selectTodoById,
  completeTodo,
} from "../features/todos/todosSlice";
import ChipsArray from "./Chip";

// Destructure `props.id`, since we just need the ID value
const Todo = ({ id }) => {
  // Call our `selectTodoById` with the state _and_ the ID value
  const todo = useSelector((state) => selectTodoById(state, id));
  const { description, status, tag_list } = todo;
  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo.id));
  };

  const onComplete = () => {
    dispatch(completeTodo(todo.id));
  };

  const onDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <Grid className="todo-item" item xs={8}>
      <Checkbox
        checked={status}
        color="secondary"
        onClick={() => onComplete(todo.id)}
      />
      <TextField
        required
        id="standard-required"
        defaultValue="Hello World"
        variant="standard"
        //   onChange={(updateInput)=>{todo.content = updateInput}} To update the value later
        value={description && status ? "👌" + description : "👋" + description}
      ></TextField>
      {tag_list && <ChipsArray chips={tag_list} />}
      <DeleteOutline onClick={onDelete} color="secondary" />
    </Grid>
  );
};

export default Todo;
