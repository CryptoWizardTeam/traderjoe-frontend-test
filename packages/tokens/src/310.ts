import { ERC20Token, WETH9 } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'

import { ELDEN, USDC, USDT } from './common' // messi-bitcoin

export const bitcoinTokens = {
  weth: WETH9[ChainId.BITCOIN], // messi-bitcoin
  elden: ELDEN[ChainId.BITCOIN], // messi-bitcoin
  usdc: USDC[ChainId.BITCOIN], // messi-bitcoin
  usdt: USDT[ChainId.BITCOIN], // messi-bitcoin
  celr: new ERC20Token(ChainId.BITCOIN, '0x5D3c0F4cA5EE99f8E8F59Ff9A5fAb04F6a7e007f', 18, 'CELR', 'CelerToken', ''),
  leet: new ERC20Token(ChainId.BITCOIN, '0xBd509651E6374c327d24b9d7E3Ea46704f6F31E8', 18, 'LEET', 'Leet Token', ''),
  mockB: new ERC20Token(ChainId.BITCOIN, '0xB8DA084D035C9c38518D86A9D079ba6A0Aec4327', 18, 'MOCK B', 'MOCK B'),
  mockA: new ERC20Token(ChainId.BITCOIN, '0xD134B434682dF091E398a844Dc3c613fe728cE2D', 18, 'MOCK A', 'MOCK A'),
}