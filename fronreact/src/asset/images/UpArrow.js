import React from "react";

export default function UpArrow(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.627 46.184">
      <g
        id="arrow_1_"
        data-name="arrow (1)"
        transform="matrix(-1, -0.017, 0.017, -1, 232.745, 33.537)"
      >
        <path
          id="Path_379"
          data-name="Path 379"
          d="M107.6,21.727a5.58,5.58,0,0,0-7.866.027l-3.282,3.281V5.622a5.622,5.622,0,1,0-11.244,0V25.035L81.979,21.8a5.72,5.72,0,0,0-4.021-1.658h-.019a5.562,5.562,0,0,0-3.9,9.5L87.567,43.18a4.625,4.625,0,0,0,6.532,0L107.58,29.7a5.721,5.721,0,0,0,1.658-4.04,5.5,5.5,0,0,0-1.635-3.93Z"
          transform="translate(122.762 -15.546)"
          strokeWidth="3"
          fill={props.yes ? "var(--pcolor)" : "var(--bgcolor)"}
        />
      </g>
    </svg>
  );
}
