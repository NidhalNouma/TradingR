import React, { useState } from "react";

function Navfil() {
  const style = { backgroundColor: "var(--tcolor)", color: "var(--scolor)" };
  const [trend, setTrend] = useState(false);
  const [best, setBest] = useState(false);
  const [pop, setPop] = useState(false);
  const [free, setFree] = useState(false);

  return (
    <div className="nav-fil">
      <div className="menu-fil">
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
            setFree(false);
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
            setFree(false);
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
            setFree(false);
          }}
        >
          Paid
        </button>
        <button
          className="btnNav"
          style={free ? style : {}}
          onClick={() => {
            window.scroll({
              top: 100,
              behavior: "smooth",
            });
            setFree(!free);
            setBest(false);
            setPop(false);
            setTrend(false);
          }}
        >
          Free
        </button>
      </div>
    </div>
  );
}

export default Navfil;
