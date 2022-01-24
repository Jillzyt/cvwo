// src/components/LoadingSpinner.js
import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { Grid } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <CircularProgress color="primary" />
      </Grid>
    </Grid>
  );
};

export default LoadingSpinner;
