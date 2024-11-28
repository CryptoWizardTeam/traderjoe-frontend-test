import { ContextApi } from '@pancakeswap/localization'
import {
  DropdownMenuItems,
  EEarnIcon,
  EExchangeIcon,
  ESeldenIcon,
  EarnFillIcon,
  EarnIcon,
  MenuItemsType,
  MoreIcon,
  PancakeProtectorIcon,
  SwapFillIcon,
  SwapIcon,
} from '@pancakeswap/uikit'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Trade'),
      icon: EExchangeIcon,
      href: '/swap',
      items: [
        {
          label: t('Swap'),
          href: '/swap',
        },
        {
          label: t('Liquidity'),
          href: '/add',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Earn'),
      href: '/positions',
      icon: EEarnIcon,
      items: [
        {
          label: t('Positions'),
          href: '/positions',
        },
        {
          label: t('GoodGame Pools'),
          href: '/goodgamepools',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('SGGToro'),
      icon: ESeldenIcon,
      href: '/sggtoro',
      items: [
        {
          label: t('SGGToro'),
          href: '/sggtoro',
        },
        {
          label: t('Dividends'),
          href: '/sggtoro/dividends',
        },
        {
          label: t('Launchpad'),
          href: '/sggtoro/launchpad',
        },
        {
          label: t('YieldBooster'),
          href: '/sggtoro/booster',
        },
      ],
    },
    {
      label: '',
      href: '/analytics',
      icon: MoreIcon,
      items: [
        {
          label: t('Analytics'),
          href: '/info',
        },
        {
          label: t('Earnings dashboard'),
          href: '/sggtoro',
        },
        {
          label: t('Gauge'),
          href: '/gauge',
        },
        {
          label: t('Launchpad'),
          href: '/launchpad',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
