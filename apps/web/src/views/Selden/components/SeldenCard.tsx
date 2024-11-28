import { EChartIcon, EEarnIcon, Flex } from '@pancakeswap/uikit'
import Image from 'next/image'
import EBox from 'components/EBox'
import styled from 'styled-components'

const Inner = styled.div`
  padding: 0 8px;
  display: flex;
  gap: 6px;
  align-items: center;
`

const RewardTitle = styled.p`
  color: white;
  font-size: 16px;
  margin-bottom: 2px;
  font-weight: 300;
`

const RewardValue = styled.p`
  color: white;
  font-size: 18px;
`

const SpinnerWrapper = styled.div`
  width: 45px;
  height: 45px;
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

const SeldenCard = (props: any) => {
  return (
    <EBox>
      <Flex flexDirection={'column'} style={{ gap: '10px' }}>
        <Flex alignItems="center" justifyContent="start" style={{ gap: '10px' }}>
          <SpinnerWrapper>
            <SpinnerInner>
              <Image src={props.icon} width={24} height={24} alt="icon" />
            </SpinnerInner>
          </SpinnerWrapper>
          <RewardTitle>{props.title}</RewardTitle>
        </Flex>
        <RewardValue>{props.value}</RewardValue>
      </Flex>
    </EBox>
  )
}

export default SeldenCard
