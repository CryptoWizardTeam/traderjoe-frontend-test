import { useTranslation } from '@pancakeswap/localization'
import { Flex, NextLinkFromReactRouter, SubMenuItems, Text } from '@pancakeswap/uikit'
import { useRouter } from 'next/router'
import { useChainNameByQuery, useMultiChainPath } from 'state/info/hooks'
import { styled } from 'styled-components'
import Page from 'views/Page'
import EBox from 'components/EBox'
import EButtonSm from 'components/EButtonSm'
import EPageHeader from 'components/EPageHeader'
import InfoNav from './components/InfoNav'

const NavLink = styled.div`
  width: 150px;
  min-width: 100px;
  text-align: center;
  position: relative;
  padding: 10px;
  color: #ffffff99;
  transition: all 0.2s;
  &:hover,
  &.active {
    color: #ffffff;
  }
  &.active:before {
    content: '';
    border-radius: 50px;
    background: linear-gradient(90deg, #8ee838 0%, #e7ec03 98.09%);
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 3px;
    transition: all 0.2s;
  }
  @media screen and (max-width: 399px) {
    width: 100px;
  }
`

export const InfoPageLayout = ({ children }) => {
  const router = useRouter()
  const chainName = useChainNameByQuery()
  const chainPath = useMultiChainPath()
  const { t } = useTranslation()
  const isStableSwap = router.query.type === 'stableSwap'

  return (
    <Page>
      <EBox style={{ width: '100%', maxWidth: 1024 }}>
        {/* TIGER<EPageHeader pageName="analytics" /> */}
        <Text fontSize="20px" style={{ width: '100%', textAlign: 'left' }}>
          Analytics
        </Text>
        <Flex mt={16} flexWrap="wrap" style={{ gap: 12, borderBottom: '3px solid rgba(255, 255, 255, 0.05)' }}>
          <NextLinkFromReactRouter to={`/info/v3${chainPath}`}>
            <NavLink>V3</NavLink>
          </NextLinkFromReactRouter>

          <NextLinkFromReactRouter to={`/info${chainPath}`}>
            <NavLink className={!isStableSwap ? 'active' : ''}>V2</NavLink>
          </NextLinkFromReactRouter>

          <NextLinkFromReactRouter to={`/info?type=stableSwap`}>
            <NavLink className={isStableSwap ? 'active' : ''}>Stable Swap</NavLink>
          </NextLinkFromReactRouter>
        </Flex>

        {<InfoNav isStableSwap={isStableSwap} />}
        {children}
      </EBox>
    </Page>
  )
}
