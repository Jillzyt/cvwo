import React from "react";
import { connect } from "react-redux";
import { toggleTodo } from "../actions/todos";
import TextField from '@mui/material/TextField';
import { Checkbox } from "@mui/material";
import { Grid } from "@mui/material";

const Todo = ({ todo, toggleTodo }) => (
    <Grid className="todo-item" item xs={8}>
      <Checkbox color="secondary" onClick={() => toggleTodo(todo.id)} />
      <TextField
          required
          id="standard-required"
          defaultValue="Hello World"
          variant="standard"
        //   onChange={(updateInput)=>{todo.content = updateInput}} To update the value later
          value={todo && todo.completed ? "👌" + todo.content: "👋" + todo.content}
        >
        </TextField>
    </Grid>
);

// export default Todo;
export default connect(null, { toggleTodo })(Todo);
