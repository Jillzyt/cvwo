import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { useNavigate } from "react-router-dom";
import Logout from "./auth/Logout";
import { useSelector } from "react-redux";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

const settings = [
  { name: "Profile", route: "/profile" },
  { name: "Account", route: "account" },
];

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name ? name : "L"),
    },
    children: name ? name[0] : "L",
  };
}

const Navbar = ({ loggedIn, onClick, theme }) => {
  const [currentTheme, setTheme] = React.useState(theme);
  const user = useSelector((state) => state.auth.user);
  let navigate = useNavigate();

  const handleThemeButton = () => {
    onClick();
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <AppBar elevation={0} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            color="black"
            onClick={() => {
              navigate("/");
            }}
            variant="h3"
            noWrap
            sx={{ mr: 2, display: { xs: "flex", md: "flex" } }}
          >
            Notly
            <PlaylistAddCheckIcon></PlaylistAddCheckIcon>
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{ ml: 1 }}
              color="inherit"
              onClick={handleThemeButton}
            >
              {currentTheme == "light" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            {!user && (
              <React.Fragment>
                <Button component={Link} color="secondary" to="/login">
                  Log In
                </Button>
              </React.Fragment>
            )}{" "}
            {user && <Logout></Logout>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = ({ auth: { authChecked, loggedIn, currentUser } }) => {
  return { authChecked, loggedIn, currentUser };
};

export default connect(mapStateToProps)(Navbar);
