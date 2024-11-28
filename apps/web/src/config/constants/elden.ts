import { GraphQLClient } from 'graphql-request'

// export const ELDEN_ADDRESS: `0x${string}` = '0xcA1B983F101Ac7603fb3732a828f164d3fE5dF1B' // messi-sepolia
// export const SELDEN_ADDRESS: `0x${string}` = '0x98179d697f2cF768C6F8B3f8326BC6AbAf74B675' // messi-sepolia
// export const ELDEN_MASTER: `0x${string}` = '0xeC7d76A64ccaC0B8555f33fb2808c0dDC5057758' // messi-sepolia
// export const NFT_POOL_FACTORY_ADDRESS: `0x${string}` = '0x858427C08a3F34A1816F0e1c3BAd226640BA440D' // messi-sepolia
// export const YIELD_BOOSTER_ADDRESS: `0x${string}` = '0x4f0e81253c7f2083191c711DF4a31E5d8b9c17dc' // messi-sepolia
// export const DIVIDENDS_ADDRESS: `0x${string}` = '0x6FbEf05BB0D836716C820A6897B03F86003a48Ba' // messi-sepolia
// export const LAUNCHPAD_ADDRESS: `0x${string}` = '0x8CD9Ae307F743ABaa45f9dedc8adB310ab62E27e' // messi-sepolia
// export const POSITION_HELPER_ADDRESS: `0x${string}` = '0x9855C7BB60fD52DD920FCa6b608587A7693FBbc0' // messi-sepolia
// export const RUNE_POOL_FACTORY_ADDRESS: `0x${string}` = '0xEE1BD2fe0908dC8B67F67d506740D4D38d25dea8' // messi-sepolia

export const ELDEN_ADDRESS: `0x${string}` = '0x659c6c121F60a788f9EFa26C2CF4323824Df435A' // messi-polygon
export const SELDEN_ADDRESS: `0x${string}` = '0x773f95Ff1c0ABF8F35d5423861Bb5674BFDC2434' // messi-polygon
export const ELDEN_MASTER: `0x${string}` = '0x442BF862Ded1aF988e1c5e18128fE442ce5c722f' // messi-polygon
export const NFT_POOL_FACTORY_ADDRESS: `0x${string}` = '0xf26288b4be90646D4C616CC3D79EB0E41f72700E' // messi-polygon
export const YIELD_BOOSTER_ADDRESS: `0x${string}` = '0x4ce0817e1Fa4EB03A1a7eF8137d8Cb0E1C9d51A8' // messi-polygon
export const DIVIDENDS_ADDRESS: `0x${string}` = '0x0f0Fd69F7E6Ae9EF0E300061f3082d6D96408d26' // messi-polygon
export const LAUNCHPAD_ADDRESS: `0x${string}` = '0xff40D6Fe28bfd81F8a89245D6B60e56C8Ef7f8dD' // messi-polygon
export const POSITION_HELPER_ADDRESS: `0x${string}` = '0x2aEE0962b0e62dBDea814CdC884A851819aC8fA5' // messi-polygon
export const RUNE_POOL_FACTORY_ADDRESS: `0x${string}` = '0xd115C5076e85fc9849F602cFb1B03047d5639398' // messi-polygon

// export const ETH_PRICE_FEED: `0x${string}` = '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e'
// export const ETH_PRICE_FEED: `0x${string}` = '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e' // messi replaced with Goerli chainlink price feed
export const ETH_PRICE_FEED: `0x${string}` = '0xF9680D99D6C9589e2a93a78A04A279e509205945' // messi-polygon replaced with Sepolia chainlink price feed
// export const ETH_PRICE_FEED: `0x${string}` = '0x694AA1769357215DE4FAC081bf1f309aDC325306' // messi-sepolia replaced with Sepolia chainlink price feed

// export const POSITIONS_SUBGRAPH = 'https://api.studio.thegraph.com/query/41589/elden-positions/version/latest'
// export const POSITIONS_SUBGRAPH = 'https://api.studio.thegraph.com/query/60345/ggtoro-positions/version/latest' // messi
export const POSITIONS_SUBGRAPH = 'https://api.studio.thegraph.com/query/66250/ggtoro-positions/version/latest' // messi-polygon
// export const POSITIONS_SUBGRAPH = 'https://api.studio.thegraph.com/query/60345/ggtoro-positions-sepolia/version/latest' // messi-sepolia

export const positionsSubgraphClient = new GraphQLClient(POSITIONS_SUBGRAPH)