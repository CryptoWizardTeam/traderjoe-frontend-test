import { Currency } from "@pancakeswap/sdk";
import { ChainId } from "@pancakeswap/chains";
import { useMemo } from "react";
import { styled } from "styled-components";
import { useHttpLocations } from "@pancakeswap/hooks";
import { TokenLogo, BinanceIcon } from "@pancakeswap/uikit";

import { getCurrencyLogoUrls } from "./utils";

const StyledLogo = styled(TokenLogo) <{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`;

export function CurrencyLogo({
  currency,
  size = "24px",
  style,
}: {
  currency?: Currency & {
    logoURI?: string | undefined;
  };
  size?: string;
  style?: React.CSSProperties;
}) {
  const uriLocations = useHttpLocations(currency?.logoURI);

  const srcs: string[] = useMemo(() => {
    const logoUrls = getCurrencyLogoUrls(currency);
    if (currency?.logoURI) {
      return [...uriLocations, ...logoUrls];
    }
    return [...logoUrls];
  }, [currency, uriLocations]);

  if (currency?.isNative) {
    if (currency.chainId === ChainId.BSC) {
      return <BinanceIcon width={size} style={style} />;
    }
    return <StyledLogo size={size} srcs={srcs} width={size} style={style} />;
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? "token"} logo`} style={style} />;
}
