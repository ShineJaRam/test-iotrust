export interface Favorite {
  id: number;
  name: string;
  url: string;
  icon: string;
}

export const FAVORITES_DATA: Favorite[] = [
  {
    id: 1,
    name: "OpenSea",
    url: "https://opensea.io",
    icon: "/images/icon_opensea.png",
  },
  {
    id: 2,
    name: "MoonPay",
    url: "https://buy.moonpay.com/v2/buy",
    icon: "/images/icon_moonpay.png",
  },
  {
    id: 3,
    name: "Rarible",
    url: "https://rarible.com/",
    icon: "/images/icon_rarible.png",
  },
];
