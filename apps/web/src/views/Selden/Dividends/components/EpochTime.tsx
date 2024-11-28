import { useState, useEffect } from 'react'
import { Flex, Text } from '@pancakeswap/uikit'
import EBox from 'components/EBox'
import styled from 'styled-components'

const TimeBox = styled(EBox)`
  width: 38px;
  text-align: center;
`
const EpochTime = ({ deadline = 0 }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const intVal = setInterval(() => {
      const now = new Date().getTime()
      let sTime = parseInt( String((deadline * 1000 - now) / 1000 ))
      if (sTime < 0) {
        sTime = 0
      }
      setTime(sTime)
    }, 1000)
    return () => {
      clearInterval(intVal)
    }
  }, [deadline])

  const seconds = Math.floor(time % 60)
  const minutes = Math.floor((time / 60) % 60)
  const hours = Math.floor((time / (60 * 60)) % 24)
  const days = Math.floor(time / (60 * 60 * 24))

  return (
    <Flex flexDirection="column" style={{ gap: '5px' }}>
      <Flex style={{ gap: '5px', paddingLeft: '5px', paddingRight: '5px' }} alignItems="center">
        <TimeBox>{parseInt(String(days / 10)) % 10}</TimeBox>
        <TimeBox>{parseInt(String(days)) % 10}</TimeBox>
        <Text>:</Text>
        <TimeBox>{parseInt(String(hours / 10)) % 10}</TimeBox>
        <TimeBox>{parseInt(String(hours)) % 10}</TimeBox>
        <Text>:</Text>
        <TimeBox>{parseInt(String(minutes / 10)) % 10}</TimeBox>
        <TimeBox>{parseInt(String(minutes)) % 10}</TimeBox>
        <Text>:</Text>
        <TimeBox>{parseInt(String(seconds / 10)) % 10}</TimeBox>
        <TimeBox>{parseInt(String(seconds)) % 10}</TimeBox>
      </Flex>
      <Flex justifyContent="space-around">
        <Text fontWeight={200} fontSize={13}>
          DAYS
        </Text>
        <Text fontWeight={200} fontSize={13}>
          HRS
        </Text>
        <Text fontWeight={200} fontSize={13}>
          MINS
        </Text>
        <Text fontWeight={200} fontSize={13}>
          SECS
        </Text>
      </Flex>
    </Flex>
  )
}

export default EpochTime
