import { useState } from 'react'
import Image from 'next/image'
import { styled } from 'styled-components'
import { Flex, Grid, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import Page from 'views/Page'
import { displayNumber } from 'utils/eldenHelper'
import EPageHeader from 'components/EPageHeader'
import EBox from 'components/EBox'
import EButton from 'components/EButton'
import AllocateCard from './components/AllocateCard'
import InstructionCard from './components/InstructionCard'
import { useUserAllocationData } from './hooks/useUserAllocationData'
import { useLaunchpadData } from './hooks/useLaunchpadData'

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
  text-align: center;
  gap: 2px;
`

const RewardLabel = styled.label`
  font-size: 14px;
  color: #29f069;
  font-weight: 300;
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

const HorDivider = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  height: 40px;
  margin: 0 10px;
  width: 1px;
`

const Launchpad = () => {
  const userAllocationData = useUserAllocationData()
  const launchpadData = useLaunchpadData()
  const { isMobile, isTablet } = useMatchBreakpoints()

  const refetchData = () => {
    launchpadData.refetchContracts()
    userAllocationData.refetchContracts()
  }

  return (
    <Page>
      <EBox style={{ maxWidth: '100%' }}>
        <Flex
          flexDirection="column"
          maxWidth={900}
          width="100%"
          height="100%"
          position="relative"
          alignItems="center"
          style={{ gap: 16 }}
        >
          {/* TIGER<EPageHeader pageName="launchpad"> */}
          <Text fontSize="20px" style={{ width: '100%', textAlign: 'left' }}>
            Launchpad
          </Text>
          <Instruction>
            Allocate sGGTORO here to get perks and benefits from every sale happening on Ggtoro's launchpad.
          </Instruction>
          {/* </EPageHeader> */}

          <Flex flexDirection="column" style={{ gap: '10px' }}>
            <Grid gridTemplateColumns={isTablet || isMobile ? '1fr' : '1fr 1fr'} style={{ gap: '10px' }}>
              <EBox style={{ height: '100%' }}>
                <Flex flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                  <Flex style={{ gap: '10px' }} alignItems="center" justifyContent="flex-start">
                    <SpinnerWrapper>
                      <SpinnerInner>
                        <Image src="/efi/rocket.svg" width={24} height={24} alt="icon" />
                      </SpinnerInner>
                    </SpinnerWrapper>
                    <Text>Allocations</Text>
                  </Flex>
                  <Flex flexDirection="column" justifyContent="center" style={{ height: '100%' }}>
                    <Grid gridTemplateColumns="1fr 0.1fr 1fr" style={{ rowGap: '26px' }}>
                      <RewardCard>
                        <RewardLabel>Total Allocations</RewardLabel>
                        <RewardValue>{displayNumber(launchpadData.totalAllocated)} sGGToro</RewardValue>
                      </RewardCard>
                      <HorDivider />
                      <RewardCard>
                        <RewardLabel>Deallocation fee</RewardLabel>
                        <RewardValue>{launchpadData.deAllocationFee}%</RewardValue>
                      </RewardCard>
                      <RewardCard>
                        <RewardLabel>Deallocation Cooldown</RewardLabel>
                        <RewardValue>{Math.floor(launchpadData.deAllocationCooldown / 24 / 3600)} Days</RewardValue>
                      </RewardCard>
                    </Grid>
                  </Flex>
                </Flex>
              </EBox>
              <AllocateCard userData={userAllocationData} launchpadData={launchpadData} onRefetchData={refetchData} />
            </Grid>
            <InstructionCard />
          </Flex>
        </Flex>
      </EBox>
    </Page>
  )
}

export default Launchpad
