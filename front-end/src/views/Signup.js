// src/components/auth/Signup.js
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { addMessage } from "../features/message/messageSlice";
import { registerUser } from "../features/auth/authsSlice";
import { useDispatch } from "react-redux";
import { reLoginUser } from "../features/auth/authsSlice";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@mui/material/IconButton";


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [values, setValues] = React.useState({
    showPassword: false,
    passwordError: false,
    passwordHelper: "",
    email: false,
    emailHelper: "",
  });
  let navigate = useNavigate();
  const dispatch = useDispatch();

  if (localStorage.getItem("token")) {
    useEffect(() => {
      dispatch(reLoginUser()).then((result) => {
        if (result.status === true) {
          // console.log(result);
          navigate("/todolist");
        }
      });
    });
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validate = () => {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate() === false) {
      return;
    }
    dispatch(registerUser({ email, password }))
      .then((status) => {
        // console.log(status.payload);
        if (status.payload === false) {
          setValues({
            ...values,
            emailError: true,
            emailHelper: "Your email may be taken",
          });
        } else {
          dispatch(fetchTodos()).then(() => {
            dispatch(addMessage("Login successful"));
            navigate("/todolist");
          });
        }
      })
      .catch(() =>
        setValues({
          ...values,
          emailError: true,
          emailHelper: "Your email may be taken",
        })
      );
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
              autoComplete="email"
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
              autoComplete="current-password"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignUpUser: (credentials) => dispatch(signupUser(credentials)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
