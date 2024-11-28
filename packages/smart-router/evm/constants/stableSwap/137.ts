import { polygonTokens } from '@pancakeswap/tokens' // messi-polygon

import { StableSwapPool } from './types'

export const pools: StableSwapPool[] = [
  {
    lpSymbol: 'USDT-USDC LP',
    lpAddress: '0xE38AD360B7F755BD315D45c2B6dd40a4c3167480', // messi-polygon
    token: polygonTokens.usdc, // coins[0] // messi-polygon
    quoteToken: polygonTokens.usdt, // coins[1] // messi-polygon
    stableSwapAddress: '0x148c296CC2c4d12B186487c629E7A478B2da7B70', // messi-polygon
    infoStableSwapAddress: '0x4E88CE58346872A41399525D10CAD317cFba3421', // messi-polygon
    stableLpFee: 0.0004,
    stableLpFeeRateOfTotalFee: 0.5,
  },
]