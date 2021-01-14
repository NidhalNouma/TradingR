import React from "react";
import Ai from "../asset/images/wp/ai";
import Kpi from "../asset/images/wp/kpi";
import Open from "../asset/images/wp/opencode";

function Typep({ type }) {
  return (
    <>
      <div className="type-product">
        {type === "EA" && <Ai />}
        {type === "Indicator" && <Kpi />}
        {type === "SOURCE" && <Open />}
        <span>
          {type === "EA" ? "Robot" : type === "Indicator" ? "Indicator" : ""}
        </span>
      </div>
    </>
  );
}

export default Typep;
