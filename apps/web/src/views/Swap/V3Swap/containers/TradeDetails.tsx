import { TradeType } from '@pancakeswap/sdk'
import { SmartRouter, SmartRouterTrade } from '@pancakeswap/smart-router/evm'
import { AutoColumn, Flex } from '@pancakeswap/uikit'
import useLastTruthy from 'hooks/useLast'
import { useMemo, memo, ReactNode } from 'react'

import { AdvancedSwapDetails, TradeSummary } from 'views/Swap/components/AdvancedSwapDetails'
import { AdvancedDetailsFooter } from 'views/Swap/components/AdvancedSwapDetailsDropdown'

import { MMTradeInfo } from 'views/Swap/MMLinkPools/hooks'
import { RoutesBreakdown } from '../components'
import { useSlippageAdjustedAmounts, useIsWrapping } from '../hooks'
import { computeTradePriceBreakdown } from '../utils/exchange'

interface Props {
  loaded: boolean
  trade?: SmartRouterTrade<TradeType> | null
  pricingAndSlippage?: ReactNode
}

export function MMTradeDetail({ loaded, mmTrade }: { loaded: boolean; mmTrade?: MMTradeInfo }) {
  const lastTrade = useLastTruthy(mmTrade?.trade)

  return (
    <AdvancedDetailsFooter show={loaded}>
      <AutoColumn gap="0px">
        {lastTrade && (
          <AdvancedSwapDetails
            pairs={[]}
            path={lastTrade?.routes[0].path}
            slippageAdjustedAmounts={mmTrade?.slippageAdjustedAmounts}
            realizedLPFee={mmTrade?.realizedLPFee}
            inputAmount={mmTrade?.inputAmount}
            outputAmount={mmTrade?.outputAmount}
            tradeType={mmTrade?.tradeType}
            priceImpactWithoutFee={mmTrade?.priceImpactWithoutFee}
            isMM
          />
        )}
      </AutoColumn>
    </AdvancedDetailsFooter>
  )
}

export const TradeDetails = memo(function TradeDetails({ loaded, trade, pricingAndSlippage }: Props) {
  const slippageAdjustedAmounts = useSlippageAdjustedAmounts(trade)
  const isWrapping = useIsWrapping()
  const { priceImpactWithoutFee, lpFeeAmount } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const hasStablePool = useMemo(
    () => trade?.routes.some((route) => route.pools.some(SmartRouter.isStablePool)),
    [trade],
  )

  if (isWrapping) {
    return null
  }

  return (
    <AdvancedDetailsFooter show={true}>
      <AutoColumn gap="0px">
        <Flex px="24px">{pricingAndSlippage}</Flex>
        {loaded && trade && (
          <>
            <TradeSummary
              slippageAdjustedAmounts={slippageAdjustedAmounts}
              inputAmount={trade?.inputAmount}
              outputAmount={trade?.outputAmount}
              tradeType={trade?.tradeType}
              priceImpactWithoutFee={priceImpactWithoutFee}
              realizedLPFee={lpFeeAmount}
              hasStablePair={hasStablePool}
              pricingAndSlippage={pricingAndSlippage}
            />
            <RoutesBreakdown routes={trade?.routes} />
          </>
        )}
      </AutoColumn>
    </AdvancedDetailsFooter>
  )
})
