import { PropsWithChildren } from "react";
import Text from "./Text";
import { TextProps } from "./types";

export const PreTitle = (props: PropsWithChildren<TextProps>) => (
  <Text color="secondary" fontSize="15px" fontWeight={200} {...props} />
);
