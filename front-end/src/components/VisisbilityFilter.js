import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { setFilter } from "../actions/todos";
import { VISIBILITY_FILTERS } from "../constants";
import { Button, Typography } from "@mui/material";

const colorFunction = (filter) => {
    if (filter == "incomplete") {
        return "error";
    }
    if (filter == "completed") {
        return "success";
    } else {
        return "secondary";
    }
}

const VisibilityFilters = ({ activeFilter, setFilter }) => {
  return (
    <div className="visibility-filters">
    <Typography>Filters</Typography>
      {Object.keys(VISIBILITY_FILTERS).map((filterKey) => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <Button
            // key={`visibility-filter-${currentFilter}`}
            // className={cx(
            //   "filter",
            //   currentFilter === activeFilter && "filter--active"
            // )}
            onClick={() => {
              setFilter(currentFilter);
            }}
            color={colorFunction(currentFilter)} variant="outlined"
          >
            {currentFilter}
          </Button>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { activeFilter: state.visibilityFilter };
};
// export default VisibilityFilters;
export default connect(mapStateToProps, { setFilter })(VisibilityFilters);
