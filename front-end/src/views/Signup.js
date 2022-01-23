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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  if (localStorage.getItem("token")) {
    useEffect(() => {
      dispatch(reLoginUser()).then((result) => {
        if (result.status === true) {
          console.log(result);
          navigate("/todolist");
        }
      });
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(registerUser({ email, password }))
      .then(() => {
        dispatch(addMessage("Login successful"));
        navigate("/todolist");
      })
      .catch(() => setError(true));
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
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(value) => setPassword(event.target.value)}
              value={password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
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
