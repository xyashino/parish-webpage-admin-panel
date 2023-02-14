import React, { SVGProps } from "react";
export const MenuRight = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
      <path strokeDasharray="10" strokeDashoffset="10" d="M17 9L20 12L17 15">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.6s"
          dur="0.2s"
          values="10;0"
        ></animate>
      </path>
      <path strokeDasharray="16" strokeDashoffset="16" d="M5 5H19">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.2s"
          values="16;0"
        ></animate>
      </path>
      <path strokeDasharray="12" strokeDashoffset="12" d="M5 12H14">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.2s"
          dur="0.2s"
          values="12;0"
        ></animate>
      </path>
      <path strokeDasharray="16" strokeDashoffset="16" d="M5 19H19">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.4s"
          dur="0.2s"
          values="16;0"
        ></animate>
      </path>
    </g>
  </svg>
);
