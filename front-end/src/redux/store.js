import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "../features/todos/todosSlice";
import filtersReducer from "../features/filters/filtersSlice";
import authReducer from "../features/auth/authsSlice";
import messageReducer from "../features/message/messageSlice";

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    filters: filtersReducer,
    auth: authReducer,
    message: messageReducer,
  },
});

export default store;
