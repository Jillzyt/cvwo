import React, { useEffect } from "react";
import Todo from "./Todo";
// import { getTodos } from "../redux/selectors";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

import { selectFilteredTodoIds } from "../features/todos/todosSlice";

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingStatus = useSelector((state) => state.todos.status);

  if (loadingStatus === "loading") {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    );
  }

  const renderedListItems = todoIds.map((todoId) => {
    return <Todo key={todoId} id={todoId} />;
  });

  return (
    <Grid className="todo-list">
      {todoIds ? renderedListItems : "No todos, yay!"}
    </Grid>
  );
};

export default TodoList;
