import { AutoColumn, promotedGradient, Text, Skeleton } from '@pancakeswap/uikit'
import { FeeAmount } from '@pancakeswap/v3-sdk'
import { LightTertiaryCard } from 'components/Card'

import { PoolState } from 'hooks/v3/types'
import { useFeeTierDistribution } from 'hooks/v3/useFeeTierDistribution'
import { styled, css } from 'styled-components'

import { FeeTierPercentageBadge } from './FeeTierPercentageBadge'
import { FEE_AMOUNT_DETAIL } from './shared'

const FeeOptionContainer = styled.div<{ active: number }>`
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  height: 100%;
  animation: ${promotedGradient} 4s ease infinite;
  ${({ active }) =>
    active
      ? css`
          border: 1px solid #29f069;
          background: radial-gradient(
            127.56% 175.14% at 98.37% 0.84%,
            rgba(96, 152, 102, 0.07) 0%,
            rgba(75, 109, 85, 0.02) 100%
          ); //${({ theme }) => theme.colors.gradientBold};
        `
      : css`
          background: radial-gradient(
            127.56% 175.14% at 98.37% 0.84%,
            rgba(96, 152, 102, 0.07) 0%,
            rgba(75, 109, 85, 0.02) 100%
          ); //${({ theme }) => theme.colors.gradientBold};
        `}
  padding: 2px;
  &:hover {
    opacity: 0.7;
  }
`

interface FeeOptionProps {
  feeAmount: FeeAmount
  largestUsageFeeTier?: FeeAmount
  active: boolean
  distributions: ReturnType<typeof useFeeTierDistribution>['distributions']
  poolState: PoolState
  onClick: () => void
  isLoading?: boolean
}

export function FeeOption({
  feeAmount,
  active,
  poolState,
  distributions,
  onClick,
  largestUsageFeeTier,
  isLoading,
}: FeeOptionProps) {
  return (
    <FeeOptionContainer active={active ? 1 : 0} onClick={onClick}>
      <LightTertiaryCard active={active} padding={['4px', '4px', '8px']} height="100%">
        <AutoColumn gap="sm" justify="flex-start" height="100%" justifyItems="center">
          <Text textAlign="center">
            {FEE_AMOUNT_DETAIL[feeAmount].label}% {feeAmount === largestUsageFeeTier && '🔥'}
          </Text>
          {isLoading ? (
            <Skeleton width="100%" height={16} />
          ) : distributions ? (
            <FeeTierPercentageBadge distributions={distributions} feeAmount={feeAmount} poolState={poolState} />
          ) : null}
        </AutoColumn>
      </LightTertiaryCard>
    </FeeOptionContainer>
  )
}
