import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddSvg from "../../asset/images/Add";

function Navp() {
  const style = { backgroundColor: "var(--tcolor)", color: "var(--scolor)" };
  const [trend, setTrend] = useState(false);
  const [best, setBest] = useState(false);
  const [pop, setPop] = useState(false);

  return (
    <div className="nav-fil">
      <div className="menu-filp">
        <div className="flexA">
          <button
            className="btnNav"
            style={trend ? style : {}}
            onClick={() => {
              window.scroll({
                top: 100,
                behavior: "smooth",
              });
              setTrend(!trend);
              setBest(false);
              setPop(false);
            }}
          >
            Popular
          </button>
          <button
            className="btnNav"
            style={best ? style : {}}
            onClick={() => {
              window.scroll({
                top: 100,
                behavior: "smooth",
              });
              setBest(!best);
              setTrend(false);
              setPop(false);
            }}
          >
            Last
          </button>
          <button
            className="btnNav"
            style={pop ? style : {}}
            onClick={() => {
              window.scroll({
                top: 100,
                behavior: "smooth",
              });
              setPop(!pop);
              setBest(false);
              setTrend(false);
            }}
          >
            Paid
          </button>
        </div>
        <Link
          className="btnNav flexA btnHover svg1 bold"
          style={{ backgroundColor: "var(--shcolor)", color: "var(--pcolor)" }}
          to="/posts/create"
        >
          <span>Add Post</span>
          <AddSvg />
        </Link>
      </div>
    </div>
  );
}

export default Navp;
