import { Flex, Grid, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { DoubleCurrencyLogo } from '@pancakeswap/widgets-internal'
import { Currency } from '@pancakeswap/sdk'
import EBox from 'components/EBox'
import EText from 'components/EText'
import EEstimateItem from 'components/EEstimateItem'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { displayTime } from 'utils/eldenHelper'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { useCurrency } from 'hooks/Tokens'
import { isEnableToDeposit, isEnableToHarvest, isEnded } from '../helpers'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: 20px;
`
const Card = styled(Grid)`
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`
const CardTitle = styled(Text)`
  display: flex;
  flex-direction: column;
  font-size: 24px;

  @media screen and (max-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;
  }
`
const CardItem = styled(Flex)`
  flex-direction: column;
  gap: 8px;

  > :first-child {
    font-size: 14px;
    color: gray;
  }

  @media screen and (max-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;

    > :last-child {
      text-align: right;
    }
  }
`

const HorDivider = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  height: 46px;
  margin: 0 10px;
  width: 1px;
`

const VerDivider = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  height: 1px;
  margin: 10px -12px;
  width: calc(100% + 24px);
`

const RunePoolInfo = ({ poolData, priceData, apr, averageApr, rewards }) => {
  const [timer, setTimer] = useState(0)
  const currency0 = useCurrency(poolData.token0Address) as Currency
  const currency1 = useCurrency(poolData.token1Address) as Currency
  const { isMobile } = useMatchBreakpoints()

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  const [sumApr, setSumApr] = useState(0)

  useEffect(() => {
    if (!apr) return
    let _apr = 0
    if (apr && apr.esNFTApr) _apr += apr.esNFTApr
    if (apr && apr.apr1) _apr += apr.apr1
    if (apr && apr.apr2) _apr += apr.apr2
    setSumApr(_apr)
  }, [apr])

  return (
    <Container>
      <EBox>
        <Flex flexDirection="column">
          <Flex alignItems="center" style={{ gap: '6px' }}>
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={32} />
            <Flex alignItems="flex-end" style={{ gap: '6px' }}>
              <Text lineHeight={1} fontSize="18px">
                {poolData ? poolData?.pairName : ''}
              </Text>
              <EText style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1 }}>
                {poolData?.isStable ? 'Stable' : 'V2'}
              </EText>
            </Flex>
          </Flex>
          <Flex flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between" mt={4}>
            <Flex width="100%" alignItems="center" flexDirection="column">
              <Text fontSize="14px" color="app">
                APR
              </Text>
              <Text fontSize="15px">{formatAmount(sumApr)}%</Text>
            </Flex>
            {!isMobile && <HorDivider />}
            <Flex width="100%" alignItems="center" flexDirection="column">
              <Text fontSize="14px" color="app">
                TVL
              </Text>
              <Text fontSize="15px">${formatAmount(poolData.totalDepositAmount * priceData.lpPrice)}</Text>
            </Flex>
            {!isMobile && <HorDivider />}
            <Flex width="100%" alignItems="center" flexDirection="column">
              <Text fontSize="14px" color="app">
                Pending Rewards
              </Text>
              <Text fontSize="15px">
                {parseFloat(poolData.rewardsToken0.rewardRemainingAmount).toFixed(2)} {poolData.rewardsToken0.symbol}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </EBox>
      <Grid
        gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'}
        gridTemplateRows={isMobile ? '1fr 1fr 1fr 1fr' : '1fr 1fr'}
        gridGap={2}
      >
        <EBox style={{ minWidth: '280px' }}>
          <Text fontSize="15px" fontWeight={200}>
            Status
          </Text>
          <VerDivider />
          <Flex flexDirection="column" style={{ gap: '4px' }}>
            <EEstimateItem label="Status" value={`${isEnded(poolData.endTime) ? 'Ended' : 'Active'}`} />
            <EEstimateItem label="Duration" value={`${displayTime(poolData.endTime - poolData.startTime)}`} />
            <EEstimateItem
              label="End in"
              value={`${
                poolData.endTime - Math.floor(Date.now() / 1000) - timer < 0
                  ? new Date(poolData.endTime * 1000).toLocaleDateString()
                  : displayTime(poolData.endTime - Math.floor(Date.now() / 1000) - timer)
              }`}
            />
          </Flex>
        </EBox>
        <EBox style={{ minWidth: '280px' }}>
          <Text fontSize="15px" fontWeight={200}>
            Authorizations
          </Text>
          <VerDivider />
          <Flex flexDirection="column" style={{ gap: '4px' }}>
            <EEstimateItem
              label="Deposit"
              value={`${isEnableToDeposit(poolData.endTime, poolData.depositEndTime) ? 'Enabled' : 'Disabled'}`}
            />
            <EEstimateItem
              label="End Time"
              value={`${
                poolData.depositEndTime === 0
                  ? '-'
                  : displayTime(poolData.depositEndTime - Math.floor(Date.now() / 1000) - timer)
              }`}
            />
            <EEstimateItem
              label="Harvest"
              value={`${isEnableToHarvest(poolData.harvestStartTime) ? 'Enabled' : poolData.harvestStartTime}`}
            />
          </Flex>
        </EBox>
        <EBox style={{ minWidth: '280px' }}>
          <Text fontSize="15px" fontWeight={200}>
            Requirements
          </Text>
          <VerDivider />
          <Flex flexDirection="column" style={{ gap: '4px' }}>
            <EEstimateItem
              label="Minimum Amount"
              value={poolData.depositAmountReq === 0 ? '-' : poolData.depositAmountReq}
            />
            <EEstimateItem
              label="Minimum Lock"
              value={poolData.lockDurationReq === 0 ? '-' : displayTime(poolData.lockDurationReq)}
            />
            <EEstimateItem
              label="Locked Until"
              value={poolData.lockEndReq === 0 ? '-' : new Date(poolData.lockEndReq * 1000).toLocaleDateString()}
            />
            <EEstimateItem label="Whitelist" value={poolData.whitelist ? 'Enabled' : '-'} />
          </Flex>
        </EBox>
        <EBox style={{ minWidth: '280px' }}>
          <Text fontSize="15px" fontWeight={200}>
            Staked Positions
          </Text>
          <VerDivider />
          <Flex flexDirection="column" style={{ gap: '4px' }}>
            <EEstimateItem label="Average APR" value={`${averageApr ? `${formatAmount(averageApr)} %` : '-'}`} />
            <EEstimateItem
              label="Total Deposit"
              value={`${formatAmount(poolData.totalDepositAmount)} ${poolData.pairName}`}
            />
            <EEstimateItem
              label="Pending Rewards"
              value={`${formatAmount(rewards.pendingReward1)} ${poolData?.rewardsToken0?.symbol}`}
            />
          </Flex>
        </EBox>
      </Grid>
    </Container>
  )
}

export default RunePoolInfo
