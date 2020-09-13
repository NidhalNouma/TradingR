import React from "react";
import { Link } from "react-router-dom";
import Stra from "../../../asset/images/wp/ai";
import Indi from "../../../asset/images/wp/kpi";
import Sour from "../../../asset/images/wp/opencode";

function Noprod({ type }) {
  return (
    <div className="noproduct">
      <div>
        {type === "Strategys" && <Stra />}
        {type === "Indicators" && <Indi />}
        {type === "Source" && <Sour />}
      </div>
      <div>
        <h5>Check out our {type} now</h5>
        <Link to={"/" + type}>Go to {type}</Link>
      </div>
    </div>
  );
}

export default Noprod;
