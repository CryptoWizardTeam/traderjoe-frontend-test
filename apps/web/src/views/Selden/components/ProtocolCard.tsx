import { Flex, Grid, NextLinkFromReactRouter } from '@pancakeswap/uikit'
import EBox from 'components/EBox'
import EBoxSm from 'components/EBoxSm'
import Image from 'next/image'

import styled from 'styled-components'
import { displayNumber } from 'utils/eldenHelper'

const ProtocolName = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
  font-weight: 300;
`

const ProtocolDetail = styled.p`
  font-size: 14px;
  color: gray;
  font-weight: 300;
  line-height: 1.2;
`

const RewardTitle = styled.p`
  color: gray;
  font-size: 15px;
  margin-bottom: 8px;
  font-weight: 300;
`

const RewardValue = styled.p`
  color: white;
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
  padding: 7px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(202, 255, 51, 0.12) 0%, rgba(202, 255, 51, 0) 85%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const LinkComponent = (linkProps) => {
  return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
}

const ProtocolCard = (props: any) => {
  return (
    <LinkComponent href={props.href} style={{ display: 'flex' }}>
      <EBox>
        <Flex style={{ gap: '10px' }}>
          <SpinnerWrapper>
            <SpinnerInner>
              <Image src={props.icon} width={30} height={30} alt="icon" />
            </SpinnerInner>
          </SpinnerWrapper>
          <Flex flexDirection="column" flexGrow={1} style={{ maxWidth: '240px' }}>
            <ProtocolName>{props.title}</ProtocolName>
            <ProtocolDetail>{props.content}</ProtocolDetail>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" marginTop={4}>
          <RewardTitle>Allocation</RewardTitle>
          <RewardValue>{displayNumber(props.userAllocation)} sGGToro</RewardValue>
        </Flex>
        <Flex justifyContent="space-between">
          <RewardTitle>Total allocation</RewardTitle>
          <RewardValue>{displayNumber(props.protocolAllocation)} sGGToro</RewardValue>
        </Flex>
        <Flex justifyContent="space-between">
          <RewardTitle>Deallocation fee</RewardTitle>
          <RewardValue>{props.deAllocationFee}%</RewardValue>
        </Flex>
      </EBox>
    </LinkComponent>
  )
}

export default ProtocolCard
