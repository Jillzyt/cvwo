// src/App.js
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { red, grey, orange } from "@mui/material/colors";
import Signup from "./views/Signup";
import Login from "./views/Login";
import TodoPage from "./components/TodoPage";
import NormalRoute from "./components/NormalRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create color mode context
function ToggleColorMode() {
  const [mode, setMode] = React.useState(
    localStorage.getItem("mode") === "light" ? "light" : "dark"
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("mode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: {
                  main: orange[50],
                  contrastText: "#00000", //button text white instead of black
                },
                background: {
                  paper: orange[50],
                },
                secondary: {
                  main: grey[700],
                },
                divider: orange[200],
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                },
                MuiButton: {
                  active: orange[50],
                  hover: orange[100],
                  selected: orange[100],
                },
              }
            : {
                // palette values for dark mode
                primary: grey,
                divider: grey[700],
                background: {
                  default: "#31343C",
                  paper: "#31343C",
                },
                text: {
                  primary: "#fff",
                  secondary: "#fff",
                  disabled: "rgba(255, 255, 255, 0.5)",
                },
                buttons: {
                  active: "#fff",
                  hover: "rgba(255, 255, 255, 0.08)",
                  selected: "rgba(255, 255, 255, 0.16)",
                },
              }),
        },
        error: {
          "&.MuiFormHelperText-root.Mui-error": {
            color: red[500],
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

// React app application
function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <div>
      <CssBaseline /> {/* This is to reset css baseline */}
      <Router>
        <Navbar onClick={colorMode.toggleColorMode} theme={theme} />
        <Routes>
          <Route exact path="/" element={<NormalRoute />} />
          <Route exact path="/protected_route" element={<ProtectedRoute />}>
            <Route exact path="/protected_route" element={<TodoPage />} />
          </Route>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default ToggleColorMode;
