// src/components/auth/Signup.js
import { Typography } from "@mui/material";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { addMessage } from "../features/message/messageSlice";
import { registerUser } from "../features/auth/authsSlice";
import { useDispatch } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { TYPES_OF_MESSAGES } from "../features/message/messagesConstants";
import { validate } from "../helpers/validateFields";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchTodos } from "../features/todos/todosSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setSubmitStatus] = useState(false);
  const [values, setValues] = React.useState({
    showPassword: false,
    passwordError: false,
    passwordHelper: "",
    email: false,
    emailHelper: "",
  });
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(addMessage(TYPES_OF_MESSAGES.SIGNINGUP_USER));
    setSubmitStatus(true);
    if (validate(setValues, email, password, values) === false) {
      setSubmitStatus(false);
      dispatch(addMessage(TYPES_OF_MESSAGES.SIGNUP_FAILED));
      return;
    }
    dispatch(registerUser({ email, password }))
      .then((status) => {
        console.log(status.payload);
        if (status.payload === false) {
          setValues({
            ...values,
            emailError: true,
            emailHelper: "Your email may be taken",
          });
          dispatch(addMessage(TYPES_OF_MESSAGES.SIGNUP_FAILED));
          setSubmitStatus(false);
        } else {
          dispatch(addMessage(TYPES_OF_MESSAGES.SIGNUP_SUCCESSFUL));
          navigate("/");
        }
      })
      .catch((errors) => {
        console.log(errors);
        setValues({
          ...values,
          emailError: true,
          emailHelper: "Your email may be taken",
        });
        setSubmitStatus(false);
      });
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              required
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              helperText="Incorrect entry."
              autoFocus
              error={values.emailError}
              helperText={values.emailHelper}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              inputProps={{ inputMode: "email", pattern: "[0-9]*" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              color="primary"
              error={values.passwordError}
              onChange={(value) => setPassword(event.target.value)}
              type={values.showPassword ? "text" : "password"}
              value={password}
              helperText={values.passwordHelper}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {!isSubmitting && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
            )}
            {isSubmitting && <LoadingSpinner />}
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/login" color="secondary" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Login;
