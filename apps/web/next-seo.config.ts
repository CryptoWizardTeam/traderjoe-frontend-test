import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Ggtoro',
  defaultTitle: 'Ggtoro',
  description:
    'Developed on Base, Elden is an immutable, decentralized, community-driven DEX with the goal of revolutionizing liquidity solutions.Our platform provides developers and consumers with deep and simply accessible liquidity by providing stable and effective liquidity settings. Providing "Real Yields" to all participants, Elden hopes to establish a new benchmark as the Liquidity Hub of this ecosystem, being the first of its kind on Base.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@Ggtoro',
    site: '@Ggtoro',
  },
  openGraph: {
    title: 'Ggtoro - immutable, decentralized, community-driven DEX on Base',
    description:
      'Developed on Base, Elden is an immutable, decentralized, community-driven DEX with the goal of revolutionizing liquidity solutions.Our platform provides developers and consumers with deep and simply accessible liquidity by providing stable and effective liquidity settings. Providing "Real Yields" to all participants, Elden hopes to establish a new benchmark as the Liquidity Hub of this ecosystem, being the first of its kind on Base.',
    images: [{ url: 'https://assets-eldenfi.netlify.app/web/og/hero.jpg' }],
  },
}
