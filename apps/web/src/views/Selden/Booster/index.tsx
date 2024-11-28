import { styled } from 'styled-components'
import { Flex, Grid, Text } from '@pancakeswap/uikit'
import Page from 'views/Page'
import EBox from 'components/EBox'
import EPageHeader from 'components/EPageHeader'

import { displayNumber } from 'utils/eldenHelper'
import PositionList from './components/PositionList'
import { useDashboardData } from './hooks/useDashboardData'

const Instruction = styled.p`
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 300;
  color: #6c6b6b;
`
const BoosterGrid = styled(Grid)`
  width: 100%;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 16px;

  @media screen and (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`
const BoosterCard = styled.div`
  padding: 8px 32px;
  display: flex;
  flex-direction: column;
`

const Booster = () => {
  const dashboardData = useDashboardData()

  return (
    <Page>
      <EBox style={{ maxWidth: '100%' }}>
        <Flex
          flexDirection="column"
          width="100%"
          height="100%"
          position="relative"
          alignItems="center"
          style={{ gap: 16 }}
        >
          {/* TIGER<EPageHeader pageName="booster"> */}
          <Text fontSize="20px" style={{ width: '100%', textAlign: 'left' }}>
            Yield Booster
          </Text>
          <Instruction>Allocate sGGTORO here to increase the yield of your staking positions up to +100%.</Instruction>
          {/* </EPageHeader> */}

          <EBox style={{ width: '100%', height: '100%' }}>
            <BoosterGrid>
              <BoosterCard>
                <Text color="app" fontSize="14px">
                  Total allocations
                </Text>
                <Text>{displayNumber(dashboardData.totalAllocation)} sGGTORO</Text>
              </BoosterCard>
              <BoosterCard>
                <Text color="app" fontSize="14px">
                  Your allocation
                </Text>
                <Text>{displayNumber(dashboardData.userAllocation)} sGGTORO</Text>
              </BoosterCard>
              <BoosterCard>
                <Text color="app" fontSize="14px">
                  Deallocation fee
                </Text>
                <Text>{dashboardData.deAllocationFee}%</Text>
              </BoosterCard>
            </BoosterGrid>
          </EBox>
          <PositionList onRefetchData={dashboardData.refetchContracts} />
        </Flex>
      </EBox>
    </Page>
  )
}

export default Booster
