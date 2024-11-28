import { useModal } from '@pancakeswap/uikit'
import { Swap as SwapUI } from '@pancakeswap/widgets-internal'

import { useTranslation } from '@pancakeswap/localization'
import { Price, Currency } from '@pancakeswap/sdk'
import { useUserSlippage } from '@pancakeswap/utils/user'
import { memo } from 'react'
import { styled } from 'styled-components'

import SettingsModal from '../../../../components/EMenu/GlobalSettings/SettingsModal'
import { SettingsMode } from '../../../../components/EMenu/GlobalSettings/types'
import { useIsWrapping } from '../hooks'

interface Props {
  showSlippage?: boolean
  priceLoading?: boolean
  price?: Price<Currency, Currency>
}

const Divider = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 1px;
  margin: 8px 0;
`

export const PricingAndSlippage = memo(function PricingAndSlippage({
  priceLoading,
  price,
  showSlippage = true,
}: Props) {
  const { t } = useTranslation()
  const [allowedSlippage] = useUserSlippage()
  const isWrapping = useIsWrapping()
  const [onPresentSettingsModal] = useModal(<SettingsModal mode={SettingsMode.SWAP_LIQUIDITY} />)

  if (isWrapping) {
    return null
  }

  const priceNode = price ? (
    <>
      <Divider />
      <SwapUI.InfoLabel>{t('Price')}</SwapUI.InfoLabel>
      <SwapUI.TradePrice price={price} loading={priceLoading} />
    </>
  ) : null

  return (
    <SwapUI.Info
      price={priceNode}
      allowedSlippage={showSlippage ? allowedSlippage : undefined}
      onSlippageClick={onPresentSettingsModal}
    />
  )
})
