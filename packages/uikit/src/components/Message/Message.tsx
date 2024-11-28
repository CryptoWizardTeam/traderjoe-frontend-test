import React, { useContext, useMemo } from "react";
import { styled } from "styled-components";
import { variant as systemVariant, space } from "styled-system";
import { WarningIcon, ErrorIcon, CheckmarkCircleFillIcon, InfoFilledIcon } from "../Svg";
import { Text, TextProps } from "../Text";
import { Box } from "../Box";
import { MessageProps } from "./types";
import variants from "./theme";

const MessageContext = React.createContext<MessageProps>({ variant: "success" });

const Icons = {
  warning: WarningIcon,
  danger: ErrorIcon,
  success: CheckmarkCircleFillIcon,
  primary: InfoFilledIcon,
};

const MessageContainer = styled.div<MessageProps>`
  background: radial-gradient(
    127.56% 175.14% at 98.37% 0.84%,
    rgba(96, 152, 102, 0.07) 0%,
    rgba(75, 109, 85, 0.02) 100%
  );
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);

  ${space}
  ${systemVariant({
    variants,
  })}
`;

const Flex = styled.div`
  display: flex;
`;

const colors = {
  // these color names should be place in the theme once the palette is finalized
  warning: "#b1ada5",
  success: "#129E7D",
  danger: "failure",
  primary: "text",
};

export const MessageText: React.FC<React.PropsWithChildren<TextProps>> = ({ children, ...props }) => {
  const ctx = useContext(MessageContext);
  return (
    <Text fontSize="14px" color={colors[ctx?.variant]} {...props}>
      {children}
    </Text>
  );
};

const Message: React.FC<React.PropsWithChildren<MessageProps>> = ({
  children,
  variant,
  icon,
  action,
  actionInline,
  ...props
}) => {
  const Icon = Icons[variant];
  const providerValue = useMemo(() => ({ variant }), [variant]);
  return (
    <MessageContext.Provider value={providerValue}>
      <MessageContainer variant={variant} {...props}>
        <Flex>
          <Box mr="12px">{icon ?? <Icon color={variants[variant].borderColor} width="24px" />}</Box>
          {children}
          {actionInline && action}
        </Flex>
        {!actionInline && action}
      </MessageContainer>
    </MessageContext.Provider>
  );
};

export default Message;
