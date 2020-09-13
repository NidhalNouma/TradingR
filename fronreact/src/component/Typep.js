import React from "react";
import Ai from "../asset/images/wp/ai";
import Kpi from "../asset/images/wp/kpi";
import Open from "../asset/images/wp/opencode";

function Typep(props) {
  return (
    <>
      <div className="type-product">
        {props.type === "ROBOT" && <Ai />}
        {props.type === "INDICATOR" && <Kpi />}
        {props.type === "SOURCE" && <Open />}
        <span>{props.type && props.type.toLowerCase()}</span>
      </div>
    </>
  );
}

export default Typep;
