import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <path
        d="M10.14 7.5V10M10.14 10V12.5M10.14 10H12.6573M10.14 10H7.62261M17.6921 10C17.6921 14.1421 14.3109 17.5 10.14 17.5C5.96907 17.5 2.58789 14.1421 2.58789 10C2.58789 5.85786 5.96907 2.5 10.14 2.5C14.3109 2.5 17.6921 5.85786 17.6921 10Z"
        stroke="url(#paint0_linear_219_2155)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="paint0_linear_219_2155" x1="0.5" y1="4.5" x2="15" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#29F069" />
          <stop offset="1" stopColor="#E7EC03" />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;
