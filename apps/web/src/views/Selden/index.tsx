import { useState } from 'react'
import { styled } from 'styled-components'
import { Flex, Grid, Text, useToast } from '@pancakeswap/uikit'
import Page from 'views/Page'
import EBox from 'components/EBox'
import { displayNumber } from 'utils/eldenHelper'
import SeldenCard from './components/SeldenCard'
import ProtocolCard from './components/ProtocolCard'
import GetSeldenCard from './components/GetSeldenCard'
import RedeemCard from './components/RedeemCard'
import { useDashboardData } from './hooks/useDashboardData'
import VestListCard from './components/VestListCard'

const Instruction = styled.p`
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 300;
  color: gray;
`
const SeldenCardGrid = styled(Grid)`
  gap: 12px;
  flex-grow: 1;
  grid-template-columns: repeat(4, minmax(250px, 1fr));

  @media screen and (max-width: 1320px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, minmax(80vw, 1fr));
  }
`
const ProtocolCardGrid = styled(Grid)`
  gap: 12px;
  flex-grow: 1;
  grid-template-columns: repeat(3, minmax(250px, 1fr));

  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(1, minmax(250px, 1fr));
  }
`
const BottomCardGrid = styled(Grid)`
  flex-grow: 1;
  gap: 12px;
  margin-top: 24px;
  grid-template-columns: repeat(3, minmax(250px, 1fr));

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(1, minmax(250px, 1fr));
  }
`

const Selden = () => {
  const { toastError, toastSuccess } = useToast()
  const data = useDashboardData()

  const [refresh, setRefresh] = useState(false)

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
          {/* TIGER<EPageHeader pageName="selden"> */}
          <Text fontSize="20px" style={{ width: '100%', textAlign: 'left' }}>
            Dashboard
          </Text>
          <Instruction>
            Convert your GGTORO, redeem your sGGTORO and manage your sGGTORO plugins allocations.
          </Instruction>
          {/* </EPageHeader> */}

          <Flex marginTop={24} flexWrap="wrap" justifyContent="center" alignItems="center">
            <SeldenCardGrid>
              <SeldenCard
                icon="/efi/wallet.svg"
                title="Total sGGTORO"
                value={displayNumber(data.sEldenWalletBalance + data.allocation + data.redeemingBalance)}
              />
              <SeldenCard
                icon="/efi/coin.svg"
                title="Avaliable sGGTORO"
                value={displayNumber(data.sEldenWalletBalance)}
              />
              <SeldenCard icon="/efi/allocated.svg" title="Allocated sGGTORO" value={displayNumber(data.allocation)} />
              <SeldenCard icon="/efi/gift.svg" title="Redeeming sGGTORO" value={displayNumber(data.redeemingBalance)} />
            </SeldenCardGrid>
          </Flex>

          <ProtocolCardGrid>
            <ProtocolCard
              title="Dividends"
              icon="/efi/dividen.svg"
              content="Earn real yield from protocol earnings by staking your sGGTORO here."
              href="/sggtoro/dividends"
              userAllocation={data.dividensAllocation}
              protocolAllocation={data.dividensProtocolAllocation}
              deAllocationFee={data.dividensDeAllocationFee}
            />
            <ProtocolCard
              title="Yield booster"
              icon="/efi/yield.svg"
              content={<>Boost your staking yields by up to 100% by adding sGGTORO to any bligible position.</>}
              href="/sggtoro/booster"
              userAllocation={data.boosterAllocation}
              protocolAllocation={data.boosterProtocolAllocation}
              deAllocationFee={data.boosterDeAllocationFee}
            />
            <ProtocolCard
              title="Launchpad"
              icon="/efi/launchpad.svg"
              content="Get perks and benefits from every project on Ggtoro's launchpad by staking your sGGTORO here."
              href="/sggtoro/launchpad"
              userAllocation={data.launchpadAllocation}
              protocolAllocation={data.launchpadProtocolAllocation}
              deAllocationFee={data.launchpadDeAllocationFee}
            />
          </ProtocolCardGrid>

          <BottomCardGrid>
            <GetSeldenCard onRefetchData={data.refetchContracts} />
            <RedeemCard setRefresh={setRefresh} onRefetchData={data.refetchContracts} />
            <VestListCard onRefetchData={data.refetchContracts} refresh={refresh} setRefresh={setRefresh} />
          </BottomCardGrid>
        </Flex>
      </EBox>
    </Page>
  )
}

export default Selden
