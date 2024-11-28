import { ChainId } from '@pancakeswap/chains'

import { StableSwapPool } from './types'
import { pools as bscPools } from './56'
import { pools as bscTestnetPools } from './97'
import { pools as basePools } from './8453'
import { pools as baseTestnetPools } from './84531'
import { pools as goerliPools } from './5' // messi
import { pools as sepoliaPools } from './11155111' // messi-sepolia
import { pools as polygonPools } from './137' // messi-polygon
import { pools as scrollPools } from './534352'
import { pools as scrollSepoliaPools } from './534351'

export type StableSwapPoolMap<TChainId extends number> = {
  [chainId in TChainId]: StableSwapPool[]
}

export const isStableSwapSupported = (chainId: number | undefined): chainId is StableSupportedChainId => {
  if (!chainId) {
    return false
  }
  return STABLE_SUPPORTED_CHAIN_IDS.includes(chainId)
}

export const STABLE_SUPPORTED_CHAIN_IDS = [
  ChainId.GOERLI, // messi
  ChainId.SEPOLIA, // messi-sepolia
  ChainId.POLYGON, // messi-polygon
  ChainId.BASE,
  ChainId.BASE_TESTNET,
  ChainId.SCROLL,
  ChainId.SCROLL_SEPOLIA,
] as const

export type StableSupportedChainId = (typeof STABLE_SUPPORTED_CHAIN_IDS)[number]

export const STABLE_POOL_MAP = {
  [ChainId.BASE]: basePools,
  [ChainId.BASE_TESTNET]: baseTestnetPools,
  [ChainId.GOERLI]: goerliPools, // messi
  [ChainId.SEPOLIA]: sepoliaPools, // messi-sepolia
  [ChainId.POLYGON]: polygonPools, // messi-polygon
  [ChainId.SCROLL]: scrollPools,
  [ChainId.SCROLL_SEPOLIA]: scrollSepoliaPools,
} satisfies StableSwapPoolMap<StableSupportedChainId>
