import { ChainId } from '@pancakeswap/chains'
import { supportedChainId } from '@pancakeswap/farms'

export const SUPPORT_ONLY_BSC = [ChainId.BSC]
export const SUPPORT_ONLY_SCROLL = [ChainId.SCROLL_SEPOLIA]
export const SUPPORT_ONLY_BASE = [ChainId.BASE, ChainId.BASE_TESTNET]
export const SUPPORT_ONLY_GOERLI = [ChainId.GOERLI, ChainId.GOERLI] // messi : supported chains
export const SUPPORT_ONLY_SEPOLIA = [ChainId.SEPOLIA, ChainId.SEPOLIA] // messi-sepolia : supported chains
export const SUPPORT_ONLY_POLYGON = [ChainId.POLYGON, ChainId.POLYGON] // messi-polygon : supported chains
export const SUPPORT_FARMS = supportedChainId
export const SUPPORT_BUY_CRYPTO = [
  ChainId.BSC,
  ChainId.ETHEREUM,
  ChainId.ARBITRUM_ONE,
  ChainId.ZKSYNC, // NO PROVIDER SUPPORT ZK_SYNC_ERA
  ChainId.POLYGON_ZKEVM,
  ChainId.LINEA,
  ChainId.BASE,
  ChainId.GOERLI, // messi
  ChainId.SEPOLIA, // messi-sepolia
  ChainId.POLYGON, // messi-polygon
]

export const LIQUID_STAKING_SUPPORTED_CHAINS = [
  ChainId.BSC,
  ChainId.ETHEREUM,
  ChainId.BSC_TESTNET,
  ChainId.ARBITRUM_GOERLI,
  ChainId.GOERLI, // messi
  ChainId.SEPOLIA, // messi-sepolia
  ChainId.POLYGON, // messi-polygon
]
export const FIXED_STAKING_SUPPORTED_CHAINS = [ChainId.BSC, ChainId.GOERLI /* messi */, ChainId.SEPOLIA /* messi-sepolia */, ChainId.POLYGON /* messi-polygon */]

export const V3_MIGRATION_SUPPORTED_CHAINS = [ChainId.BSC, ChainId.ETHEREUM, ChainId.SEPOLIA /* messi-sepolia */, ChainId.POLYGON /* messi-polygon */]
