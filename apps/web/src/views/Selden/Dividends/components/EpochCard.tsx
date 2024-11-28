import { Flex, Text } from '@pancakeswap/uikit'
import EBox from 'components/EBox'
import styled from 'styled-components'
import { displayNumber } from 'utils/eldenHelper'
import EpochTime from './EpochTime'

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Title = styled.label`
  font-size: 18px;
  font-weight: 300;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 12px;
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`
const Countdown = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`
const PoolIcon = styled.div`
  display: flex;
  margin-right: 8px;
  img {
    width: 24px;
    height: 24px;
  }
`
const CardBox = styled(EBox)`
  display: flex;
  font-size: 12px;
  gap: 3px;
`

const EpochCard = (props) => {
  return (
    <CardContent>
      <EBox>
        <Title>Epoch</Title>
        <Grid style={{ marginTop: '10px' }}>
          {props.distributionData &&
            props.distributionData.map((item, index) => {
              return (
                <CardBox key={item.name}>
                  {index === 0 && (
                    <PoolIcon>
                      <img src="https://eldenfi-tokens.netlify.app/images/symbol/selden.png" alt="eth" />
                    </PoolIcon>
                  )}
                  {index === 1 && (
                    <PoolIcon>
                      <img src="https://eldenfi-tokens.netlify.app/images/symbol/eth.png" alt="eth" />
                      <img
                        src="https://eldenfi-tokens.netlify.app/images/symbol/usdt.png"
                        style={{ marginLeft: -4 }}
                        alt="usdc"
                      />
                    </PoolIcon>
                  )}
                  <Flex style={{ gap: 2, width: '100%' }} alignItems="center" justifyContent="space-between">
                    <Text fontWeight={300}>{item.name}</Text>
                    <Text color="secondary">
                      {displayNumber(item.currentDistributionAmount)}
                      <span style={{ color: 'gray' }}>(${displayNumber(item.currentDistributionAmountInUSD)})</span>
                    </Text>
                  </Flex>
                </CardBox>
              )
            })}
        </Grid>
        <Countdown>
          <Text fontSize="15px" fontWeight="300" color="secondary">
            Next epoch will start in
          </Text>
          <EpochTime deadline={props.nextCycleStartTime} />
        </Countdown>
      </EBox>
    </CardContent>
  )
}

export default EpochCard
