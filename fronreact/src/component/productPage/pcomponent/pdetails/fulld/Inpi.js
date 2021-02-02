import React from "react";
import parse from "html-react-parser";

function Inpi({ data }) {
  return <div className="pdp-full">{parse(data)}</div>;
}

export default Inpi;
