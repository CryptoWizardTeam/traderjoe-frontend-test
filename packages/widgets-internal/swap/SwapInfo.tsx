import { useTranslation } from "@pancakeswap/localization";
import { useIsMounted } from "@pancakeswap/hooks";
import { PropsWithChildren, ReactNode } from "react";
import { AutoColumn, RowBetween, Text, TextProps, IconButton, PencilIcon } from "@pancakeswap/uikit";

type SwapInfoType = {
  price: ReactNode;
  allowedSlippage?: number;
  onSlippageClick?: () => void;
  allowedSlippageSlot?: React.ReactNode;
};

export const SwapInfoLabel = (props: PropsWithChildren<TextProps>) => (
  <Text fontSize="12px" color="textSubtle" {...props} />
);

export const SwapInfo = ({ allowedSlippage, price, onSlippageClick, allowedSlippageSlot }: SwapInfoType) => {
  const { t } = useTranslation();
  const isMounted = useIsMounted();

  return (
    <AutoColumn gap="sm" py="0px" px="0px" width="100%">
      {typeof allowedSlippage === "number" && (
        <RowBetween alignItems="center">
          <SwapInfoLabel>
            {t("Slippage Tolerance")}
            {onSlippageClick ? (
              <IconButton scale="sm" variant="text" onClick={onSlippageClick}>
                <PencilIcon color="primary" width="10px" />
              </IconButton>
            ) : null}
          </SwapInfoLabel>
          {isMounted &&
            (allowedSlippageSlot ?? (
              <Text bold fontSize="12px" color="app">
                {allowedSlippage / 100}%
              </Text>
            ))}
          <RowBetween alignItems="center">{price}</RowBetween>
        </RowBetween>
      )}
    </AutoColumn>
  );
};
