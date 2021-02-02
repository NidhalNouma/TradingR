import React from "react";
import parse from "html-react-parser";

function Inp({ data }) {
  return <div>{parse(data)}</div>;
}

export default Inp;
