import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({ chips }) {
  const [chipData, setChipData] = React.useState(chips.split(","));

  // TODO
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete.key));
  };

  return (
    <React.Fragment>
      {chipData.map((data) => {
        return (
          <Chip
            label={"#" + data}
            // onDelete={data === 'React' ? undefined : handleDelete(data)}
          />
        );
      })}
    </React.Fragment>
  );
}
