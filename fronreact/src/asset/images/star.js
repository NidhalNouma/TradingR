import React from "react";

export default function Star(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 36.732 35.157"
      onClick={props.onClick}
    >
      <path
        id="star-solid"
        d="M36.9,1.21,32.412,10.3,22.381,11.763a2.2,2.2,0,0,0-1.215,3.749l7.257,7.072-1.716,9.99a2.2,2.2,0,0,0,3.186,2.314l8.974-4.717,8.974,4.717a2.2,2.2,0,0,0,3.186-2.314l-1.716-9.99,7.257-7.072a2.2,2.2,0,0,0-1.215-3.749L45.319,10.3,40.836,1.21A2.2,2.2,0,0,0,36.9,1.21Z"
        transform="translate(-20.5 0.013)"
        strokeWidth="2.4"
        fill={props.fill ? "var(--pcolor)" : "none"}
      />
    </svg>
  );
}
