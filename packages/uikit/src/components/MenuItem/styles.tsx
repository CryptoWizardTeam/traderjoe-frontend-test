import { styled } from "styled-components";
import { StyledMenuItemProps } from "./types";

export const StyledMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;

  ${({ $isActive, $variant, theme }) =>
    $isActive &&
    $variant === "subMenu" &&
    `
      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        background-color: ${theme.colors.primary};
        border-radius: 2px 2px 0 0;
      }
    `};
`;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;

  color: rgba(197, 196, 196, 1); //${({ theme, $isActive }) => ($isActive ? theme.colors.gray6 : theme.colors.gray6)};
  font-size: 16px;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? "none" : "inherit")};

  background: ${({ $isActive }) =>
    $isActive ? "linear-gradient(90deg, #e7ec03 0.16%, #29f069 95.68%)" : "transparent"};
  background-clip: ${({ $isActive }) => ($isActive ? "text" : "unset")};
  -webkit-background-clip: ${({ $isActive }) => ($isActive ? "text" : "unset")};
  -webkit-text-fill-color: ${({ $isActive }) => ($isActive ? "transparent" : "unset")};

  ${({ $statusColor, theme }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === "default"
      ? `
    padding: 0 16px;
    height: 48px;
  `
      : `
    padding-left: 4px;
    padding-right: 4px;

    height: 42px;
  `}

  &:hover {
    background: linear-gradient(90deg, #e7ec03 0.16%, #29f069 95.68%);
    background-clip: text !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -4px;
    right: 0;
    height: ${({ $isActive }) => ($isActive ? "2px" : "0px")};
    width: 100%;
    background: rgba(41, 240, 105, 1);
  }
`;

export default StyledMenuItem;
