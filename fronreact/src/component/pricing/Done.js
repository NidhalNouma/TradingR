import React from "react";
import { Link } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

function Done({ data }) {
  return (
    <div className="pay-done">
      <Play l={0} />
      <Play l={1} />
      <p className="pgb bold">
        You Subscribe to<span className="ml-5 colorP">{data.title}</span>
      </p>
      <p className="pgb bold">
        Start explore our
        <Link to="/indicators" className="ml-5 mr-5 colorP tHover">
          Indicators
        </Link>
        and
        <Link to="/strategys" className="ml-5 mr-5 colorP tHover">
          Strategys
        </Link>
      </p>
      <p className="pgb bold">
        Feel free to contact us if you found any issues
      </p>
      <p className="pgb bold">
        If you have any idea feel free to contact us{" "}
        <Link to="/indicators" className="colorP tHover">
          here
        </Link>
      </p>
      <p className="pgb bold">Join our Comunity here</p>
    </div>
  );
}

export default Done;

function Play({ l }) {
  //   const src = "https://assets6.lottiefiles.com/packages/lf20_7x6dsnhs.json";
  const src = "https://assets8.lottiefiles.com/packages/lf20_REOnx3.json";
  const style = {
    height: "300px",
    position: "absolute",
    top: "-100px",
    left: "0",
  };
  const style1 = {
    height: "300px",
    position: "absolute",
    top: "-100px",
    right: "0",
  };

  return (
    <Player autoplay loop src={src} style={l === 0 ? style : style1}>
      <Controls
        visible={false}
        buttons={["play", "repeat", "frame", "debug"]}
      />
    </Player>
  );
}
