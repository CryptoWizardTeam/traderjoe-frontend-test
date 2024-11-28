import useSWRImmutable from 'swr/immutable'
import { useMemo } from 'react'
import { gql } from 'graphql-request'
import { positionsSubgraphClient } from 'config/constants/elden'

// messi-goodGamePool
const query = gql`
  query MyQuery($owner: String!) {
    goodGamePoolStakingPositions(where: { owner: $owner }) {
      owner
      nftId
      depositedAmount
      runePool {
        id
        nftPool {
          id
          pairAddress
        }
      }
    }
    _meta {
      block {
        number
      }
    }
    runePools {
      owner
      nftPool {
        id
      }
      totalDepositedNfts
      totalDepositAmount
      rewardsToken1RemainingAmount
      rewardsToken1Amount
      rewardsToken0RemainingAmount
      rewardsToken0Amount
      publishedAt
      published
      endTime
      description
      depositEndTime
      id
    }
  }
`

// Philip TODO: add useRunePoolsData type
export default function useRunePoolsData(account: string | undefined, interval: number) {
  const { data, isLoading, error } = useSWRImmutable(
    account && positionsSubgraphClient ? `useGoodGamePoolsData-${account}` : null, // messi-goodGamePool
    async () => {
      return positionsSubgraphClient.request(query, {
        owner: account?.toLowerCase(),
      })
    },
    {
      refreshInterval: interval,
    },
  )

  return useMemo(
    () => ({
      error,
      isLoading,
      data,
    }),
    [data, error, isLoading],
  )
}
