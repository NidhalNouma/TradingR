import React from "react";

export default function Menu(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      {props.click ? (
        <>
          <path
            id="path_1"
            d="M 0 0 L 100 100"
            strokeWidth="8"
            fill="rgb(170, 160, 32)"
            stroke="rgb(170, 160, 32)"
          />
          <path
            id="path_3"
            d="M 0 100 L 100 0"
            strokeWidth="8"
            fill="rgb(170, 160, 32)"
            stroke="rgb(170, 160, 32)"
          />
        </>
      ) : (
        <>
          <path id="path_1" d="M 0 10 H 100" strokeWidth="8" />
          <path id="path_2" d="M 0 50 H 100" strokeWidth="8" />
          <path id="path_3" d="M 0 90 H 100" strokeWidth="8" />
        </>
      )}
    </svg>
  );
}
