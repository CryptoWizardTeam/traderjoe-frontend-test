import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Dots, Flex, Grid, Text, useModal, useMatchBreakpoints } from '@pancakeswap/uikit'
import Page from 'views/Page'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import EButton from 'components/EButton'
import EBox from 'components/EBox'
import EPageHeader from 'components/EPageHeader'
import { ELDEN_ADDRESS } from 'config/constants/elden'
import { useTokenPriceBaseStableCoin } from 'hooks/useTokenPriceBaseStableCoin'
import { useLpPrice } from 'hooks/useLpPirce'
import { useStableLpPrice } from 'hooks/useStableLpPirce'
import useEsNFTListsByAccountAndPool from 'hooks/useEsNFTListsByAccountAndPool'
import useRunePoolStakingPositions from 'hooks/useRunePoolStakingPositions'
import useRunePoolData from 'hooks/useRunePoolData'
import { useRunePoolApr } from 'hooks/useRunePoolApr'
import { useEsNFTAprs } from 'hooks/useEsNFTAprs'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { zeroAddress } from 'viem'

import HarvestModal from './components/HarvestModal'
import DepositModal from './components/DepositModal'
import WithdrawModal from './components/WithdrawModal'
import { useRewards } from './hooks/useRewards'
import RunePoolInfo from './components/RunePoolInfo'
import { isEnableToDeposit, isEnableToHarvest } from './helpers'
import PositionsList from './components/PositionTable'
import RunePoolCard from './components/RunePoolCard'

const EarnInfo = styled(Grid)`
  margin-top: 12px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`
const EarnCard = styled(Flex)`
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 4px 12px;
`

const Instruction = styled.p`
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 300;
  color: gray;
`

const RunePoolDetail = () => {
  const { address: account } = useAccount()
  const { isMobile } = useMatchBreakpoints()
  const router = useRouter()
  const { poolId } = router.query

  const [averageApr, setAverageApr] = useState<number | undefined>(undefined)

  const { poolData, isLoading: isLoadingPoolData } = useRunePoolData(account, poolId as string, 30000)

  const rewardsToken1Price = useTokenPriceBaseStableCoin(poolData?.rewardsToken0.id as string)
  const rewardsToken2Price = useTokenPriceBaseStableCoin(poolData?.rewardsToken1.id as string)
  const eldenPrice = useTokenPriceBaseStableCoin(ELDEN_ADDRESS)

  const { lpPrice: stableLpPrice } = useStableLpPrice(poolData?.pair)
  const { lpPrice: v2LpPrice } = useLpPrice(poolData?.token0Address, poolData?.pairAddress as string)

  const lpPrice = poolData?.pair.router === undefined ? v2LpPrice : stableLpPrice

  const { isLoading: isLoadingEsNFTs, data: esNFTs } = useEsNFTListsByAccountAndPool(
    account,
    poolData?.nftPoolAddress as string,
    30000,
  )

  const { stakingPositions: runePoolStakingPositions, isLoading: isLoadingRunePoolStakingPositions } =
    useRunePoolStakingPositions(account, 30000, true, poolData?.id as string)

  const rewards = useRewards(
    poolData?.id,
    poolData?.rewardsToken0.decimals,
    poolData?.rewardsToken1.decimals,
    esNFTs,
    runePoolStakingPositions,
  )

  const { apr: esNFTApr } = useEsNFTAprs(poolData?.nftPoolAddress, eldenPrice, lpPrice)
  const { apr1, apr2 } = useRunePoolApr(
    poolId,
    lpPrice,
    rewardsToken1Price,
    rewardsToken2Price,
    poolData?.rewardsToken0.decimals,
    poolData?.rewardsToken1.decimals,
  )

  useEffect(() => {
    let _apr = 0
    if (esNFTApr) _apr += esNFTApr
    if (apr1) _apr += apr1
    if (apr2) _apr += apr2
    setAverageApr(_apr)
  }, [esNFTApr, apr1, apr2])

  const [onPresentHarvestModal] = useModal(
    <HarvestModal
      data={poolData}
      esNFTs={esNFTs}
      rewards={rewards}
      priceData={{ rewardsToken1Price, rewardsToken2Price, lpPrice, eldenPrice }}
    />,
  )

  const [onPresentDepositModal] = useModal(
    <DepositModal
      data={poolData}
      esNFTStakingPositions={esNFTs}
      rewards={rewards}
      priceData={{ rewardsToken1Price, rewardsToken2Price, lpPrice, eldenPrice }}
    />,
  )
  const [onPresentWithdrawModal] = useModal(
    <WithdrawModal
      data={poolData}
      runePoolStakingPositions={runePoolStakingPositions}
      rewards={rewards}
      priceData={{ rewardsToken1Price, rewardsToken2Price, lpPrice, eldenPrice }}
    />,
  )

  return (
    <Page>
      <EBox style={{ maxWidth: isMobile ? '100%' : '600px' }}>
        <Flex
          flexDirection="column"
          maxWidth={1024}
          width="100%"
          height="100%"
          position="relative"
          alignItems="center"
          style={{ gap: 16 }}
        >
          {/* TIGER<EPageHeader pageName="runepools" /> */}
          <Text fontSize="20px" style={{ width: '100%', textAlign: 'left' }}>
            GoodGame Pools
          </Text>
          <Instruction>
            Deposit your staked positions into a compatible GoodGame pool and earn additional rewards.
          </Instruction>
          {!isLoadingPoolData && poolData ? (
            <Flex style={{ gap: '20px' }} flexDirection="column" width="100%">
              <RunePoolInfo
                poolData={poolData}
                priceData={{ rewardsToken1Price, rewardsToken2Price, lpPrice }}
                apr={{ esNFTApr, apr1, apr2 }}
                rewards={rewards}
                averageApr={averageApr}
              />

              <Flex flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between" style={{ gap: '8px' }}>
                <EButton handleClick={onPresentHarvestModal} disabled={!isEnableToHarvest(poolData.harvestStartTime)}>
                  Harvest
                </EButton>
                <EButton
                  handleClick={onPresentWithdrawModal}
                  disabled={!runePoolStakingPositions || runePoolStakingPositions.length <= 0}
                >
                  {isLoadingRunePoolStakingPositions ? <Dots>Withdraw</Dots> : <>Withdraw</>}
                </EButton>
                <EButton
                  handleClick={onPresentDepositModal}
                  disabled={
                    !isEnableToDeposit(poolData.endTime, poolData.depositEndTime) || !esNFTs || esNFTs.length <= 0
                  }
                >
                  {isLoadingEsNFTs ? <Dots>Deposit</Dots> : <>Deposit</>}
                </EButton>
              </Flex>

              {runePoolStakingPositions ? (
                <PositionsList>
                  {runePoolStakingPositions.map((runePosition) => (
                    <RunePoolCard
                      key={`${runePosition.id}`}
                      runeStakingPosition={runePosition}
                      runePoolApr={{ apr1, apr2 }}
                      ethPrice={runePosition.ethPrice}
                    />
                  ))}
                  {/* <EsNFTCard
                    key={item.nftId}
                    esNft={item.nftStakingPosition}
                    ethPrice={0}
                    runePoolApr={{ apr1, apr2 }}
                  /> */}
                </PositionsList>
              ) : null}
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
      </EBox>
    </Page>
  )
}

export default RunePoolDetail
