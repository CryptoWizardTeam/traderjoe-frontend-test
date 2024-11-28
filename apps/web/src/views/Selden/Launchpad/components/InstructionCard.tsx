import { Flex, Grid, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import EBox from 'components/EBox'
import Button from 'components/EButton'
import { ELDEN_ADDRESS } from 'config/constants/elden'
import { useTokenPriceBaseStableCoin } from 'hooks/useTokenPriceBaseStableCoin'

import styled from 'styled-components'
import { formatAmount } from 'utils/formatCurrencyAmount'

const Title = styled.label`
  font-size: 16px;
  font-weight: 300;
`
const SubTitle = styled.label`
  font-size: 14px;
  color: gray;
  font-weight: 300;
`
const DetailBox = styled(EBox)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 32px;
  p {
    font-size: 13px;
    margin-top: 4px;
  }
`
const DetailCard = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  flex-grow: 1;
  max-width: 200px;
`

const HorDivider = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  height: 40px;
  margin: 0 10px;
  width: 1px;
`

const InstructionCard = (props) => {
  const sEldenPrice = useTokenPriceBaseStableCoin(ELDEN_ADDRESS)
  const { isMobile } = useMatchBreakpoints()

  return (
    <EBox style={{ width: '100%' }}>
      <Flex flexDirection="column" style={{ gap: '5px' }}>
        <Title>Current Project Name</Title>
        <SubTitle>Presale whitelist allocation</SubTitle>
      </Flex>
      <Grid style={{ width: '100%' }}>
        <Flex
          style={{ margin: '30px 0', width: '100%', gap: '10px' }}
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <DetailCard>
            <Text color="app" fontSize={15} fontWeight={300}>
              WL Allocation ratio
            </Text>
            <Text color="secondary" fontSize={15} fontWeight={300}>
              ${formatAmount(sEldenPrice)}/sGGTORO
            </Text>
          </DetailCard>
          {!isMobile && <HorDivider />}
          <DetailCard>
            <Text color="app" fontSize={15} fontWeight={300}>
              Cap / wallet
            </Text>
            <Text color="secondary" fontSize={15} fontWeight={300}>
              (1) $5k (2) $25k
            </Text>
          </DetailCard>
          {!isMobile && <HorDivider />}
          <DetailCard>
            <Text color="app" fontSize={15} fontWeight={300}>
              Snapshot date
            </Text>
            <Text color="secondary" fontSize={15} fontWeight={300}>
              08/26/23 @ 12pm UTC
            </Text>
          </DetailCard>
        </Flex>

        <Flex style={{ width: '100%' }}>
          <div style={{ fontSize: '13px', fontWeight: '300', lineHeight: 1.3 }}>
            <p style={{ color: 'gray' }}>
              The presale will be held across three stages, $750,000 will be raised, with the first two stages only
              accessible by whitelisted participants. In addition to PROJECTNAME's own whitelist, sGGTORO holders who
              allocate to the 'Launchpad' plugin will get{' '}
              <span style={{ color: '#29F069' }}>exclusive whitelist access</span> for a total of $600,000 allocations.
            </p>
            <p style={{ color: 'gray' }}>
              <br />
              <p>
                1. sGGTORO allocators will receive a guaranteed share of those $600,000 allocations during the first
                stage (12h duration), with the whitelisted amount proportional to the total amount of sGGTORO allocated,
                capped to $5k/wallet.
              </p>
              <br />
              <p>
                2. Those allocations will receive a <span style={{ color: '#29F069' }}>5x multiplier bonus</span> during
                the second stage (12h duration), making the sale a pseudo-FCFS for WL users, capped to $25k/wallet.
              </p>
              <br />
              <p>
                3. The last stage (24h duration) will be completely open to the public on a FCFS basis for the remaining
                allocations, if any.
              </p>
              <br />
            </p>

            <p style={{ color: 'gray' }}>
              Since an individuals' whitelist allocation is proportional to the total amount of sGGTORO allocated to the
              plugin, remember that your ratio could change over time as the total allocations vary.
            </p>

            <p style={{ color: 'gray' }}>
              48h after the end of the presale, a LBP will happen on an external platform. Presale and LBP participants
              will be able to claim their tokens simultaneously after the end of the LBP event.
            </p>
          </div>
        </Flex>
      </Grid>
    </EBox>
  )
}

export default InstructionCard
