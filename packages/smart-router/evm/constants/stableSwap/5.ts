import { goerliTestnetTokens } from '@pancakeswap/tokens' // messi

import { StableSwapPool } from './types'

export const pools: StableSwapPool[] = [
  {
    lpSymbol: 'USDT-USDC LP',
    lpAddress: '0x3D453Cea5b0838d3A528a800f4e34846A228Ea5f', // messi
    token: goerliTestnetTokens.usdt, // coins[0] // messi
    quoteToken: goerliTestnetTokens.usdc, // coins[1] // messi
    stableSwapAddress: '0xd1f388c1669f80043edc85475fcea7a4db69df82', // messi
    infoStableSwapAddress: '0xAaf2eBb46374bB5C90fad64f864475Ae03C63586', // messi
    stableLpFee: 0.0004,
    stableLpFeeRateOfTotalFee: 0.5,
  },
]