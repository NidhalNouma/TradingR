import React from "react";

function Comis({ qa, im }) {
  return (
    <div className="conmis">
      <div className="mis">
        {/* <span> #Users 11 </span> */}
        <a
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          {" "}
          #Description{" "}
        </a>
        <a
          onClick={() => {
            const elem = document.getElementById("de");
            elem.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {" "}
          #OverView{" "}
        </a>
        <a
          onClick={() => {
            const elem = document.getElementById("qa");
            elem.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {" "}
          #Q&A {qa ? qa : 0}{" "}
        </a>
        <a
          onClick={() => {
            const elem = document.getElementById("im");
            elem.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {" "}
          #Improvement {im ? im : 0}{" "}
        </a>
      </div>
    </div>
  );
}

export default Comis;
