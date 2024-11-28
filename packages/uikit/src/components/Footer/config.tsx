import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, FacebookIcon, LinkedinIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, YoutubeIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.elden.fi/contact-us",
      },
      {
        label: "Blog",
        href: "https://blog.elden.fi/",
      },
      {
        label: "Community",
        href: "https://docs.elden.fi/contact-us/telegram",
      },
      {
        label: "CAKE",
        href: "https://docs.elden.fi/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://pancakeswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.elden.fi/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.elden.fi/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.elden.fi/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        href: "https://docs.elden.fi",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.elden.fi/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.elden.fi/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Facebook",
    icon: FacebookIcon,
    href: "https://www.facebook.com/GGTOROofficial",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/ggtoroofficial",
  },
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/GGTOROofficial/",
  },
  {
    label: "Linkedin",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/company/ggtoro/",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    href: "https://t.me/ggtoro_official",
  },
  // {
  //   label: "Reddit",
  //   icon: RedditIcon,
  //   href: "https://reddit.com/",
  // },
  
  // {
  //   label: "Github",
  //   icon: GithubIcon,
  //   href: "https://github.com/pancakeswap/",
  // },
  // {
  //   label: "Discord",
  //   icon: DiscordIcon,
  //   href: "https://discord.gg/pancakeswap",
  // },
  // {
  //   label: "Youtube",
  //   icon: YoutubeIcon,
  //   href: "https://www.youtube.com/",
  // },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
