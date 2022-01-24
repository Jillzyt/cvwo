export const TYPES_OF_MESSAGES = {
  ADD_TODO_PROGRESS: { message: "Adding todo", type: "info" },
  ADD_TODO_SUCCESS: { message: "Add todo successful", type: "success" },
  ADD_TODO_FAILED: { message: "Add todo failed", type: "error" },
  DELETE_TODO_PROCESSING: {
    message: "Delete todo processing",
    type: "info",
  },
  DELETE_TODO_SUCCESSFUL: {
    message: "Delete todo successful",
    type: "success",
  },
  LOGGING_USER: { message: "Processing login", type: "info" },
  LOGIN_SUCCESSFUL: { message: "Login successful", type: "success" },
  LOGIN_FAILED: { message: "Login failed", type: "error" },
  SIGNINGUP_USER: { message: "Processing signup", type: "info" },
  SIGNUP_SUCCESSFUL: { message: "Sign up successful", type: "success" },
  SIGNUP_FAILED: { message: "Sign up failed", type: "error" },
  UPDATING_STATUS: { message: "Updating todo", type: "info"},
  UPDATED_STATUS_SUCCESS: { message: "Updated todo success", type: "success"}
};
