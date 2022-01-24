import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { Checkbox } from "@mui/material";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { IconButton } from "@mui/material";
import {
  deleteTodo,
  todoToggled,
  selectTodoById,
  completeTodo,
} from "../features/todos/todosSlice";
import TagsList from "./TagsList";
import { Typography } from "@mui/material";
import { TYPES_OF_MESSAGES } from "../features/message/messagesConstants";
import { addMessage } from "../features/message/messageSlice";

const Todo = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id));
  const { description, status, tag_list } = todo;
  const dispatch = useDispatch();


  const onComplete = () => {
    dispatch(addMessage(TYPES_OF_MESSAGES.UPDATING_STATUS));
    dispatch(completeTodo(todo.id));
    dispatch(addMessage(TYPES_OF_MESSAGES.UPDATED_STATUS_SUCCESS));
  };

  const onDelete = () => {
    dispatch(addMessage(TYPES_OF_MESSAGES.DELETE_TODO_PROCESSING));
    dispatch(deleteTodo(todo.id)).then(() => {
      dispatch(addMessage(TYPES_OF_MESSAGES.DELETE_TODO_SUCCESSFUL));
    });
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
          {tag_list && <TagsList chips={tag_list} />}
          <IconButton onClick={onDelete} sx={{ p: "10px" }} aria-label="search">
            <DeleteOutline color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Todo;
