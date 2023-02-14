import React, { SVGProps } from "react";
export const MenuLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
      <path strokeDasharray="10" strokeDashoffset="10" d="M7 9L4 12L7 15">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.6s"
          dur="0.2s"
          values="10;0"
        ></animate>
      </path>
      <path strokeDasharray="16" strokeDashoffset="16" d="M19 5H5">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.2s"
          values="16;0"
        ></animate>
      </path>
      <path strokeDasharray="12" strokeDashoffset="12" d="M19 12H10">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.2s"
          dur="0.2s"
          values="12;0"
        ></animate>
      </path>
      <path strokeDasharray="16" strokeDashoffset="16" d="M19 19H5">
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
