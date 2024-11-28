import { Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'
import {
  ethereumTokens,
  bscTokens,
  bscTestnetTokens,
  goerliTestnetTokens,
  polygonZkEvmTokens,
  polygonZkEvmTestnetTokens,
  zkSyncTestnetTokens,
  zksyncTokens,
  lineaTokens,
  lineaTestnetTokens,
  arbitrumGoerliTokens,
  arbitrumTokens,
  baseTokens,
  baseTestnetTokens,
  opBnbTokens,
  opBnbTestnetTokens,
  scrollTokens,
  scrollSepoliaTokens,
  sepoliaTestnetTokens, // messi-sepolia
  polygonTokens, // messi-polygon
  bitcoinTokens // messi-bitcoin
} from '@pancakeswap/tokens'

export const usdGasTokensByChain = {
  [ChainId.ETHEREUM]: [ethereumTokens.usdt],
  [ChainId.GOERLI]: [goerliTestnetTokens.usdc],
  [ChainId.SEPOLIA]: [sepoliaTestnetTokens.usdc], // messi-sepolia
  [ChainId.POLYGON]: [polygonTokens.usdc], // messi-polygon
  [ChainId.BITCOIN]: [bitcoinTokens.usdc], // messi-bitcoin
  [ChainId.BSC]: [bscTokens.busd],
  [ChainId.BSC_TESTNET]: [bscTestnetTokens.busd],
  [ChainId.ARBITRUM_ONE]: [arbitrumTokens.usdc],
  [ChainId.ARBITRUM_GOERLI]: [arbitrumGoerliTokens.usdc],
  [ChainId.POLYGON_ZKEVM]: [polygonZkEvmTokens.usdt],
  [ChainId.POLYGON_ZKEVM_TESTNET]: [polygonZkEvmTestnetTokens.usdt],
  [ChainId.ZKSYNC]: [zksyncTokens.usdc],
  [ChainId.ZKSYNC_TESTNET]: [zkSyncTestnetTokens.usdc],
  [ChainId.LINEA]: [lineaTokens.usdc],
  [ChainId.LINEA_TESTNET]: [lineaTestnetTokens.usdc],
  [ChainId.OPBNB]: [opBnbTokens.usdt],
  [ChainId.OPBNB_TESTNET]: [opBnbTestnetTokens.usdc],
  [ChainId.BASE]: [baseTokens.usdc],
  [ChainId.BASE_TESTNET]: [baseTestnetTokens.usdc],

  [ChainId.SCROLL]: [scrollTokens.usdc],
  [ChainId.SCROLL_SEPOLIA]: [scrollSepoliaTokens.usdc],
} satisfies Record<ChainId, Token[]>

export * from './v2'
export * from './v3'
export * from './stableSwap'
