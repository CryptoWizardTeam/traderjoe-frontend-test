import Image from 'next/image'
import { Flex, Text, useModal } from '@pancakeswap/uikit'
import EButton from 'components/EButton'
import EBox from 'components/EBox'
import styled from 'styled-components'
import { displayTime } from 'utils/eldenHelper'
import { useEffect, useState } from 'react'
import AllocateModal from './AllocateModal'

const RewardLabel2 = styled.label`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 200;
`

const RewardValue = styled.span`
  font-size: 15px;
  font-weight: 300;
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

const AllocateCard = ({ userData, launchpadData, onRefetchData }) => {
  const [onAllocateModal] = useModal(
    <AllocateModal userData={userData} launchpadData={launchpadData} onRefetchData={onRefetchData} />,
  )

  const [countTime, setCountTime] = useState(0)
  const [cooldown, setCooldown] = useState(0)

  const getFormattedPercent = (num, denom) => {
    if (denom <= 0) return 0
    if (num / denom < 0.0001) return <>{'< 0.0001'}</>
    return Number(((num / denom) * 100).toFixed(4))
  }

  useEffect(() => {
    const nowTime = Math.floor(Date.now() / 1000) + countTime
    const leftTime = launchpadData.deAllocationCooldown - nowTime + userData.allocatedTime
    if (leftTime < 0) setCooldown(0)
    else setCooldown(leftTime)
  }, [countTime, launchpadData.deAllocationCooldown, userData.allocatedTime])

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountTime((prev) => prev + 1)
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  return (
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
          <RewardValue style={{ color: '#29F069' }}>{userData.allocated} sGGToro</RewardValue>
        </Flex>
        <Flex justifyContent="space-between">
          <RewardLabel2>Launchpad Share</RewardLabel2>
          <RewardValue>{getFormattedPercent(userData.allocated, launchpadData.totalAllocated)}%</RewardValue>
        </Flex>
        <Flex justifyContent="space-between">
          <RewardLabel2>Deallocation Cooldown</RewardLabel2>
          <RewardValue>{displayTime(cooldown)}</RewardValue>
        </Flex>
        <EButton handleClick={onAllocateModal} style={{ marginTop: 5 }}>
          Allocate
        </EButton>
      </Flex>
    </EBox>
  )
}

export default AllocateCard
