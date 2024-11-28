import { styled } from 'styled-components'
import { Box, Flex, Link, Text, InfoIcon, LoginIcon } from '@pancakeswap/uikit'

import Page from 'views/Page'
import EBox from 'components/EBox'
import EButton from 'components/EButton'
import EOutlineButton from 'components/EOutlineButton'
import EPageHeader from 'components/EPageHeader'

const TokenIcon = styled.img`
  width: 32px;
  height: 32px;
  margin: 4px;
`
const ProcessPanel = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr 1fr;
  color: gray;

  & > div {
    flex-direction: column;
    font-size: 13px;

    & > div {
      width: 100%;

      &:last-child {
        padding: 20px 12px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
        justify-content: center;
      }
    }
  }

  @media screen and (max-width: 670px) {
    grid-template-columns: 1fr;
  }
`

const Instruction = styled.p`
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 300;
  color: #6c6b6b;
`

const PageLayout = ({ data, children }) => {
  return (
    <Page>
      <EBox style={{ maxWidth: '100%' }}>
        <Flex
          flexDirection="column"
          maxWidth={1024}
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

          <EBox>
            <Text fontSize={17} fontWeight={300}>
              {data?.title}
            </Text>
            <Box style={{ marginTop: '10px', color: '#ffffff99', flexGrow: 'grow' }}>{data?.description}</Box>
          </EBox>

          <Flex flexDirection="column" alignItems="center" style={{ gap: 12 }}>
            <Link href={data?.officialSiteUrl} style={{ gap: 12, textDecoration: 'none' }} target="_blank">
              <EOutlineButton>Visit Project</EOutlineButton>
            </Link>
            <Flex alignItems="flex-start" style={{ gap: 10 }}>
              <InfoIcon color="gold" />
              <Text fontSize={14} color="gray" fontWeight={300}>
                {data?.warning}
              </Text>
            </Flex>
          </Flex>

          <Box my={12} width="100%">
            {children}
          </Box>

          <EBox style={{ width: '100%', padding: '16px' }}>
            <Text textAlign="left" fontSize={17} fontWeight={300}>
              Understanding the Sale Process
            </Text>
            <Flex flexDirection="column" style={{ gap: 5, marginTop: 30 }}>
              <Text fontSize={15} fontWeight={300}>
                How price is determined
              </Text>
              <Text fontSize={14} fontWeight={200} lineHeight={1.5} style={{ color: '#ffffff99' }}>
                {data?.priceInfo}
              </Text>
            </Flex>
            <Flex flexDirection="column" style={{ gap: 5, marginTop: 20 }}>
              <Text fontSize={15} fontWeight={300}>
                How price is determined
              </Text>
              <Text fontSize={14} fontWeight={200} lineHeight={1.5} style={{ color: '#ffffff99' }}>
                <p color="gray">{data?.stageInfo.title}</p>
                {data?.stageInfo.stages.map((item, index) => {
                  return (
                    <p key={index} style={{ marginBottom: '5px' }}>
                      <span style={{ color: '#29F069' }}>Stage{index + 1}: </span>
                      <span>{item}</span>
                    </p>
                  )
                })}
              </Text>
            </Flex>
            <Flex flexDirection="column" style={{ gap: 5, marginTop: 20 }}>
              <Text fontSize={15} fontWeight={300}>
                How price is determined
              </Text>
              <Text fontSize={14} fontWeight={200} lineHeight={1.5} style={{ color: '#ffffff99' }}>
                {data?.claimInfo}
              </Text>
            </Flex>
          </EBox>
        </Flex>
      </EBox>
    </Page>
  )
}

export default PageLayout
