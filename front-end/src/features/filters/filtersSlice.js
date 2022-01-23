import { createSlice } from "@reduxjs/toolkit";

export const StatusFilters = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

const initialState = {
  status: StatusFilters.All,
  tags: [],
  search: true,
  searchText: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload;
    },
    restartState(state, action) {
      state.status = StatusFilters.All;
      state.tags = [];
      state.search = false;
      state.searchText = "";
    },
    searchChanged: {
      reducer(state, action) {
        let { search, changeType } = action.payload;
        state.searchText = changeType === "searched" ? search : "";
        state.search = changeType === "searched" ? true : false;
      },
      prepare(search, changeType) {
        return {
          payload: { search, changeType },
        };
      },
    },
    tagFilterChanged: {
      reducer(state, action) {
        let { tag, changeType } = action.payload;
        const { tags } = state;
        switch (changeType) {
          case "added": {
            if (!tags.includes(tag)) {
              tags.push(tag);
            }
            break;
          }
          case "removed": {
            state.tags = tags.filter((existingTag) => existingTag !== tag);
          }
          case "reset": {
            state.tags = [];
          }
          default:
            return;
        }
      },
      prepare(tag, changeType) {
        return {
          payload: { tag, changeType },
        };
      },
    },
  },
});

export const {
  tagFilterChanged,
  statusFilterChanged,
  restartState,
  searchChanged,
} = filtersSlice.actions;

export default filtersSlice.reducer;
