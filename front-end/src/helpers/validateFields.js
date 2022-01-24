import { validateEmail } from "../helpers/validateEmail";

export const validate = (setValues, email, password, values) => {
  if (email.length === 0 && email.length === 0) {
    setValues({
      ...values,
      emailError: true,
      emailHelper: "Email is required",

      passwordError: true,
      passwordHelper: "Password is required",
    });
    return false;
  }
  if (email.length === 0) {
    setValues({
      ...values,
      emailError: true,
      emailHelper: "Email is required",
    });
    return false;
  }

  if (!validateEmail(email)) {
    setValues({
      ...values,
      emailError: true,
      emailHelper: "Invalid email",
    });
    return false;
  }
  if (password.length === 0) {
    setValues({
      ...values,
      passwordError: true,
      passwordHelper: "Password is required",
    });
    return false;
  }
};
