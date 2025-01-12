import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Text, Flex, Grid, EWithdraw, ELock, EBoost, EStake } from '@pancakeswap/uikit'
import DoubleCurrencyLogo from 'components/Logo/DoubleLogo'
import { formatAmount } from 'utils/formatCurrencyAmount'

const TableRow = styled(Grid)`
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1.2fr;
  cursor: pointer;
  padding: 4px;
  transition: background 0.3s;
  align-items: center;
  border-radius: 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.01);
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 2fr 1fr 1fr 1.2fr;
    .tbl-apr {
      display: none;
    }
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: 2fr 1fr 1.2fr;
    .tbl-token-id,
    .tbl-apr,
    .tbl-properties {
      display: none;
    }
  }
`
interface EsNFTCardRowProps {
  data: any
  onClick: () => void
  runePoolApr?: any
  isStakedInRunePool?: boolean
}

export const EsNFTCardRow = ({ data, onClick, isStakedInRunePool = false, runePoolApr }: EsNFTCardRowProps) => {
  const [deposits, setDeposits] = useState(0)
  const [apr, setApr] = useState(0)
  useEffect(() => {
    if (!data) return
    setDeposits(data.depositedLp * data.lpPrice)
    let _apr = 0
    if (data.farmBaseAPR) _apr += data.farmBaseAPR
    if (data.lockBonusAPR) _apr += data.lockBonusAPR
    if (data.boostBonusAPR) _apr += data.boostBonusAPR
    if (runePoolApr && runePoolApr.apr1) _apr += runePoolApr.apr1
    if (runePoolApr && runePoolApr.apr2) _apr += runePoolApr.apr2
    setApr(_apr)
  }, [data, runePoolApr])

  return (
    <TableRow onClick={onClick}>
      {typeof data?.nftId !== 'undefined' ? (
        <Text className="tbl-token-id" ml="5px" fontSize="12px">{`${data?.nftId}`}</Text>
      ) : null}
      <Flex pr="8px" alignItems="center">
        <DoubleCurrencyLogo currency0={data?.token0} currency1={data?.token1} size={32} />
        <Flex alignItems="end">
          <Text ml="8px" fontSize="14px">
            {data?.name}
          </Text>
          <Text ml="4px" fontSize="12px" textTransform="uppercase" color="app">
            {data?.type}
          </Text>
        </Flex>
      </Flex>

      <Text fontSize="12px">${formatAmount(deposits)}</Text>

      <Text className="tbl-apr" fontSize="12px">
        {apr.toFixed(2)}%
      </Text>

      <Flex className="tbl-properties" style={{ gap: '4px' }}>
        <EWithdraw width={16} height={16} fill={deposits > 0 ? 'gold' : 'gray'} />
        <ELock
          width={16}
          height={16}
          fill={Number(data?.startLockTime) + Number(data?.lockDuration) > Date.now() / 1000 ? 'gold' : 'gray'}
        />
        <EBoost width={16} height={16} fill={Number(data?.boostPoints) ? 'gold' : 'gray'} />
        <EStake width={16} height={16} fill={isStakedInRunePool ? 'gold' : 'gray'} />
      </Flex>

      <Flex flexDirection="column" alignItems="flex-end">
        <Text fontSize="14px" color="app">
          {formatAmount(data?.pending)}
        </Text>
        <Text fontSize="12px" color="gray">
          ${formatAmount(data?.pendingUSD)}
        </Text>
      </Flex>
    </TableRow>
  )
}
