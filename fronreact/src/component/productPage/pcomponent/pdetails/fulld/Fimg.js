import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";

function Fimg({ src }) {
  const [i, setI] = React.useState(0);
  return (
    <div className="cimgF mu1">
      <IconButton
        edge="start"
        color="inherit"
        onClick={() => setI(i === 0 ? src.length - 1 : i - 1)}
        aria-label="close"
      >
        <ChevronLeftRoundedIcon />
      </IconButton>
      <img className="imgF" src={src[i]} alt="img" />

      <IconButton
        edge="start"
        color="inherit"
        onClick={() => setI(i === src.length - 1 ? 0 : i + 1)}
        aria-label="close"
      >
        <ChevronRightRoundedIcon />
      </IconButton>
    </div>
  );
}

export default Fimg;
