import { styled } from 'styled-components'
import { Flex, Grid, Text, useModal, useMatchBreakpoints } from '@pancakeswap/uikit'
import Page from 'views/Page'
import { WETH9 } from '@pancakeswap/sdk'
import Image from 'next/image'
import { useTokenPriceBaseStableCoin } from 'hooks/useTokenPriceBaseStableCoin'
import { ELDEN_ADDRESS } from 'config/constants/elden'
import { useLpPrice } from 'hooks/useLpPirce'
import { displayNumber } from 'utils/eldenHelper'
import { useActiveChainId } from 'hooks/useActiveChainId'
import EPageHeader from 'components/EPageHeader'
import EBox from 'components/EBox'
import EButton from 'components/EButton'
import EpochCard from './components/EpochCard'
import PendingCard from './components/PendingCard'
import AllocateModal from './components/AllocateModal'

import { useUserAllocationData } from './hooks/useUserAllocationData'
import { useDashboardData } from './hooks/useDashboardData'
import { useDistributionData } from './hooks/useDistributionData'
import { usePendingRewardData } from './hooks/usePendingRewardData'
import { distributedTokenInfo } from './config'

const Instruction = styled.p`
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 300;
  color: #6c6b6b;
`

const RewardCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  gap: 2px;
  padding: 0 10px;
`

const RewardLabel = styled.label`
  font-size: 14px;
  color: #29f069;
  font-weight: 300;
`

const RewardLabel2 = styled.label`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 200;
`

const RewardValue = styled.span`
  font-size: 15px;
  font-weight: 300;
`

const RewardGrid = styled(Grid)`
  width: 100%;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  @media screen and (max-width: 1320px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const SpinnerWrapper = styled.div`
  width: 60px;
  height: 60px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(202, 255, 51, 0.05) 0%, rgba(202, 255, 51, 0) 90%);
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SpinnerInner = styled.div`
  width: fit-content;
  padding: 10px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(202, 255, 51, 0.12) 0%, rgba(202, 255, 51, 0) 85%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const HorDivider = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  height: 40px;
  margin: 0 10px;
  width: 1px;
`

const Dividends = () => {
  const { chainId } = useActiveChainId()

  const { lpPrice: ethUsdtLpPrice } = useLpPrice(!chainId ? '' : WETH9[chainId].address, distributedTokenInfo[1].lp)

  const sEldenPrice = useTokenPriceBaseStableCoin(ELDEN_ADDRESS)

  const dashboardData = useDashboardData(sEldenPrice, ethUsdtLpPrice)
  const userAllocationData = useUserAllocationData()
  const { isTablet, isMobile } = useMatchBreakpoints()

  const {
    distributionData,
    nextCycleStartTime,
    refetchContracts: refetchDistributionData,
  } = useDistributionData(sEldenPrice, ethUsdtLpPrice)
  const {
    pendingRewardData,
    totalPendingRewardInUSD,
    refetchContracts: refetchPendingRewardData,
  } = usePendingRewardData(sEldenPrice, ethUsdtLpPrice)

  const refetchData = () => {
    dashboardData.refetchContracts()
    userAllocationData.refetchContracts()
    refetchDistributionData()
    refetchPendingRewardData()
  }

  const [onPresentTransactionsModal] = useModal(
    <AllocateModal data={userAllocationData} dashboardData={dashboardData} onRefetchData={refetchData} />,
  )

  const getDividendsShare = () => {
    if (!userAllocationData || !dashboardData) return 0
    const userValue = userAllocationData.allocated
    const totalValue = dashboardData.protocolAllocation
    if (!totalValue || !userValue) return 0
    return Number(((userValue * 100) / totalValue).toFixed(4))
  }

  return (
    <Page>
      <EBox style={{ maxWidth: '100%' }}>
        <Flex
          flexDirection="column"
          width="100%"
          height="100%"
          position="relative"
          alignItems="center"
          style={{ gap: 16 }}
        >
          {/* TIGER<EPageHeader pageName="dividends"> */}
          <Text fontSize="20px" style={{ width: '100%', textAlign: 'left' }}>
            Dividends
          </Text>
          <Instruction>
            Allocate sGGTORO here to earn a share of protocol earnings in the form of real yield.
          </Instruction>
          {/* </EPageHeader> */}

          <Flex flexDirection="column" style={{ width: '100%', gap: '10px' }}>
            <Grid
              gridTemplateColumns={isTablet || isMobile ? '1fr' : '1fr 1fr'}
              style={{ columnGap: '10px', rowGap: '10px', width: '100%' }}
            >
              <EBox style={{ width: '100%', height: '100%' }}>
                <Flex flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                  <Flex style={{ gap: '10px' }} alignItems="center" justifyContent="flex-start">
                    <SpinnerWrapper>
                      <SpinnerInner>
                        <Image src="/efi/dividen.svg" width={24} height={24} alt="icon" />
                      </SpinnerInner>
                    </SpinnerWrapper>
                    <Text>Info</Text>
                  </Flex>
                  <Flex flexDirection="column" justifyContent="center" style={{ height: '100%' }}>
                    <Grid gridTemplateColumns="1fr 0.1fr 1fr" style={{ rowGap: '26px' }}>
                      <RewardCard>
                        <RewardLabel>Total Allocations</RewardLabel>
                        <RewardValue>
                          {dashboardData ? displayNumber(dashboardData.protocolAllocation) : '-'} sGGTORO
                        </RewardValue>
                      </RewardCard>
                      <HorDivider />
                      <RewardCard>
                        <RewardLabel>APY</RewardLabel>
                        <RewardValue>{dashboardData ? Number(dashboardData.apy.toFixed(2)) : '-'}%</RewardValue>
                      </RewardCard>
                      <RewardCard>
                        <RewardLabel>Current Epoch</RewardLabel>
                        <RewardValue>${dashboardData ? displayNumber(dashboardData.currentEpoch) : '-'}</RewardValue>
                      </RewardCard>
                      <HorDivider />
                      <RewardCard>
                        <RewardLabel>Deallocation Fee</RewardLabel>
                        <RewardValue>{dashboardData ? dashboardData.deAllocationFee : '-'}%</RewardValue>
                      </RewardCard>
                    </Grid>
                  </Flex>
                </Flex>
              </EBox>
              <EBox style={{ width: '100%' }}>
                <Flex style={{ gap: '10px' }} alignItems="center" justifyContent="flex-start">
                  <SpinnerWrapper>
                    <SpinnerInner>
                      <Image src="/efi/allocated.svg" width={24} height={24} alt="icon" />
                    </SpinnerInner>
                  </SpinnerWrapper>
                  <Text>Your Allocations</Text>
                </Flex>
                <Flex marginTop={3} style={{ gap: '10px' }} flexDirection="column">
                  <Flex justifyContent="space-between">
                    <RewardLabel2>Allocated</RewardLabel2>
                    <RewardValue style={{ color: '#29F069' }}>
                      {Number(userAllocationData.allocated.toFixed(4))} sGGTORO
                    </RewardValue>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <RewardLabel2>Dividends share</RewardLabel2>
                    <RewardValue>{getDividendsShare()}%</RewardValue>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <RewardLabel2>Manual allocation</RewardLabel2>
                    <RewardValue>{Number(userAllocationData.manualAllocation.toFixed(4))} sGGTORO</RewardValue>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <RewardLabel2>Redeem allocation</RewardLabel2>
                    <RewardValue>{Number(userAllocationData.redeemAllocation.toFixed(4))} sGGTORO</RewardValue>
                  </Flex>
                  <EButton handleClick={onPresentTransactionsModal} style={{ marginTop: 5 }}>
                    Allocate
                  </EButton>
                </Flex>
              </EBox>
            </Grid>
            <EpochCard distributionData={distributionData} nextCycleStartTime={nextCycleStartTime} />
            <PendingCard
              pendingRewardData={pendingRewardData}
              totalPendingRewardInUSD={totalPendingRewardInUSD}
              onRefetchData={refetchData}
            />
          </Flex>
        </Flex>
      </EBox>
    </Page>
  )
}

export default Dividends
