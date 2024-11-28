import { styled } from 'styled-components'
import { Flex, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import Page from 'views/Page'
import EPageHeader from 'components/EPageHeader'
import EBox from 'components/EBox'
import LaunchpadList from './compnents/LaunchpadList'

const Instruction = styled.p`
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 300;
  color: #6c6b6b;
`

const Launchpads = () => {
  const { isTablet, isDesktop } = useMatchBreakpoints()
  return (
    <Page>
      <EBox style={{ maxWidth: '100%' }}>
        <Flex
          flexDirection="column"
          maxWidth={1024}
          minWidth={isDesktop ? 900 : isTablet ? 600 : 0}
          width="100%"
          height="100%"
          position="relative"
          alignItems="center"
          style={{ gap: 16 }}
        >
          {/* TIGER<EPageHeader pageName="launchpad" /> */}
          <Text fontSize="20px" style={{ width: '100%', textAlign: 'left' }}>
            Launchpad
          </Text>
          <Instruction>
            Allocate sGGToro here to get perks and benefits from every sale happening on GGToro's launchpad
          </Instruction>
          {/* <LaunchpadList /> */}
        </Flex>
      </EBox>
    </Page>
  )
}

export default Launchpads
