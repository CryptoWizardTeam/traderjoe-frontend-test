import Image from 'next/image'
import { Box, Flex, Text, Container, LogoIcon, useMatchBreakpoints } from '@pancakeswap/uikit'
import { styled } from 'styled-components'
import Link from 'next/link'

const BoxWrapper = styled(Box)`
  width: 100vw;
  height: calc(100vh - 56px);
  overflow: hidden;
  box-sizing: border-box;
  background: linear-gradient(135deg, #010a01 16.22%, #29f069 177.51%);
`

const BoxInner = styled(Box)`
  width: 100%;
  height: 100%;
  background: url(/efi/home.svg);
  background-size: cover;
  display: flex;
  align-items: center;
`

const LeftBackground = styled(Image)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
`

const StartLink = styled(Link)`
  border-radius: 6px;
  background: linear-gradient(90deg, #e7ec03 -24.18%, #29f069 70.82%);
  color: #032905;
  display: flex;
  width: 100%;
  min-width: 140px;
  height: 44px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
  align-self: center;
  &:hover {
    opacity: 0.65;
  }
`

const HomePage = () => {
  const { isMobile } = useMatchBreakpoints()
  return (
    <BoxWrapper>
      <BoxInner>
        <Container>
          <Flex
            justifyContent="center"
            alignItems="center"
            style={{ position: 'relative', zIndex: 10, height: '100%' }}
          >
            <Flex flexDirection="column" alignItems="center" style={{ gap: 10, height: '100%', margin: 'auto' }}>
              <LogoIcon width="150px" />
              <Text fontSize={26}>
                <span style={{ color: '#29F069', fontSize: 45, fontFamily: 'Plus Jakarta Text 01' }}>GGTORO</span>
              </Text>
              <Text fontSize={isMobile ? 32 : 46} fontWeight={600} textAlign="center">
                Get Access to all
                {isMobile ? ' ' : <br />}
                your Gaming Assets
              </Text>
              <StartLink href="/swap">Get Started</StartLink>
              {/* <Flex flexWrap="wrap" style={{ gap: 15 }} justifyContent="center">
                <Image src="/coins/bitcoin.svg" width={30} height={30} alt="" />
                <Image src="/coins/ethereum.svg" width={30} height={30} alt="" />
                <Image src="/coins/usdt.svg" width={30} height={30} alt="" />
                <Image src="/coins/vector.svg" width={30} height={30} alt="" />
                <Image src="/coins/chainlink.svg" width={30} height={30} alt="" />
                <Image src="/coins/dai.svg" width={30} height={30} alt="" />
                <Image src="/coins/vector.svg" width={30} height={30} alt="" />
              </Flex> */}
            </Flex>
          </Flex>
          <LeftBackground src="/efi/home2.svg" width={800} height={600} alt="" />
        </Container>
      </BoxInner>
    </BoxWrapper>
  )
}

export default HomePage
