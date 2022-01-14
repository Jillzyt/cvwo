// src/reducers/auth.js
import { AUTHENTICATED, NOT_AUTHENTICATED } from "../actions";

// TODO: Authenticate against the server
const getLoggedInStatus = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
}
const initialState = {
  authChecked: false,
  loggedIn: getLoggedInStatus(),
  currentUser: localStorage.getItem("user"),
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        authChecked: true,
        loggedIn: true,
        currentUser: action.payload,
      };
    case NOT_AUTHENTICATED:
      return {
        authChecked: true,
        loggedIn: false,
        currentUser: {},
      };
    default:
      return state;
  }
}
