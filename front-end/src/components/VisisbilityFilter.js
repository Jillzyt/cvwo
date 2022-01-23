import React from "react";
import { VISIBILITY_FILTERS } from "../constants";
import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { statusFilterChanged } from "../features/filters/filtersSlice";
import { ToggleButtonGroup } from "@mui/material";
import { ToggleButton } from "@mui/material";
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
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="visibility-filters">
      <Typography>Filtered by:</Typography>

      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        {Object.keys(VISIBILITY_FILTERS).map((filterKey) => {
          const currentFilter = VISIBILITY_FILTERS[filterKey];
          return (
            <ToggleButton
              onClick={() => {
                onStatusChange(currentFilter);
              }}
              color={styleButtons(currentFilter)}
              variant="outlined"
              value={currentFilter}
            >
              {currentFilter}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
};

export default VisibilityFilters;
