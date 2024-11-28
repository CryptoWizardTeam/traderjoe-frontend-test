import { useMemo, memo, useCallback } from 'react'
import { Currency, Pair, Token, Percent, CurrencyAmount } from '@pancakeswap/sdk'
import { Button, Text, useModal, Flex, Box, Loading, Skeleton, AtomBox, ChevronDownIcon } from '@pancakeswap/uikit'
import { NumericalInput, Swap as SwapUI } from '@pancakeswap/widgets-internal'
import { styled } from 'styled-components'
import { safeGetAddress } from 'utils'
import { useTranslation } from '@pancakeswap/localization'
import { formatAmount } from '@pancakeswap/utils/formatFractions'

import { useStablecoinPriceAmount } from 'hooks/useBUSDPrice'
import { formatNumber } from '@pancakeswap/utils/formatBalance'
import { StablePair } from 'views/AddLiquidity/AddStableLiquidity/hooks/useStableLPDerivedMintInfo'

import { useAccount } from 'wagmi'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { FiatLogo } from 'components/Logo/CurrencyLogo'
import EBox from 'components/EBox'
import EBoxSm from 'components/EBoxSm'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0px;
`

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onInputBlur?: () => void
  onPercentInput?: (percent: number) => void
  onMax?: () => void
  showQuickInputButton?: boolean
  showMaxButton: boolean
  maxAmount?: CurrencyAmount<Currency>
  lpPercent?: string
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | StablePair | null
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  commonBasesType?: string
  showSearchInput?: boolean
  beforeButton?: React.ReactNode
  disabled?: boolean
  error?: boolean | string
  showUSDPrice?: boolean
  tokensToShow?: Token[]
  currencyLoading?: boolean
  inputLoading?: boolean
  title?: React.ReactNode
  hideBalanceComp?: boolean
}
const CurrencyInputPanel = memo(function CurrencyInputPanel({
  value,
  onUserInput,
  onInputBlur,
  onPercentInput,
  onMax,
  showQuickInputButton = false,
  showMaxButton,
  maxAmount,
  lpPercent,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  beforeButton,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
  commonBasesType,
  showSearchInput,
  disabled,
  error,
  showUSDPrice,
  tokensToShow,
  currencyLoading,
  inputLoading,
  title,
  hideBalanceComp,
}: CurrencyInputPanelProps) {
  const { address: account } = useAccount()

  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()

  const mode = id
  const token = pair ? pair.liquidityToken : currency?.isToken ? currency : null
  const tokenAddress = token ? safeGetAddress(token.address) : null

  const amountInDollar = useStablecoinPriceAmount(
    showUSDPrice ? currency : undefined,
    Number.isFinite(+value) ? +value : undefined,
    {
      hideIfPriceImpactTooHigh: true,
      enabled: Number.isFinite(+value),
    },
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
      commonBasesType={commonBasesType}
      showSearchInput={showSearchInput}
      tokensToShow={tokensToShow}
      mode={mode}
    />,
  )

  const percentAmount = useMemo(
    () => ({
      25: maxAmount ? maxAmount.multiply(new Percent(25, 100)).toExact() : undefined,
      50: maxAmount ? maxAmount.multiply(new Percent(50, 100)).toExact() : undefined,
      75: maxAmount ? maxAmount.multiply(new Percent(75, 100)).toExact() : undefined,
    }),
    [maxAmount],
  )

  const handleUserInput = useCallback(
    (val: string) => {
      onUserInput(val)
    },
    [onUserInput],
  )

  const onCurrencySelectClick = useCallback(() => {
    if (!disableCurrencySelect) {
      onPresentCurrencyModal()
    }
  }, [onPresentCurrencyModal, disableCurrencySelect])

  const isAtPercentMax = (maxAmount && value === maxAmount.toExact()) || (lpPercent && lpPercent === '100')

  const balance = !hideBalance && !!currency ? formatAmount(selectedCurrencyBalance, 6) : undefined
  return (
    <SwapUI.CurrencyInputPanel
      id={id}
      disabled={disabled}
      error={error as boolean}
      value={value}
      onInputBlur={onInputBlur}
      onUserInput={handleUserInput}
      loading={inputLoading}
      top={
        <EBox style={{ display: 'flex', width: '100%', padding: '10px 20px', alignItems: 'center' }}>
          {title}
          <Flex flexDirection="column" flexGrow={1}>
            <AtomBox
              display="flex"
              flexDirection="row"
              flexWrap="nowrap"
              color="text"
              fontSize="12px"
              lineHeight="16px"
              padding="6px"
            >
              <NumericalInput
                error={Boolean(error)}
                disabled={disabled}
                loading={inputLoading}
                onUserInput={handleUserInput}
                className="token-amount-input"
                value={value}
                align="left"
                onBlur={onInputBlur}
              />
            </AtomBox>
            <InputRow selected={disableCurrencySelect}>
              {account && currency && selectedCurrencyBalance?.greaterThan(0) && !disabled && label !== 'To' && (
                <Flex alignItems="right" justifyContent="right">
                  {maxAmount?.greaterThan(0) && showMaxButton && (
                    <Text
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        onMax?.()
                      }}
                      color="app"
                      mr="12px"
                      fontSize="12px"
                      style={{ cursor: 'pointer ' }}
                    >
                      {t('Max')}
                    </Text>
                  )}
                  {maxAmount?.greaterThan(0) &&
                    showQuickInputButton &&
                    onPercentInput &&
                    [25, 50, 75].map((percent) => {
                      const isAtCurrentPercent =
                        (maxAmount && value !== '0' && value === percentAmount[percent]) ||
                        (lpPercent && lpPercent === percent.toString())

                      return (
                        <Text
                          key={`btn_quickCurrency${percent}`}
                          onClick={() => {
                            onPercentInput(percent)
                          }}
                          mr="12px"
                          fontSize="12px"
                          style={{ cursor: 'pointer ' }}
                        >
                          {percent}%
                        </Text>
                      )
                    })}
                </Flex>
              )}
            </InputRow>
          </Flex>

          <Flex flexDirection="column">
            <EBoxSm
              style={{ alignItems: 'flex-start', width: 120, padding: '2px 10px', cursor: 'pointer' }}
              onClick={onCurrencySelectClick}
            >
              {beforeButton}
              <CurrencySelectButton className="open-currency-select-button" selected={!!currency}>
                <Flex alignItems="center" justifyContent="space-between">
                  {pair ? (
                    <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
                  ) : currency ? (
                    id === 'onramp-input' ? (
                      <FiatLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                    ) : (
                      <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                    )
                  ) : currencyLoading ? (
                    <Skeleton width="24px" height="24px" variant="circle" />
                  ) : null}
                  {currencyLoading ? null : pair ? (
                    <Text id="pair" fontSize={14}>
                      {pair?.token0.symbol}:{pair?.token1.symbol}
                    </Text>
                  ) : (
                    <Text id="pair" fontSize={14}>
                      {(currency && currency.symbol && currency.symbol.length > 10
                        ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                            currency.symbol.length - 5,
                            currency.symbol.length,
                          )}`
                        : currency?.symbol) || t('Select')}
                    </Text>
                  )}
                </Flex>
              </CurrencySelectButton>
              <ChevronDownIcon />
            </EBoxSm>
            <Flex flexDirection="row-reverse" marginTop={1}>
              {!hideBalanceComp && (
                <>
                  <Text
                    color="secondary"
                    fontSize="12px"
                    ellipsis
                    title={
                      !hideBalance && !!currency
                        ? t('Balance: %balance%', { balance: account ? balance ?? t('Loading') : 0 })
                        : ' -'
                    }
                    style={{ display: 'inline' }}
                  >
                    {!hideBalance && !!currency
                      ? (balance?.replace('.', '')?.length || 0) > 12
                        ? balance
                        : t('Balance: %balance%', { balance: account ? balance ?? t('Loading') : 0 })
                      : ' -'}
                  </Text>
                </>
              )}
            </Flex>
          </Flex>
        </EBox>
      }
      bottom={undefined}
    />
  )
})

export default CurrencyInputPanel
