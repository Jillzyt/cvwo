import * as React from "react";
import Grid from "@mui/material/Grid";

import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import VisibilityFilters from "./VisisbilityFilter";
import { Paper, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Tags from "./TagFilter";
import Statistics from "./Statistics";
import SearchTodo from "./Searchbar";

function Main() {
  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        md={9}
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
            <Grid item xs={12} lg={12} md={12}>
              <AddTodo />
            </Grid>
            <Grid item xs={12} lg={12} md={12} style={{ padding: "1%" }}>
              <Grid container>
                <Grid item xs={12} lg={6} md={12} style={{ padding: "1%" }}>
                  <VisibilityFilters />
                </Grid>
                <Grid item xs={12} lg={6} md={12} style={{ padding: "1%" }}>
                  <Typography>Filtered tags:</Typography>
                  <Tags></Tags>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} md={12}>
              <SearchTodo />
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
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: "5%" }}>
          <Statistics />
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default Main;
