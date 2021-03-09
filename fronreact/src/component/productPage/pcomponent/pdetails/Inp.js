import React from "react";
import parse from "html-react-parser";

function Inp({ data }) {
  return <div className="mu2">{parse(data)}</div>;
}

export default Inp;
