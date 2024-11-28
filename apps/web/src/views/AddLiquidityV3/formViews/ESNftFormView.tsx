import {
  AutoColumn,
  Button,
  Text,
  Box,
  BunnyKnownPlaceholder,
  DynamicSection,
  Message,
  Flex,
  MessageText,
  ScanLink,
  LinkExternal,
  EChartXIcon,
} from '@pancakeswap/uikit'
import Image from 'next/image'
import { ChainLinkSupportChains } from 'state/info/constant'
import { useIsExpertMode } from '@pancakeswap/utils/user'
import { useTranslation } from '@pancakeswap/localization'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { Percent, Pair } from '@pancakeswap/sdk'

import { CommitButton } from 'components/CommitButton'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { Field } from 'state/mint/actions'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { Bound } from 'config/constants/types'
import { ESNftLPChildrenProps } from 'views/AddLiquidity/AddESNftLiquidity'
import { logGTMClickAddLiquidityEvent } from 'utils/customGTMEventTracking'
import { CommonBasesType } from 'components/SearchModal/types'
import EButton from 'components/EButton'
import { getBlockExploreLink } from 'utils'
import { useActiveChainId } from 'hooks/useActiveChainId'

import ApproveLiquidityTokens from 'views/AddLiquidityV3/components/ApproveLiquidityTokens'
import { InfoBox } from '@pancakeswap/widgets-internal'
import { HideMedium, MediumOnly, RightContainer } from './V3FormView'
import RangeSelector from './V3FormView/components/RangeSelector'

export default function ESNftFormView({
  formattedAmounts,
  addIsUnsupported,
  addIsWarning,
  shouldShowApprovalGroup,
  approveACallback,
  revokeACallback,
  currentAllowanceA,
  approvalA,
  approvalB,
  approveBCallback,
  revokeBCallback,
  currentAllowanceB,
  showFieldBApproval,
  showFieldAApproval,
  currencies,
  buttonDisabled,
  onAdd,
  onCreateNftPool,
  onPresentAddLiquidityModal,
  errorText,
  onFieldAInput,
  onFieldBInput,
  maxAmounts,
  isOneWeiAttack,
  pair,
  nftPool,
  createNftDisabled,
}: ESNftLPChildrenProps) {
  const mockFn = useCallback(() => undefined, [])

  const { chainId } = useActiveChainId()
  const { account, isWrongNetwork } = useActiveWeb3React()
  const { t } = useTranslation()
  const expertMode = useIsExpertMode()
  const pairExplorerLink = useMemo(
    () => pair && getBlockExploreLink(Pair.getAddress(pair.token0, pair.token1), 'address', chainId),
    [pair, chainId],
  )

  let buttons: ReactNode = null
  if (addIsUnsupported || addIsWarning) {
    buttons = (
      <Button disabled mb="4px">
        {t('Unsupported Asset')}
      </Button>
    )
  } else if (!account) {
    buttons = <ConnectWalletButton width="100%" />
  } else if (isWrongNetwork) {
    buttons = <CommitButton />
  } else {
    buttons = (
      <AutoColumn gap="md">
        <ApproveLiquidityTokens
          approvalA={approvalA}
          approvalB={approvalB}
          showFieldAApproval={showFieldAApproval}
          showFieldBApproval={showFieldBApproval}
          approveACallback={approveACallback}
          approveBCallback={approveBCallback}
          revokeACallback={revokeACallback}
          revokeBCallback={revokeBCallback}
          currencies={currencies}
          currentAllowanceA={currentAllowanceA}
          currentAllowanceB={currentAllowanceB}
          shouldShowApprovalGroup={shouldShowApprovalGroup}
        />
        {isOneWeiAttack ? (
          <Message variant="warning">
            <Flex flexDirection="column">
              <MessageText>
                {t(
                  'Adding liquidity to this V2 pair is currently not available. Please follow the instructions to resolve it using blockchain explorer.',
                )}
              </MessageText>
              <ScanLink
                useBscCoinFallback={ChainLinkSupportChains.includes(chainId)}
                href={pairExplorerLink}
                mt="0.25rem"
              >
                {t('View pool on explorer')}
              </ScanLink>
            </Flex>
          </Message>
        ) : null}
        <CommitButton
          variant={buttonDisabled ? 'danger' : 'primary'}
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            expertMode ? onAdd() : onPresentAddLiquidityModal()
            logGTMClickAddLiquidityEvent()
          }}
          disabled={buttonDisabled}
        >
          {errorText || t('Add')}
        </CommitButton>
      </AutoColumn>
    )
  }

  return (
    <>
      <AutoColumn>
        <Text mb="8px" fontSize="15px" fontWeight={200} color="secondary">
          {t('Deposit Amounts')}
        </Text>

        <CurrencyInputPanel
          maxAmount={maxAmounts[Field.CURRENCY_A]}
          showUSDPrice
          onMax={() => {
            onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
          }}
          onPercentInput={(percent) => {
            if (maxAmounts[Field.CURRENCY_A]) {
              onFieldAInput(maxAmounts[Field.CURRENCY_A]?.multiply(new Percent(percent, 100)).toExact() ?? '')
            }
          }}
          disableCurrencySelect
          value={formattedAmounts[Field.CURRENCY_A] ?? '0'}
          onUserInput={onFieldAInput}
          showQuickInputButton
          showMaxButton
          currency={currencies[Field.CURRENCY_A]}
          id="add-liquidity-input-tokena"
          showCommonBases
          commonBasesType={CommonBasesType.LIQUIDITY}
        />
        <Box height="32px" margin="-10px auto">
          <Image src="/efi/icons/plus.svg" width={32} height={32} alt="plus" />
        </Box>
        <CurrencyInputPanel
          showUSDPrice
          onPercentInput={(percent) => {
            if (maxAmounts[Field.CURRENCY_B]) {
              onFieldBInput(maxAmounts[Field.CURRENCY_B]?.multiply(new Percent(percent, 100)).toExact() ?? '')
            }
          }}
          onMax={() => {
            onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
          }}
          maxAmount={maxAmounts[Field.CURRENCY_B]}
          disableCurrencySelect
          value={formattedAmounts[Field.CURRENCY_B] ?? '0'}
          onUserInput={onFieldBInput}
          showQuickInputButton
          showMaxButton
          currency={currencies[Field.CURRENCY_B]}
          id="add-liquidity-input-tokenb"
          showCommonBases
          commonBasesType={CommonBasesType.LIQUIDITY}
        />

        <Box mt="12px">
          {nftPool && buttons}
          {!nftPool && (
            <EButton handleClick={onCreateNftPool} disabled={createNftDisabled} style={{ width: '100%' }}>
              Initialize
            </EButton>
          )}
        </Box>
      </AutoColumn>

      <RightContainer>
        <AutoColumn pt="12px" gap="12px">
          <Text fontSize="15px" fontWeight={200} color="secondary">
            {t('Range Visualizer')}
          </Text>
          <DynamicSection disabled overflow="hidden">
            <RangeSelector
              getDecrementLower={mockFn}
              getIncrementLower={mockFn}
              getDecrementUpper={mockFn}
              getIncrementUpper={mockFn}
              onLeftRangeInput={mockFn}
              onRightRangeInput={mockFn}
              currencyA={currencies[Field.CURRENCY_A]}
              currencyB={currencies[Field.CURRENCY_B]}
              feeAmount={0}
              ticksAtLimit={{
                [Bound.LOWER]: false,
                [Bound.UPPER]: false,
              }}
            />
          </DynamicSection>
          <InfoBox message={t('Your position will appear here.')} icon={<EChartXIcon width="140px" height="140px" />} />
        </AutoColumn>
      </RightContainer>
    </>
  )
}
