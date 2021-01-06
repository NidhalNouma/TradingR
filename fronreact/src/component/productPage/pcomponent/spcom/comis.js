import React from "react";

function Comis({ qa, im }) {
  return (
    <div className="conmis">
      <div className="mis flexA">
        <button
          className="buttonT opacity-transition "
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          {" "}
          #Description{" "}
        </button>
        <button
          className="buttonT opacity-transition "
          onClick={() => {
            const elem = document.getElementById("de");
            elem.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {" "}
          #OverView{" "}
        </button>
        <button
          className="buttonT opacity-transition "
          onClick={() => {
            const elem = document.getElementById("qa");
            elem.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {" "}
          #Q&A {qa ? qa : 0}{" "}
        </button>
        <button
          className="buttonT opacity-transition "
          onClick={() => {
            const elem = document.getElementById("im");
            elem.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {" "}
          #Improvement {im ? im : 0}{" "}
        </button>
      </div>
    </div>
  );
}

export default Comis;
