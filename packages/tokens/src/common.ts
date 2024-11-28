import { ERC20Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'

export const ELDEN_TESTNET = new ERC20Token(
  ChainId.SCROLL_SEPOLIA,
  '0xBfeE7D5987CC1e58126c5DCD444145633A58d30e',
  18,
  'ELDEN',
  'ELDEN Token',
  'https://elden.fi/',
)

export const ELDEN_GOERLI = new ERC20Token( // messi
  ChainId.GOERLI,
  '0x64484dE6E6EC90bCaf40d8Ac3EA58223C26A0B93',
  18,
  'ELDEN',
  'ELDEN Token',
  'https://elden.fi/',
)

export const ELDEN_SEPOLIA = new ERC20Token( // messi-sepolia
  ChainId.SEPOLIA,
  '0xcA1B983F101Ac7603fb3732a828f164d3fE5dF1B',
  18,
  'GGTORO',
  'GGTORO Token',
  'https://ggtoro.com/',
)

export const ELDEN_POLYGON = new ERC20Token( // messi-polygon
  ChainId.POLYGON,
  '0x659c6c121F60a788f9EFa26C2CF4323824Df435A',
  18,
  'GGTORO',
  'GGTORO Token',
  'https://ggtoro.com/',
)

export const ELDEN_ETHEREUM = new ERC20Token( // messi-ethereum
  ChainId.ETHEREUM,
  '0xA5048D1e890E1355512bff42420D442c8492fA3d',
  18,
  'GGTORO',
  'GGTORO Token',
  'https://ggtoro.com/',
)

export const ELDEN_BITCOIN = new ERC20Token( // messi-bitcoin
  ChainId.BITCOIN,
  '0xA5048D1e890E1355512bff42420D442c8492fA3d',
  18,
  'GGTORO',
  'GGTORO Token',
  'https://ggtoro.com/',
)

export const DAI_TESTNET = new ERC20Token(
  ChainId.SCROLL_SEPOLIA,
  '0x789c767251c2185310b5f3de9a7e1ab7dc5b4f2e',
  18,
  'DAI',
  'DAI Token',
  'https://elden.fi/',
)

export const DAI_MAINNET = new ERC20Token(
  ChainId.SCROLL_SEPOLIA,
  '0x789c767251c2185310b5f3de9a7e1ab7dc5b4f2e',
  18,
  'DAI',
  'DAI Token',
  'https://elden.fi/',
)

export const ELDEN_MAINNET = new ERC20Token(
  ChainId.SCROLL,
  '0xBfeE7D5987CC1e58126c5DCD444145633A58d30e',
  18,
  'ELDEN',
  'ELDEN Token',
  'https://elden.fi/',
)

export const ELDEN = {
  [ChainId.GOERLI]: ELDEN_GOERLI, // messi
  [ChainId.SEPOLIA]: ELDEN_SEPOLIA, // messi-sepolia
  [ChainId.ETHEREUM]: ELDEN_ETHEREUM, // messi-ethereum
  [ChainId.POLYGON]: ELDEN_POLYGON, // messi-polygon
  [ChainId.BITCOIN]: ELDEN_BITCOIN, // messi-bitcoin
  [ChainId.BASE]: ELDEN_MAINNET,
  [ChainId.BASE_TESTNET]: ELDEN_TESTNET,
  [ChainId.SCROLL]: ELDEN_MAINNET,
  [ChainId.SCROLL_SEPOLIA]: ELDEN_TESTNET,
}

export const DAI = {
  [ChainId.SCROLL]: DAI_MAINNET,
  [ChainId.SCROLL_SEPOLIA]: DAI_TESTNET,
}

export const CAKE_MAINNET = new ERC20Token(
  ChainId.BSC,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://elden.fi/',
)

export const CAKE_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0x8d008B313C1d6C7fE2982F62d32Da7507cF43551',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://elden.fi/',
)

export const USDC_BSC = new ERC20Token(
  ChainId.BSC,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0x64544969ed7EBf5f083679233325356EbE738930',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD Coin',
)

export const USDC_GOERLI = new ERC20Token(
  ChainId.GOERLI,
  '0x027080116bCA91f2744732A4107fD0E2daCc6CF9', // messi
  6,
  'USDC',
  'USD Coin',
)

export const USDC_SEPOLIA = new ERC20Token(
  ChainId.SEPOLIA,
  '0x67AEdc4fc5Ed1d0544B64b1AD4AcF16dB4Eb0DE0', // messi-sepolia
  6,
  'USDC',
  'USD Coin',
)

export const USDC_POLYGON = new ERC20Token(
  ChainId.POLYGON,
  '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // messi-polygon
  6,
  'USDC',
  'USD Coin',
)

export const USDC_BITCOIN = new ERC20Token(
  ChainId.BITCOIN,
  '0x4658DE5b1C072C57653f28bC361e4E91686680cE', // messi-bitcoin
  6,
  'tUSDC',
  'test USD Coin',
)

export const USDT_BSC = new ERC20Token(
  ChainId.BSC,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const USDT_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const BUSD_BSC = new ERC20Token(
  ChainId.BSC,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_GOERLI = new ERC20Token(
  ChainId.GOERLI,
  '0xb809b9B2dc5e93CB863176Ea2D565425B03c0540',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD = {
  [ChainId.ETHEREUM]: BUSD_ETH,
  [ChainId.GOERLI]: BUSD_GOERLI,
  [ChainId.BSC]: BUSD_BSC,
  [ChainId.BSC_TESTNET]: BUSD_TESTNET,
  [ChainId.ZKSYNC]: new ERC20Token(
    ChainId.ZKSYNC,
    '0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181',
    18,
    'BUSD',
    'Binance USD',
  ),
}

export const CAKE = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://elden.fi/',
  ),
  [ChainId.GOERLI]: new ERC20Token(
    ChainId.GOERLI,
    '0xc2C3eAbE0368a2Ea97f485b03D1098cdD7d0c081',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://elden.fi/',
  ),
  [ChainId.BSC]: CAKE_MAINNET,
  [ChainId.BSC_TESTNET]: CAKE_TESTNET,
  [ChainId.POLYGON_ZKEVM]: new ERC20Token(
    ChainId.POLYGON_ZKEVM,
    '0x0D1E753a25eBda689453309112904807625bEFBe',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://elden.fi/',
  ),
  [ChainId.POLYGON_ZKEVM_TESTNET]: new ERC20Token(
    ChainId.POLYGON_ZKEVM_TESTNET,
    '0x2B3C5df29F73dbF028BA82C33e0A5A6e5800F75e',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://elden.fi/',
  ),
  [ChainId.ZKSYNC_TESTNET]: new ERC20Token(
    ChainId.ZKSYNC_TESTNET,
    '0xFf2FA31273c1aedB67017B52C625633d2F021f67',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://elden.fi/',
  ),
  [ChainId.ZKSYNC]: new ERC20Token(
    ChainId.ZKSYNC,
    '0x3A287a06c66f9E95a56327185cA2BDF5f031cEcD',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://elden.fi/',
  ),
  [ChainId.ARBITRUM_ONE]: new ERC20Token(
    ChainId.ARBITRUM_ONE,
    '0x1b896893dfc86bb67Cf57767298b9073D2c1bA2c',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://elden.fi/',
  ),
  [ChainId.ARBITRUM_GOERLI]: new ERC20Token(
    ChainId.ARBITRUM_GOERLI,
    '0x62FF25CFD64E55673168c3656f4902bD7Aa5F0f4',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://elden.fi/',
  ),
  [ChainId.LINEA]: new ERC20Token(
    ChainId.LINEA,
    '0x0D1E753a25eBda689453309112904807625bEFBe',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://elden.fi/',
  ),
  [ChainId.LINEA_TESTNET]: new ERC20Token(
    ChainId.LINEA_TESTNET,
    '0x2B3C5df29F73dbF028BA82C33e0A5A6e5800F75e',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://elden.fi/',
  ),
}

export const USDC = {
  [ChainId.BSC]: USDC_BSC,
  [ChainId.BSC_TESTNET]: USDC_TESTNET,
  [ChainId.ETHEREUM]: USDC_ETH, // messi-ethereum
  [ChainId.GOERLI]: USDC_GOERLI, // messi
  [ChainId.SEPOLIA]: USDC_SEPOLIA, // messi-sepolia
  [ChainId.POLYGON]: USDC_POLYGON, // messi-polygon
  [ChainId.BITCOIN]: USDC_BITCOIN, // messi-bitcoin
  [ChainId.ZKSYNC]: new ERC20Token(ChainId.ZKSYNC, '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4', 6, 'USDC', 'USD Coin'),
  [ChainId.ZKSYNC_TESTNET]: new ERC20Token(
    ChainId.ZKSYNC_TESTNET,
    '0x0faF6df7054946141266420b43783387A78d82A9',
    6,
    'USDC',
    'USD Coin',
  ),
  [ChainId.ARBITRUM_ONE]: new ERC20Token(
    ChainId.ARBITRUM_ONE,
    '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    6,
    'USDC',
    'USD Coin',
  ),
  [ChainId.ARBITRUM_GOERLI]: new ERC20Token(
    ChainId.ARBITRUM_GOERLI,
    '0x179522635726710Dd7D2035a81d856de4Aa7836c',
    6,
    'USDC',
    'USD Coin',
  ),
  [ChainId.POLYGON_ZKEVM]: new ERC20Token(
    ChainId.POLYGON_ZKEVM,
    '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035',
    6,
    'USDC',
    'USD Coin',
  ),
  [ChainId.LINEA]: new ERC20Token(ChainId.LINEA, '0x176211869cA2b568f2A7D4EE941E073a821EE1ff', 6, 'USDC', 'USD Coin'),
  [ChainId.LINEA_TESTNET]: new ERC20Token(
    ChainId.LINEA_TESTNET,
    '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
    6,
    'USDC',
    'USD Coin',
  ),
  [ChainId.BASE_TESTNET]: new ERC20Token(
    ChainId.BASE_TESTNET,
    '0x077DC5954616fDb87277fF55a7D70F7C37fe0EC2',
    6,
    'USDC',
    'USD Coin',
  ),
  [ChainId.BASE]: new ERC20Token(ChainId.BASE, '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', 6, 'USDC', 'USD Coin'),
  [ChainId.OPBNB_TESTNET]: new ERC20Token(
    ChainId.OPBNB_TESTNET,
    '0x077DC5954616fDb87277fF55a7D70F7C37fe0EC2',
    6,
    'USDC',
    'USD Coin',
  ),

  [ChainId.SCROLL]: new ERC20Token(ChainId.SCROLL, '0x633a39b7347610E2CcEd559c579a69cf82126119', 6, 'USDC', 'USD Coin'),
  [ChainId.SCROLL_SEPOLIA]: new ERC20Token(
    ChainId.SCROLL_SEPOLIA,
    '0x633a39b7347610E2CcEd559c579a69cf82126119',
    6,
    'USDC',
    'USD Coin',
  ),
}

export const USDT = {
  [ChainId.BSC]: USDT_BSC,
  [ChainId.ETHEREUM]: USDT_ETH,
  [ChainId.ARBITRUM_ONE]: new ERC20Token(
    ChainId.ARBITRUM_ONE,
    '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    6,
    'USDT',
    'Tether USD',
  ),
  [ChainId.POLYGON_ZKEVM]: new ERC20Token(
    ChainId.POLYGON_ZKEVM,
    '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
    6,
    'USDT',
    'Tether USD',
  ),
  [ChainId.POLYGON_ZKEVM_TESTNET]: new ERC20Token(
    ChainId.POLYGON_ZKEVM_TESTNET,
    '0x7379a261bC347BDD445484A91648Abf4A2BDEe5E',
    6,
    'USDT',
    'Tether USD',
  ),
  [ChainId.ZKSYNC]: new ERC20Token(
    ChainId.ZKSYNC,
    '0x493257fD37EDB34451f62EDf8D2a0C418852bA4C',
    6,
    'USDT',
    'Tether USD',
  ),
  [ChainId.OPBNB_TESTNET]: new ERC20Token(
    ChainId.OPBNB_TESTNET,
    '0xCF712f20c85421d00EAa1B6F6545AaEEb4492B75',
    6,
    'USDT',
    'Tether USD',
  ),
  [ChainId.OPBNB]: new ERC20Token(
    ChainId.OPBNB,
    '0x9e5AAC1Ba1a2e6aEd6b32689DFcF62A509Ca96f3',
    18,
    'USDT',
    'Tether USD',
  ),
  [ChainId.LINEA]: new ERC20Token(ChainId.LINEA, '0xA219439258ca9da29E9Cc4cE5596924745e12B93', 6, 'USDT', 'Tether USD'),

  [ChainId.BASE]: new ERC20Token(ChainId.BASE, '0xf6F76fEF66396fc6F1a4D67B50Efd01b975A86B2', 18, 'USDT', 'Tether USD'),

  [ChainId.GOERLI]: new ERC20Token(ChainId.GOERLI, '0x003b8e527B540148663804C081ff6DCe3FeCfB44', 18, 'USDT', 'Tether USD'), // messi

  [ChainId.SEPOLIA]: new ERC20Token(ChainId.SEPOLIA, '0xAaf2eBb46374bB5C90fad64f864475Ae03C63586', 18, 'USDT', 'Tether USD'), // messi-sepolia

  [ChainId.POLYGON]: new ERC20Token(ChainId.POLYGON, '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', 6, 'USDT', 'Tether USD'), // messi-polygon

  [ChainId.BITCOIN]: new ERC20Token(ChainId.BITCOIN, '0xCFf1943CbaeB9778D0edE109F40Cbc0575486A76', 18, 'USDT', 'Tether USD'), // messi-bitcoin

  [ChainId.BASE_TESTNET]: new ERC20Token(
    ChainId.BASE_TESTNET,
    '0xf6F76fEF66396fc6F1a4D67B50Efd01b975A86B2',
    18,
    'USDT',
    'Tether USD',
  ),

  [ChainId.SCROLL]: new ERC20Token(
    ChainId.SCROLL,
    '0xa2EB04Bff2Ac8b9EFa47403F8dA213aCa809cECE',
    6,
    'USDT',
    'Tether USD',
  ),
  [ChainId.SCROLL_SEPOLIA]: new ERC20Token(
    ChainId.SCROLL_SEPOLIA,
    '0xa2EB04Bff2Ac8b9EFa47403F8dA213aCa809cECE',
    6,
    'USDT',
    'Tether USD',
  ),
}

export const WBTC_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC',
)

export const STABLE_COIN = {
  [ChainId.ETHEREUM]: USDT[ChainId.ETHEREUM],
  [ChainId.GOERLI]: USDC[ChainId.GOERLI],
  [ChainId.SEPOLIA]: USDC[ChainId.SEPOLIA], // messi-sepolia
  [ChainId.POLYGON]: USDC[ChainId.POLYGON], // messi-polygon
  [ChainId.BITCOIN]: USDC[ChainId.BITCOIN], // messi-bitcoin
  [ChainId.BSC]: USDT[ChainId.BSC],
  [ChainId.BSC_TESTNET]: BUSD[ChainId.BSC_TESTNET],
  [ChainId.ARBITRUM_ONE]: USDC[ChainId.ARBITRUM_ONE],
  [ChainId.ARBITRUM_GOERLI]: USDC[ChainId.ARBITRUM_GOERLI],
  [ChainId.ZKSYNC]: USDC[ChainId.ZKSYNC],
  [ChainId.ZKSYNC_TESTNET]: USDC[ChainId.ZKSYNC_TESTNET],
  [ChainId.POLYGON_ZKEVM]: USDT[ChainId.POLYGON_ZKEVM],
  [ChainId.POLYGON_ZKEVM_TESTNET]: USDT[ChainId.POLYGON_ZKEVM_TESTNET],
  [ChainId.LINEA]: USDC[ChainId.LINEA],
  [ChainId.LINEA_TESTNET]: USDC[ChainId.LINEA_TESTNET],
  [ChainId.OPBNB]: USDT[ChainId.OPBNB],
  [ChainId.OPBNB_TESTNET]: USDT[ChainId.OPBNB_TESTNET],
  [ChainId.BASE]: USDC[ChainId.BASE],
  [ChainId.BASE_TESTNET]: USDC[ChainId.BASE_TESTNET],

  [ChainId.SCROLL]: USDT[ChainId.SCROLL],
  [ChainId.SCROLL_SEPOLIA]: USDT[ChainId.SCROLL_SEPOLIA],
} satisfies Record<ChainId, ERC20Token>
