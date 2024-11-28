import { sepoliaTestnetTokens } from '@pancakeswap/tokens' // messi-sepolia

import { StableSwapPool } from './types'

export const pools: StableSwapPool[] = [
  {
    lpSymbol: 'USDT-USDC LP',
    lpAddress: '0x8f515FE779002e8eD34218A0751d47C4E86C1496', // messi-sepolia
    token: sepoliaTestnetTokens.usdc, // coins[0] // messi-sepolia
    quoteToken: sepoliaTestnetTokens.usdt, // coins[1] // messi-sepolia
    stableSwapAddress: '0x2BFf5D041d4140Abd8a7fF4F77d4B2aC69751231', // messi-sepolia
    infoStableSwapAddress: '0x1Ea77118D65D3956579B1e1668Df4bd0974814fF', // messi-sepolia
    stableLpFee: 0.0004,
    stableLpFeeRateOfTotalFee: 0.5,
  },
]