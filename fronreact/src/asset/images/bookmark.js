import React from "react";

export default function Bookmark(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25.908 36.869"
      onClick={props.onClick}
    >
      <g
        id="bookmark_1_"
        data-name="bookmark (1)"
        transform="translate(-79.334 1)"
        strokeWidth="2.5"
      >
        <g id="Group_1821" data-name="Group 1821" transform="translate(80.334)">
          <path
            id="Path_378"
            data-name="Path 378"
            d="M103.222,0H81.355a1.021,1.021,0,0,0-1.021,1.021v32.8a1.021,1.021,0,0,0,1.743.722L92.288,24.331,102.5,34.543a1.021,1.021,0,0,0,1.743-.722V1.021A1.021,1.021,0,0,0,103.222,0Z"
            transform="translate(-80.334)"
            fill={props.fill ? "var(--pcolor)" : "none"}
          />
        </g>
      </g>
    </svg>
  );
}
