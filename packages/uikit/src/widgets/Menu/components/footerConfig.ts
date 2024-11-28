import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("Resources"),
    items: [
      {
        label: t("Audit"),
        href: "/",
      },
      {
        label: t("Contact Us"),
        href: "/",
      },
      {
        label: t("Documentation"),
        href: "/",
      },
    ],
  },
  {
    label: t("Help"),
    items: [
      // {
      //   label: t("FAQ"),
      //   href: "/",
      // },
      // {
      //   label: t("Guides"),
      //   href: "/",
      // },
      {
        label: t("Support"),
        href: "/",
      },
    ],
  },
  {
    label: t("Tools"),
    items: [
      // {
      //   label: t("Analytics"),
      //   href: "/",
      // },
      // {
      //   label: t("Bridge"),
      //   href: "/",
      // },
      {
        label: t("CoinGecko"),
        href: "/",
      },
      {
        label: t("DexTools"),
        href: "/",
      },
      // {
      //   label: t("Governance"),
      //   href: "/",
      // },
    ],
  },
  // {
  //   label: t("Ecosystem"),
  //   items: [
  //     {
  //       label: t("Create a Nitro Pool"),
  //       href: "/",
  //     },
  //     {
  //       label: t("My Nitro Pool"),
  //       href: "/",
  //     },
  //   ],
  // },
];
