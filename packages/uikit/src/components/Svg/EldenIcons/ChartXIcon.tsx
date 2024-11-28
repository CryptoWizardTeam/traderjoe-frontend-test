import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="#122314">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10v6m4-4v4m4-8v8" />
        <rect width="18" height="16" x="3" y="4" rx="2" />
      </g>
    </Svg>
  );
};

export default Icon;
