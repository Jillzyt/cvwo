// src/components/NormalRoute.js
import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "./Header";
import Main from "./Main";

export default function TodoPage() {
  return (
    <React.Fragment>
     <Header title="Blog" />
      <Container maxWidth="lg">
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" />
          </Grid>
      </Container>{" "}
    </React.Fragment>
  );
}

