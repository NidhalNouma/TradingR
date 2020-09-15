import React from "react";

export default function ThumpUp(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 57 53.159"
      onClick={props.onClick}
    >
      <g
        id="iconfinder_038_031_like_social_network_friends_android_material_1646933"
        transform="translate(0.5 -0.5)"
      >
        <rect
          id="Rectangle_697"
          data-name="Rectangle 697"
          width="12"
          height="32"
          transform="translate(2 22.159)"
          fill={props.fill ? "var(--pcolor)" : "none"}
          strokeWidth="4"
        />
        <path
          id="Path_397"
          data-name="Path 397"
          d="M39.017,20H25.676V5.833A2.754,2.754,0,0,0,23.008,3H20.34L8.774,18.229A8.832,8.832,0,0,0,7,23.564V45.493a5.508,5.508,0,0,0,5.336,5.666H29.5a7.973,7.973,0,0,0,7.178-4.739l7.67-16.508V25.663A5.508,5.508,0,0,0,39.017,20Z"
          transform="translate(9.647)"
          fill={props.fill ? "var(--pcolor)" : "none"}
          strokeWidth="4"
        />
      </g>
    </svg>
  );
}
