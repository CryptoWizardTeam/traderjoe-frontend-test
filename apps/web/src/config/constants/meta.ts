import memoize from 'lodash/memoize'
import { ContextApi } from '@pancakeswap/localization'
import { PageMeta } from './types'
import { ASSET_CDN } from './endpoints'

export const DEFAULT_META: PageMeta = {
  title: 'Ggtoro',
  description:
    'GGtoro is a Decentralized Gaming Exchange where traders can import their web2 assets to web3. Trade, Lend, Borrow, Stake their game assets as well as receive crypto to phone number or email address.',
  image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/`,
}

interface PathList {
  paths: { [path: string]: { title: string; basePath?: boolean; description?: string; image?: string } }
  defaultTitleSuffix: string
}

const getPathList = (t: ContextApi['t']): PathList => {
  return {
    paths: {
      '/': { title: t('Home'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/swap': { basePath: true, title: t('Exchange'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/positions': { basePath: true, title: t('Positions'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/sggtoro': { basePath: true, title: t('SGGToro'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/dividends': { basePath: true, title: t('Dividends'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/lanchpad': { basePath: true, title: t('Launchpad'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/booster': { basePath: true, title: t('Yield Booster'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/gauge': { basePath: true, title: t('Gauge'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/analytics': { basePath: true, title: t('Analytics'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },

      '/limit-orders': { basePath: true, title: t('Limit Orders'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/add': { basePath: true, title: t('Add Liquidity'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/remove': { basePath: true, title: t('Remove Liquidity'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/liquidity': { title: t('Liquidity'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/find': { title: t('Import Pool') },
      '/competition': { title: t('Trading Battle') },
      '/prediction': { title: t('Prediction'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/prediction/leaderboard': { title: t('Leaderboard'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/farms': { title: t('Farms'), image: `${ASSET_CDN}/web/og/farms.jpg` },
      '/farms/auction': { title: t('Farm Auctions'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/pools': { title: t('Pools'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/lottery': { title: t('Lottery'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/ifo': { title: t('Initial Farm Offering'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/teams': { basePath: true, title: t('Leaderboard'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/voting': { basePath: true, title: t('Voting'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/voting/proposal': { title: t('Proposals'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/voting/proposal/create': { title: t('Make a Proposal'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/info': {
        title: `${t('Overview')} - ${t('Info')}`,
        description: 'View statistics for EldenFi exchanges.',
        image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/`,
      },
      '/info/pairs': {
        title: `${t('Pairs')} - ${t('Info')}`,
        description: 'View statistics for EldenFi exchanges.',
        image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/`,
      },
      '/info/tokens': {
        title: `${t('Tokens')} - ${t('Info')}`,
        description: 'View statistics for EldenFi exchanges.',
        image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/`,
      },
      '/nfts': { title: t('NFT Marketplace'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/nfts/collections': { basePath: true, title: t('Collections'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/nfts/activity': { title: t('Activity'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
      '/profile': { basePath: true, title: t('Profile') },
      '/pancake-squad': { basePath: true, title: t('Pancake Squad') },
      '/pottery': { basePath: true, title: t('Pottery'), image: `${ASSET_CDN}/8adb2756-b0d4-4a19-a9a8-73554641703c/` },
    },
    defaultTitleSuffix: t('Ggtoro'),
  }
}

export const getCustomMeta = memoize(
  (path: string, t: ContextApi['t'], _: string): PageMeta => {
    const pathList = getPathList(t)
    const pathMetadata =
      pathList.paths[path] ??
      pathList.paths[Object.entries(pathList.paths).find(([url, data]) => data.basePath && path.startsWith(url))?.[0]]

    if (pathMetadata) {
      return {
        title: `${pathMetadata.title}`,
        ...(pathMetadata.description && { description: pathMetadata.description }),
        image: pathMetadata.image,
      }
    }
    return null
  },
  (path, t, locale) => `${path}#${locale}`,
)
