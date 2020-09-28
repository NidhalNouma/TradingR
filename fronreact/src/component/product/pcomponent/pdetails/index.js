import React, { useState } from "react";
import Chart from "./chart/chart";
import Chartbar from "./chart/chartbar";
import Chartd from "./chart/chartd";
import FullS from "../../../../asset/images/FullS";
import Show from "../../../show";
import FullScreenDialog from "./fullscreen";

function Index() {
  const [sel, setSel] = useState(0);
  const style = { background: "var(--scolor)" };
  const show = Show();

  return (
    <>
      <FullScreenDialog open={show.show} setOpen={show.cshow} />
      <div className="sdetails">
        <span style={sel === 0 ? style : undefined} onClick={() => setSel(0)}>
          Details
        </span>
        <span style={sel === 1 ? style : undefined} onClick={() => setSel(1)}>
          Inputs
        </span>
        <span style={sel === 2 ? style : undefined} onClick={() => setSel(2)}>
          Results
        </span>
      </div>
      <div id="de">
        <div className="chart">
          {/* <div className="full" onClick={() => show.sshow()}>
            <FullS />
          </div> */}
          {sel === 2 ? <Chartd /> : sel === 1 ? <Chartbar /> : <Chart />}
        </div>
      </div>
    </>
  );
}

export default Index;
