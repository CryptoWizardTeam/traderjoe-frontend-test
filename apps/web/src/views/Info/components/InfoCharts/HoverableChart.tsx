import { Flex, Box, Text, Skeleton } from '@pancakeswap/uikit'
import dayjs from 'dayjs'
import { useState, useMemo, memo, useEffect } from 'react'
import { ChartEntry, ProtocolData } from 'state/info/types'
import { formatAmount } from 'utils/formatInfoNumbers'
import EText from 'components/EText'
import BarChart from './BarChart'
import LineChart from './LineChart'

interface HoverableChartProps {
  chartData: ChartEntry[] | undefined
  protocolData: ProtocolData | undefined
  currentDate: string
  valueProperty: string
  title: string
  ChartComponent: typeof BarChart | typeof LineChart
}

const HoverableChart = ({
  chartData,
  protocolData,
  currentDate,
  valueProperty,
  title,
  ChartComponent,
}: HoverableChartProps) => {
  const [hover, setHover] = useState<number | undefined>()
  const [dateHover, setDateHover] = useState<string | undefined>()

  // Getting latest data to display on top of chart when not hovered
  useEffect(() => {
    setHover(undefined)
  }, [protocolData])

  useEffect(() => {
    if (typeof hover === 'undefined' && protocolData) {
      setHover(protocolData[valueProperty])
    }
  }, [protocolData, hover, valueProperty])

  const formattedData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: dayjs.unix(day.date).toDate(),
          value: day[valueProperty],
        }
      })
    }
    return []
  }, [chartData, valueProperty])

  return (
    <Box p={['16px', '16px', '24px']}>
      <Flex flexDirection="column" style={{ gap: 10 }}>
        <Text fontSize={16} color="secondary">
          {title}
        </Text>
        {Number(hover) > -1 ? ( // sometimes data is 0
          <EText style={{ fontSize: 24, fontWeight: 600 }}>${formatAmount(hover)}</EText>
        ) : (
          <Skeleton width="128px" height="36px" />
        )}
        <Text fontSize={14} fontWeight={300}>
          {dateHover ?? currentDate}
        </Text>
        <Box height="250px">
          <ChartComponent data={formattedData} setHoverValue={setHover} setHoverDate={setDateHover} />
        </Box>
      </Flex>
    </Box>
  )
}

export default memo(HoverableChart)
