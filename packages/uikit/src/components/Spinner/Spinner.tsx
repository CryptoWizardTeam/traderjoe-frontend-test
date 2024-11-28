import React from "react";
import { SpinnerProps } from "./types";
import { Box } from "../Box";
import { Image } from "../Image";
import { LogoIcon } from "..";

const Spinner: React.FC<React.PropsWithChildren<SpinnerProps>> = ({ size = 128 }) => {
  return (
    <Box width={size} height={size * 1.197} position="relative">
      <LogoIcon width={size} />
    </Box>
  );
};

export default Spinner;
