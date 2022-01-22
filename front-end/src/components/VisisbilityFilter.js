import React from "react";
import { VISIBILITY_FILTERS } from "../constants";
import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { statusFilterChanged } from "../features/filters/filtersSlice";

const styleButtons = (filter) => {
  if (filter == "incomplete") {
    return "error";
  }
  if (filter == "completed") {
    return "success";
  } else {
    return "secondary";
  }
};

const VisibilityFilters = () => {
  const dispatch = useDispatch();
  const onStatusChange = (status) => dispatch(statusFilterChanged(status));

  return (
    <div className="visibility-filters">
      <Typography>Filters</Typography>
      {Object.keys(VISIBILITY_FILTERS).map((filterKey) => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <Button
            onClick={() => {
              onStatusChange(currentFilter);
            }}
            color={styleButtons(currentFilter)}
            variant="outlined"
          >
            {currentFilter}
          </Button>
        );
      })}
    </div>
  );
};

export default VisibilityFilters;
