import React from "react";
import { Link } from "react-router-dom";

function Trycomp({ not, d, t }) {
  return (
    <div className="border m1 p-5 mu-5">
      <h5 className="h5 bold">
        {t ? "Testing Version" : "Production Version"}
      </h5>
      <p className="pg1">
        elit. Officiis asperiores, enim laboriosam iure nemo similique illo.
        Perspiciatis itaque velit, quod cumque nobis accusantium vel
      </p>
      {not ? (
        <p className="pgd">
          Subscribe{" "}
          <Link className="ah1 bold" to="/pricing">
            here
          </Link>{" "}
          to access this version
        </p>
      ) : (
        <>
          <button
            className={!not ? "buttonR" : "buttonR buttonNAN"}
            onClick={(e) => window.open(d, "_self")}
          >
            Download
          </button>
        </>
      )}
    </div>
  );
}

export default Trycomp;
