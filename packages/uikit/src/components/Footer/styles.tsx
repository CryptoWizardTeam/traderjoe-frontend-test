import { styled } from "styled-components";
import { darkColors } from "../../theme/colors";
import { Box, Flex } from "../Box";
import SocialLinks from "./Components/SocialLinks";

export const StyledFooter = styled(Flex)`
  background: linear-gradient(89deg, #0c170d 7%, rgba(1, 10, 1, 0.3) 120%), url(/efi/footer.png),
    lightgray 0% 0% / 50px 50px repeat;
  background-blend-mode: normal, screen;
  background-color: #010a01;
`;

export const StyledList = styled.ul`
  list-style: none;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 0px;
  }
`;

export const StyledListItem = styled.li`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 8px;

  &:first-child {
    color: ${darkColors.secondary};
  }
`;

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const StyledToolsContainer = styled(Flex)`
  border-color: ${darkColors.cardBorder};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`;

export const StyledSocialLinks = styled(SocialLinks)``;

export const StyledText = styled.span`
  color: #ffffff99; //${darkColors.text};
`;
