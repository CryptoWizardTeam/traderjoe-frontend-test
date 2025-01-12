import { Text, Flex, Grid, EAlarmClock, ELockIcon, EWhiteList, EDepositIcon, useTooltip } from '@pancakeswap/uikit'
import NextLink from 'next/link'
import { styled } from 'styled-components'
import DoubleCurrencyLogo from 'components/Logo/DoubleLogo'
import { Percent, Currency, ChainId } from '@pancakeswap/sdk'

import { useCurrency } from 'hooks/Tokens'
import { RunePoolDataRow } from 'hooks/useRunePools'
import { CurrencyLogo } from 'components/Logo'
import { useRewards } from 'views/RunePools/hooks/useRewards'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { useEffect, useState } from 'react'
import { useTokenPriceBaseStableCoin } from 'hooks/useTokenPriceBaseStableCoin'
import { ELDEN_ADDRESS } from 'config/constants/elden'
import { useLpPrice } from 'hooks/useLpPirce'
import { useRunePoolApr } from 'hooks/useRunePoolApr'
import { useEsNFTAprs } from 'hooks/useEsNFTAprs'
import { useStableLpPrice } from 'hooks/useStableLpPirce'
import { STABLE_COIN } from '@pancakeswap/tokens'
import { useActiveChainId } from 'hooks/useActiveChainId'

const TableRow = styled(Grid)`
  grid-template-columns: 2fr 0.5fr 1fr 1fr 1fr 1.2fr 1.2fr;
  padding: 8px 4px;
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.01);
  }

  > div {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: 3fr 1fr 1fr 1.2fr 1.2fr;
    .tbl-tvl,
    .tbl-requirements {
      display: none;
    }
  }

  @media screen and (max-width: 680px) {
    grid-template-columns: 2fr 1fr 1fr;
    .tbl-tvl,
    .tbl-incentive,
    .tbl-requirements,
    .tbl-deposit {
      display: none;
    }
  }
`

interface RunePoolCardRowProps {
  poolData: RunePoolDataRow
  onClick?: () => void
}

export const RunePoolCardRow = ({ poolData, onClick }: RunePoolCardRowProps) => {
  const { chainId } = useActiveChainId()
  const currency0 = useCurrency(poolData.token0Address) as Currency
  const currency1 = useCurrency(poolData.token1Address) as Currency
  const currencyReward1 = useCurrency(poolData.rewardsToken0.id) as Currency
  const currencyReward2 = useCurrency(poolData.rewardsToken1.id) as Currency

  const rewardsToken1Price = useTokenPriceBaseStableCoin(poolData?.rewardsToken0.id as string)
  const rewardsToken2Price = useTokenPriceBaseStableCoin(poolData?.rewardsToken1.id as string)
  const eldenPrice = useTokenPriceBaseStableCoin(ELDEN_ADDRESS)
  // const { lpPrice } = useLpPrice(poolData?.token0Address, poolData?.pairAddress as string)

  const { lpPrice: stableLpPrice } = useStableLpPrice(poolData?.pair)
  const { lpPrice: v2LpPrice } = useLpPrice(
    poolData.pair.token0.id === STABLE_COIN[chainId ?? ChainId.BASE_TESTNET].address.toLowerCase()
      ? poolData.pair.token1.id
      : poolData.pair.token0.id,
    poolData?.pairAddress,
  )

  const lpPrice = poolData.pair.router === undefined ? v2LpPrice : stableLpPrice

  const { apr: esNFTApr } = useEsNFTAprs(poolData?.nftPoolAddress, eldenPrice, lpPrice)
  const { apr1, apr2 } = useRunePoolApr(
    poolData.id,
    lpPrice,
    rewardsToken1Price,
    rewardsToken2Price,
    poolData?.rewardsToken0.decimals,
    poolData?.rewardsToken1.decimals,
  )

  const { pendingReward1, pendingReward2 } = useRewards(
    poolData.id,
    poolData.rewardsToken0.decimals,
    poolData.rewardsToken1.decimals,
  )

  const [tvl, setTvl] = useState(0)
  const [apr, setApr] = useState(0)
  const [totalDepositAmount, setTotalDepositAmount] = useState(0)

  const [depositAmountReq, setDepositAmountReq] = useState(false)
  const [lockDurationReq, setLockDurationReq] = useState(false)
  const [lockEndReq, setLockEndReq] = useState(false)
  const [whitelistReq, setWhitelistReq] = useState(false)

  const {
    targetRef: targetRefLock,
    tooltip: tooltipLock,
    tooltipVisible: tooltipVisibleLock,
  } = useTooltip('Lock duration requirement', { placement: 'auto-start', hideTimeout: 0 })
  const {
    targetRef: targetRefMin,
    tooltip: tooltipMin,
    tooltipVisible: tooltipVisibleMin,
  } = useTooltip('Min deposit amount requirement', { placement: 'auto-start', hideTimeout: 0 })
  const {
    targetRef: targetRefEnd,
    tooltip: tooltipEnd,
    tooltipVisible: tooltipVisibleEnd,
  } = useTooltip('Lock end date requirement', { placement: 'auto-start', hideTimeout: 0 })
  const {
    targetRef: targetRefWhite,
    tooltip: tooltipWhite,
    tooltipVisible: tooltipVisibleWhite,
  } = useTooltip('Whitelist requirement', { placement: 'auto-start', hideTimeout: 0 })

  useEffect(() => {
    if (!poolData) return

    setDepositAmountReq(Number(poolData.depositAmountReq) > 0)
    setLockDurationReq(Number(poolData.lockDurationReq) > 0)
    setLockEndReq(Number(poolData.lockEndReq) > 0)
    setWhitelistReq(poolData.whitelist)
    const _totalDeposit =
      poolData.userStakingPositions?.reduce((prev, next) => prev + Number(next.depositedAmount), 0) ?? 0
    setTotalDepositAmount(_totalDeposit * lpPrice)
  }, [poolData, lpPrice])

  useEffect(() => {
    let _apr = 0
    _apr += esNFTApr ?? 0
    _apr += apr1 ?? 0
    _apr += apr2 ?? 0
    setApr(_apr)
  }, [esNFTApr, apr1, apr2])

  useEffect(() => {
    if (!poolData || !poolData.totalDepositAmount || !lpPrice) return
    setTvl(poolData.totalDepositAmount * lpPrice)
  }, [poolData, lpPrice])

  return (
    <NextLink href={`/goodgamepools/${poolData.id}`}>
      <TableRow>
        <Flex alignItems="center" mb="4px" flexWrap="wrap">
          <Flex width={['100%', '100%', 'inherit']} pr="8px">
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />
            <Text ml="8px" fontWeight={300}>
              {poolData.pairName}{' '}
              {poolData.pair.router === undefined ? (
                <span style={{ color: '#29F069', fontSize: '12px' }}>V2</span>
              ) : (
                <span style={{ color: '#29F069', fontSize: '12px' }}>Stable</span>
              )}
            </Text>
          </Flex>
        </Flex>

        <Text className="tbl-tvl" fontSize="14px" color="secondary">
          ${Number(tvl.toFixed(2))}
        </Text>

        <Flex className="tbl-incentive">
          {currencyReward1 && <CurrencyLogo currency={currencyReward1} size="20px" />}
          {currencyReward2 && <CurrencyLogo currency={currencyReward2} size="20px" />}
        </Flex>

        <Text fontSize="14px" color="secondary">
          {Number(apr.toFixed(2))}%
        </Text>

        <Flex className="tbl-requirements" style={{ gap: '8px' }}>
          <Flex ref={targetRefLock}>
            <ELockIcon color={lockDurationReq ? 'gold' : 'gray'} width={16} height={16} />
          </Flex>
          <Flex ref={targetRefEnd}>
            <EAlarmClock color={lockEndReq ? 'gold' : 'gray'} width={16} height={16} />
          </Flex>
          <Flex ref={targetRefMin}>
            <EDepositIcon color={depositAmountReq ? 'gold' : 'gray'} width={16} height={16} mt="2px" />
          </Flex>
          <Flex ref={targetRefWhite}>
            <EWhiteList color={whitelistReq ? 'gold' : 'gray'} width={16} height={16} />
          </Flex>
          {tooltipVisibleLock && tooltipLock}
          {tooltipVisibleEnd && tooltipEnd}
          {tooltipVisibleMin && tooltipMin}
          {tooltipVisibleWhite && tooltipWhite}
        </Flex>

        <Text fontSize="14px" className="tbl-deposit">
          ${formatAmount(totalDepositAmount)}
        </Text>

        <Flex flexDirection={'column'}>
          {pendingReward1 && pendingReward1 > 0 ? (
            <Text fontSize="14px">
              {formatAmount(pendingReward1)} {poolData?.rewardsToken0?.symbol}
            </Text>
          ) : null}
          {pendingReward2 && pendingReward2 > 0 ? (
            <Text fontSize="14px">
              {formatAmount(pendingReward2)} {poolData?.rewardsToken1?.symbol}
            </Text>
          ) : null}
        </Flex>
      </TableRow>
    </NextLink>
  )
}
