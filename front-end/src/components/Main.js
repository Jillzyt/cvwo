import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";

import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import VisibilityFilters from "./VisisbilityFilter";
import { Paper, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Tags from "./TagFilter";
import { fetchTodos } from "../features/todos/todosSlice";

function Main(props) {
  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          "& .markdown": {
            py: 3,
          },
        }}
      >
        <Paper style={{ padding: "2%" }}>
          <Grid container>
            <Grid item xs={12} lg={12} md={12}>
              <Typography style={{ padding: "1%" }} variant={"h3"}>
                Todo List
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6} md={6}>
              <AddTodo />
            </Grid>
            <Grid item xs={6} lg={6} md={6}>
              <VisibilityFilters />
              {/* <TagsList /> */}
              <Tags></Tags>
            </Grid>
            <Grid item xs={12} lg={12} md={12}>
              <Divider
                style={{ marginTop: "2%", marginBottom: "2%" }}
              ></Divider>
            </Grid>
            <Grid item xs={12} md={12} md={12}>
              <TodoList />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper>asdfasdfasd</Paper>
      </Grid>
    </React.Fragment>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
