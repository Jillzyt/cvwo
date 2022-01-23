import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Checkbox } from "@mui/material";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { IconButton } from "@mui/material";
import Tags from "./TagFilter";
import {
  deleteTodo,
  todoToggled,
  selectTodoById,
  completeTodo,
} from "../features/todos/todosSlice";
import ChipsArray from "./Chip";
import { Typography } from "@mui/material";
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
    <Grid className="todo-item" item>
      <Grid container flexDirection={"row"} direction="row">
        <Grid item xs={12} md={6} lg={6}>
          <Checkbox
            checked={status}
            color="secondary"
            onClick={() => onComplete(todo.id)}
          />
          <Typography fullWidth variant="p">
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {tag_list && <ChipsArray chips={tag_list} />}
          <IconButton onClick={onDelete} sx={{ p: "10px" }} aria-label="search">
            <DeleteOutline color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Todo;
