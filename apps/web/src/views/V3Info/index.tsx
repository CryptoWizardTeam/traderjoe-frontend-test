import { useTranslation } from '@pancakeswap/localization'
import { styled } from 'styled-components'
import { AutoColumn, Box, Button, Card, Flex, Heading, Text } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import dayjs from 'dayjs'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useTheme from 'hooks/useTheme'
import { useEffect, useMemo, useState } from 'react'
import isUndefinedOrNull from '@pancakeswap/utils/isUndefinedOrNull'
import EBox from 'components/EBox'
import EButtonSm from 'components/EButtonSm'
import EText from 'components/EText'
import BarChart from './components/BarChart/alt'
import { DarkGreyCard } from './components/Card'
import LineChart from './components/LineChart/alt'
import Percent from './components/Percent'
import PoolTable from './components/PoolTable'
import { RowBetween, RowFixed } from './components/Row'
import TokenTable from './components/TokenTable'
import TransactionsTable from './components/TransactionsTable'
import { ChartCardsContainer, MonoSpace, ProtocolWrapper } from './components/shared'
import {
  useProtocolChartData,
  useProtocolData,
  useProtocolTransactionData,
  useTopPoolsData,
  useTopTokensData,
} from './hooks'
import { useTransformedVolumeData } from './hooks/chart'
import { VolumeWindow } from './types'
import { getPercentChange } from './utils/data'
import { unixToDate } from './utils/date'
import { formatDollarAmount } from './utils/numbers'

const TabButton = styled(EButtonSm)`
  width: 120px;
  color: white;
  &.active {
    border: 1px solid rgb(41, 240, 105);
    background: rgb(37, 59, 56);
  }
`

const CPercent = styled(Percent)`
  color: white;
`

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { theme } = useTheme()

  const protocolData = useProtocolData()
  const transactionData = useProtocolTransactionData()
  const topTokensData = useTopTokensData()
  const topPoolsData = useTopPoolsData()
  const chartData = useProtocolChartData()
  const { chainId } = useActiveChainId()
  const { t } = useTranslation()
  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [leftLabel, setLeftLabel] = useState<string | undefined>()
  const [rightLabel, setRightLabel] = useState<string | undefined>()
  const now = dayjs()

  const [listType, setListType] = useState(0)

  useEffect(() => {
    setLiquidityHover(undefined)
    setVolumeHover(undefined)
  }, [chainId])

  useEffect(() => {
    if (liquidityHover === undefined && protocolData) {
      setLiquidityHover(protocolData.tvlUSD)
    }
  }, [liquidityHover, protocolData])

  const formattedTvlData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: unixToDate(day.date),
          value: day.tvlUSD,
        }
      })
    }
    return []
  }, [chartData])

  const formattedVolumeData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: unixToDate(day.date),
          value: day.volumeUSD,
        }
      })
    }
    return []
  }, [chartData])

  const weeklyVolumeData = useTransformedVolumeData(chartData, 'week')
  const monthlyVolumeData = useTransformedVolumeData(chartData, 'month')
  const [volumeWindow, setVolumeWindow] = useState(VolumeWindow.daily)

  const formattedTokens = useMemo(() => {
    if (topTokensData)
      return Object.values(topTokensData)
        .map((d) => d)
        .filter((d) => !isUndefinedOrNull(d))
        .filter((d) => d.tvlUSD > 0)
    return []
  }, [topTokensData])

  const poolDatas = useMemo(() => {
    if (topPoolsData)
      return Object.values(topPoolsData)
        .map((p) => p)
        .filter((p) => !isUndefinedOrNull(p))
    return []
  }, [topPoolsData])

  const tvlValue = useMemo(() => {
    return formatDollarAmount(liquidityHover, 2, true)
  }, [liquidityHover])

  return (
    <AutoColumn gap="12px">
      <ProtocolWrapper>
        <EBox>
          <Flex justifyContent="space-evenly">
            <Flex flexDirection="column">
              <Text color="app" fontSize={15} fontWeight={300}>
                {t('Volume 24H')}
              </Text>
              <Flex>
                <Text fontSize={18} fontWeight={300}>
                  {formatDollarAmount(formattedVolumeData[formattedVolumeData.length - 1]?.value)}
                </Text>
                <CPercent
                  fontSize='18px'
                  fontWeight={300}
                  value={getPercentChange(
                    formattedVolumeData[formattedVolumeData.length - 1]?.value.toString(),
                    formattedVolumeData[formattedVolumeData.length - 2]?.value.toString(),
                  )}
                  wrap
                />
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Text color="app" fontSize={15} fontWeight={300}>
                {t('Fees 24H')}
              </Text>
              <Flex>
                <Text fontSize={18} fontWeight={300}>
                  {formatDollarAmount(protocolData?.feesUSD)}
                </Text>
                <CPercent
                  fontSize='18px'
                  fontWeight={300}
                  value={protocolData?.feeChange}
                  wrap
                />
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Text color="app" fontSize={15} fontWeight={300}>
                {t('TVL')}
              </Text>
              <Flex>
                <Text fontSize={18} fontWeight={300}>
                  {formatDollarAmount(protocolData?.tvlUSD)}
                </Text>
                <CPercent
                  fontSize='18px'
                  fontWeight={300}
                  value={protocolData?.tvlUSDChange}
                  wrap
                />
              </Flex>
            </Flex>
          </Flex>
        </EBox>
      </ProtocolWrapper>
      <ChartCardsContainer>
        <EBox>
          <LineChart
            data={formattedTvlData}
            height={220}
            minHeight={332}
            value={liquidityHover}
            label={leftLabel}
            setValue={setLiquidityHover}
            setLabel={setLeftLabel}
            topLeft={
              <AutoColumn gap="4px">
                <Text fontSize={16} color="secondary">
                  {t('TVL')}
                </Text>
                <EText style={{ fontSize: 24, fontWeight: 600 }}>
                  <MonoSpace>{tvlValue}</MonoSpace>
                </EText>
                <Text fontSize={14} fontWeight={300}>
                  <MonoSpace>{leftLabel ?? now.format('MMM D, YYYY')} (UTC)</MonoSpace>
                </Text>
              </AutoColumn>
            }
          />
        </EBox>
        <EBox>
          <BarChart
            height={200}
            minHeight={332}
            data={
              volumeWindow === VolumeWindow.monthly
                ? monthlyVolumeData
                : volumeWindow === VolumeWindow.weekly
                ? weeklyVolumeData
                : formattedVolumeData
            }
            color="#29f06933"
            setValue={setVolumeHover}
            setLabel={setRightLabel}
            value={volumeHover}
            label={rightLabel}
            activeWindow={volumeWindow}
            topRight={
              <RowFixed style={{ marginLeft: '-40px', marginTop: '8px' }}>
                <Button
                  scale="sm"
                  variant={volumeWindow === VolumeWindow.daily ? 'primary' : 'bubblegum'}
                  onClick={() => setVolumeWindow(VolumeWindow.daily)}
                >
                  D
                </Button>
                <Button
                  scale="sm"
                  variant={volumeWindow === VolumeWindow.weekly ? 'primary' : 'bubblegum'}
                  style={{ marginLeft: '8px' }}
                  onClick={() => setVolumeWindow(VolumeWindow.weekly)}
                >
                  W
                </Button>
                <Button
                  variant={volumeWindow === VolumeWindow.monthly ? 'primary' : 'bubblegum'}
                  scale="sm"
                  style={{ marginLeft: '8px' }}
                  onClick={() => setVolumeWindow(VolumeWindow.monthly)}
                >
                  M
                </Button>
              </RowFixed>
            }
            topLeft={
              <AutoColumn gap="4px">
                <Text fontSize="16px">{t('Volume')}</Text>
                <Text fontSize="32px">
                  <MonoSpace>
                    {volumeHover
                      ? formatDollarAmount(volumeHover)
                      : formatDollarAmount(formattedVolumeData[formattedVolumeData.length - 1]?.value, 2)}
                  </MonoSpace>
                </Text>
                <Text fontSize="12px" height="14px">
                  <MonoSpace>{rightLabel ?? now.format('MMM D, YYYY')} (UTC)</MonoSpace>
                </Text>
              </AutoColumn>
            }
          />
        </EBox>
      </ChartCardsContainer>

      <Flex style={{ gap: 12 }} my={20}>
        <TabButton className={listType === 0 ? 'active' : ''} onClick={() => setListType(0)}>
          Top Tokens
        </TabButton>
        <TabButton className={listType === 1 ? 'active' : ''} onClick={() => setListType(1)}>
          Top Pairs
        </TabButton>
        <TabButton className={listType === 2 ? 'active' : ''} onClick={() => setListType(2)}>
          Transactions
        </TabButton>
      </Flex>

      {listType === 0 && <TokenTable tokenDatas={formattedTokens} />}
      {listType === 1 && <PoolTable poolDatas={poolDatas} />}
      {listType === 2 && <TransactionsTable transactions={transactionData} />}
    </AutoColumn>
  )
}
