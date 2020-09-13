import React, { useState } from "react";
import Chart from "../chart/chart";
import Chartbar from "../chart/chartbar";
import Chartd from "../chart/chartd";
import FullS from "../../../../asset/images/FullS";
import FullScreenDialog from "./fullscreen";
import Show from "../../../show";

function Productdes({ data }) {
  const [det, setDet] = useState(0);
  const show = Show();

  return (
    <>
      <FullScreenDialog open={show.show} setOpen={show.cshow} />
      <div className="pdetails">
        <iframe
          title="Video Desc"
          src={
            data
              ? "https://www.youtube.com/embed/" + data.media
              : "https://www.youtube.com/embed/CFO0amXDiaw"
          }
        ></iframe>

        <h4>{data ? data.title : "..... "}</h4>
        <p>{data.description}</p>
        <h5>Check the results Bellow</h5>
        <div id="de">
          <div className="chart">
            <div className="full" onClick={() => show.sshow()}>
              <FullS />
            </div>
            {det === 2 ? <Chartd /> : det === 1 ? <Chartbar /> : <Chart />}
          </div>
          <ul>
            <li onClick={() => setDet(0)} id={det === 0 ? "select" : ""}>
              .
            </li>
            <li onClick={() => setDet(1)} id={det === 1 ? "select" : ""}>
              .
            </li>
            <li onClick={() => setDet(2)} id={det === 2 ? "select" : ""}>
              .
            </li>
          </ul>
        </div>
        <br />
      </div>
    </>
  );
}

export default Productdes;
