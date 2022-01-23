import React, { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag
import { Grid, Typography } from "@mui/material";

const height = window.innerHeight;
const NormalRoute = (props) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
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
  <div style={{height:"100%", backgroundColor:"#f5f5f5"}}>
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
            Please log in.
          </Typography>
        </Grid>
      </Grid>
    </div>
    </div>
  );
};

export default NormalRoute;
