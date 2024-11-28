import { ContextApi } from '@pancakeswap/localization'
import {
  DropdownMenuItems,
  MenuItemsType,
  SwapFillIcon,
  SwapIcon,
  EarnFillIcon,
  EarnIcon,
  MoreIcon,
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
      href: '/swap',
      showItemsOnMobile: true,
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
      image: '/images/decorations/pe2.png',
      showItemsOnMobile: true,
      items: [
        {
          label: t('Position'),
          href: '/positions',
        },
        {
          label: t('GoodGame Pools'),
          href: '/goodgamepools',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('sGGToro'),
      href: '/sggtoro',
      showItemsOnMobile: true,
      items: [
        {
          label: t('Dashboard'),
          href: '/sggtoro',
          showItemsOnMobile: true,
        },
        {
          label: t('Dividends'),
          href: '/sggtoro/dividends',
          showItemsOnMobile: true,
        },
        // {
        //   label: t('Launchpad'),
        //   href: '/sggtoro/launchpad',
        //   showItemsOnMobile: true,
        // },
        {
          label: t('Yield Booster'),
          href: '/sggtoro/booster',
          showItemsOnMobile: true,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Launchpad'),
      href: '/launchpad',
      showItemsOnMobile: false,
    },
    {
      label: t('Analytics'),
      href: '/info',
      showItemsOnMobile: false,
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
