import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";

const rootElement = document.getElementById("root");

import { fetchTodos } from "./features/todos/todosSlice";
import { reLoginUser } from "./features/auth/authsSlice";

if (localStorage.getItem("token")) {
  store.dispatch(reLoginUser());
}

store.dispatch(fetchTodos);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
