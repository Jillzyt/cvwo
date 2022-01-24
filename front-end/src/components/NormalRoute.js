import React, { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const height = window.innerHeight;
const NormalRoute = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: myRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          backgroundColor: "#f5f5f5",
          minHeight: height * 0.922,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  if (vantaEffect != null) {
    setVantaEffect(vantaEffect.resize());
  }
  return (
    <div style={{ height: "100%", backgroundColor: "#f5f5f5" }}>
      <div ref={myRef}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          backgroundColor="0xf5f5f5"
          style={{ minHeight: height * 0.841 }}
        >
          <Grid item xs={3}>
            <Typography color="black" variant="h3">
              {!user && "Please log in."}
              {user && (
                <Button
                  variant="contained"
                  onClick={() => navigate("/todolist")}
                >
                  {" "}
                  Go to-do app
                </Button>
              )}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NormalRoute;
