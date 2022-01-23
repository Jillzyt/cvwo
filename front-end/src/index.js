import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";

const rootElement = document.getElementById("root");

import { reLoginUser } from "./features/auth/authsSlice";
import { fetchTodos } from "./features/todos/todosSlice";

if (localStorage.getItem("token")) {
  store.dispatch(reLoginUser());
}

function select(state) {
  return state.auth;
}
let currentValue;
function handleChange() {
  let previousValue = currentValue;
  // console.log(store.getState());
  currentValue = select(store.getState());

  if (previousValue !== currentValue) {
    // console.log("here");
    store.dispatch(fetchTodos());
  }
}

store.subscribe(handleChange);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
