import React, { useState } from "react";
// import Chart from "./chart/chart";
// import Chartbar from "./chart/chartbar";
// import Chartd from "./chart/chartd";

import IconButton from "@material-ui/core/IconButton";
import FullscreenRoundedIcon from "@material-ui/icons/FullscreenRounded";
import Show from "../../../show";
import FullScreenDialog from "./fullscreen";

function Index({ data }) {
  const [sel, setSel] = useState(0);
  const style = { background: "var(--scolor)" };
  const show = Show();

  // console.log(data);

  return (
    <>
      <FullScreenDialog open={show.show} setOpen={show.cshow} />
      <div className="sdetails flexA">
        <span style={sel === 0 ? style : undefined} onClick={() => setSel(0)}>
          Screenshots
        </span>
        <span style={sel === 1 ? style : undefined} onClick={() => setSel(1)}>
          Inputs
        </span>
        <span style={sel === 2 ? style : undefined} onClick={() => setSel(2)}>
          How to use
        </span>
        <span style={sel === 3 ? style : undefined} onClick={() => setSel(3)}>
          What's new
        </span>
      </div>
      <div id="de">
        <div className="chart parse">
          <div className="full">
            <IconButton edge="end" color="inherit" onClick={() => show.sshow()}>
              <FullscreenRoundedIcon />
            </IconButton>
          </div>
          {sel === 2 ? "<Chartd /> " : sel === 1 ? "<Chartbar />" : "<Chart />"}
        </div>
      </div>
    </>
  );
}

export default Index;
