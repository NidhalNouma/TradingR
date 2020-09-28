import React from "react";
import Details from "../pdetails";

function Productdes({ data }) {
  return (
    <>
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
        <Details />
      </div>
      <br />
    </>
  );
}

export default Productdes;
