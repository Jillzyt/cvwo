import * as React from "react";
import Chip from "@mui/material/Chip";

export default function TagsList({ chips }) {
  const [chipData] = React.useState(chips.split(","));

  return (
    <React.Fragment>
      {chipData.map((data) => {
        return <Chip label={"#" + data} style={{ margin: "1%" }} />;
      })}
    </React.Fragment>
  );
}
