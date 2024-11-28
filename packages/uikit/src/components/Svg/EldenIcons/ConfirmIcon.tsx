import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => (
  <Svg viewBox="0 0 40 40" {...props}>
    <g clipPath="url(#clip0_219_5063)">
      <g filter="url(#filter0_f_219_5063)">
        <path
          d="M16.4313 19.6887L19.3758 22.6332L25.2649 16.7441M34.0985 19.6887C34.0985 27.0067 28.1661 32.9391 20.8481 32.9391C13.5301 32.9391 7.59766 27.0067 7.59766 19.6887C7.59766 12.3706 13.5301 6.43823 20.8481 6.43823C28.1661 6.43823 34.0985 12.3706 34.0985 19.6887Z"
          stroke="url(#paint0_linear_219_5063)"
          strokeOpacity="0.5"
          strokeWidth="2.20357"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M16.4313 19.6887L19.3758 22.6332L25.2649 16.7441M34.0985 19.6887C34.0985 27.0067 28.1661 32.9391 20.8481 32.9391C13.5301 32.9391 7.59766 27.0067 7.59766 19.6887C7.59766 12.3706 13.5301 6.43823 20.8481 6.43823C28.1661 6.43823 34.0985 12.3706 34.0985 19.6887Z"
        stroke="url(#paint1_linear_219_5063)"
        strokeWidth="2.20357"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_219_5063"
        x="1.857"
        y="0.69733"
        width="37.9813"
        height="37.9825"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="2.31955" result="effect1_foregroundBlur_219_5063" />
      </filter>
      <linearGradient
        id="paint0_linear_219_5063"
        x1="37.1719"
        y1="18.036"
        x2="4.69822"
        y2="26.1544"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E7EC03" />
        <stop offset="1" stopColor="#29F069" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_219_5063"
        x1="37.1719"
        y1="18.036"
        x2="4.69822"
        y2="26.1544"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E7EC03" />
        <stop offset="1" stopColor="#29F069" />
      </linearGradient>
      <clipPath id="clip0_219_5063">
        <rect width="39.5513" height="39.5513" fill="white" />
      </clipPath>
    </defs>
  </Svg>
);

export default Icon;
