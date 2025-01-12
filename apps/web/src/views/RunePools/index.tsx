import { useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { Dots, Flex, Text } from '@pancakeswap/uikit'
import EPageHeader from 'components/EPageHeader'
import EBox from 'components/EBox'
import Page from 'views/Page'
import ESearchBox from 'components/ESearchBox'
import { useAccount } from 'wagmi'
import useRunePools from 'hooks/useRunePools'
import { useTranslation } from '@pancakeswap/localization'
import { RunePoolCardRow } from 'components/RunePoolCardRow'
import RunePoolsList from './components/RunePoolsTable'

const Instruction = styled.p`
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 300;
  color: gray;
`

const RunePools = () => {
  const { address: account } = useAccount()
  const { pools, isLoading } = useRunePools(account, 30000)

  const { t } = useTranslation()

  const [searchKey, setSearchKey] = useState('')

  let poolsSection: null | JSX.Element[] = null

  if (pools?.pools) {
    poolsSection = pools.pools.map((pool, index) => <RunePoolCardRow key={`${pool.id}`} poolData={pool} />)
  }

  const filteredWithQueryFilter = useMemo(() => {
    if (poolsSection) {
      return poolsSection
        .filter((pair) => {
          const pairName = pair?.props?.poolData?.pairName
          const pairAddress = pair?.props?.poolData?.pairAddress
          const nftPoolAddress = pair?.props?.poolData?.nftPoolAddress
          const pairToken0 = pair?.props?.poolData?.token0Address
          const pairToken1 = pair?.props?.poolData?.token1Address

          if (!pairToken0 || !pairToken1 || !pairName || !pairAddress) return null

          const searchStr = searchKey.toLowerCase()
          if (searchStr.length === 0) return pair

          if (
            pairName.toLowerCase().indexOf(searchStr) >= 0 ||
            pairAddress.toLowerCase().indexOf(searchStr) >= 0 ||
            pairToken0.toLowerCase().indexOf(searchStr) >= 0 ||
            pairToken1.toLowerCase().indexOf(searchStr) >= 0 ||
            nftPoolAddress.toLowerCase().indexOf(searchStr) >= 0
          ) {
            return pair
          }

          return null
        })
        .filter(Boolean)
    }

    return []
  }, [poolsSection, searchKey])

  const mainSection = useMemo(() => {
    let resultSection: null | JSX.Element | JSX.Element[] = null
    if (isLoading) {
      resultSection = (
        <Text color="textSubtle" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    } else if (!poolsSection || !filteredWithQueryFilter) {
      resultSection = (
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
        </Text>
      )
    } else {
      resultSection = filteredWithQueryFilter
    }

    return resultSection
  }, [t, isLoading, poolsSection, filteredWithQueryFilter])

  return (
    <Page>
      <Flex
        flexDirection="column"
        maxWidth={1024}
        width="100%"
        height="100%"
        position="relative"
        alignItems="center"
        style={{ gap: 16 }}
      >
        {/* TIGER<EPageHeader pageName="runepools"> */}
        <Text fontSize="20px" style={{ width: '100%', textAlign: 'left' }}>
          GoodGame Pools
        </Text>
        <Instruction>
          Deposit your staked positions into a compatible GoodGame pool and earn additional rewards.
        </Instruction>
        {/* </EPageHeader> */}

        <EBox style={{ width: '100%' }}>
          <ESearchBox value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
        </EBox>

        <RunePoolsList> {mainSection} </RunePoolsList>
      </Flex>
    </Page>
  )
}

export default RunePools
