import { GameData, NavItem } from '@/types';

export const siteConfig = {
  name: 'RealXDeal',
  url: '',
  ogImage: '',
  description: '',
  mainNav: [
    {
      title: 'Game',
      href: '/dashboard'
    },
    {
      title: 'How to play',
      href: '/#how-to-play'
    },
    {
      title: 'Marketplace',
      href: '/marketplace'
    },
    {
      title: 'About us',
      href: '/#team'
    }
  ],
  sideNav: [
    {
      title: 'Home',
      href: '/dashboard',
      icon: 'GameController'
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: 'Alien'
    },
    {
      title: 'Task',
      href: '/tasks',
      icon: 'PuzzlePiece'
    },
    {
      title: 'LeaderBoard',
      href: '/leaderboard',
      icon: 'Medal'
    },
    {
      title: 'Marketplace',
      href: '/marketplace',
      icon: 'Storefront'
    }
    // {
    //   title: 'Settings',
    //   href: '/dashboard',
    //   icon: 'GearSix'
    // }
  ] satisfies NavItem[],
  links: {
    twitter: '',
    discord: '',
    telegram: ''
  },
  nfts: [
    {
      image: '/images/Xblue_property_NFT29_apartment.webp',
      nftId: 12,
      owner: 'Alice',
      type: 'Blue',
      time: '2024-05-03 11:43:42'
    },
    {
      image: '/images/Xcoral_property_NFT15_apartment.webp',
      nftId: 1,
      owner: 'Bob',
      type: 'Coral',
      time: '2024-05-03 11:43:43'
    },
    {
      image: '/images/Xblue_property_NFT30_apartment.webp',
      nftId: 2,
      owner: 'Carol',
      type: 'Blue',
      time: '2024-05-03 11:43:44'
    },
    {
      image: '/images/Xgreen_property_NFT2_apartment.webp',
      nftId: 3,
      owner: 'Dave',
      type: 'Green',
      time: '2024-05-03 11:43:45'
    },
    {
      image: '/images/Xblue_property_NFT30_apartment.webp',
      nftId: 4,
      owner: 'Eve',
      type: 'Blue',
      time: '2024-05-03 11:43:46'
    },
    {
      image: '/images/Xgreen_property_NFT3_apartment.webp',
      nftId: 5,
      owner: 'Frank',
      type: 'Green',
      time: '2024-05-03 11:43:47'
    },
    {
      image: '/images/Xorange_property_NFT21_apartment.webp',
      nftId: 6,
      owner: 'Grace',
      type: 'Orange',
      time: '2024-05-03 11:43:48'
    },
    {
      image: '/images/Xpurple_property_NFT12_apartment.webp',
      nftId: 13,
      owner: 'Harry',
      type: 'Purple',
      time: '2024-05-03 11:43:49'
    }
  ],
  gameData: {
    cover_image:
      'https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/32k/31217/144806384/31217_15631_PYMM_IMG_00_0000_max_476x317.jpeg',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    size: '1,001 sq. ft.',
    address: 'Drays Yard, Norwich',
    post_code: 'jfjf',
    location: {
      latitude: 52.625284,
      longitude: 1.30124
    },
    images: [
      // 'https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/32k/31217/144806384/31217_15631_PYMM_IMG_00_0000_max_476x317.jpeg',
      '/images/Xcyan_property_NFT18_apartment.webp',
      '/images/Xorange_property_NFT21_apartment.webp',
      '/images/Xcyan_property_NFT18_apartment.webp'
    ],
    summary:
      'Second floor apartment located a short stroll from the City centre, Good sized lounge, Kitchen/Diner, Two bedrooms, E-Suite & Bathroom, Double glazing & electric heating, Designated Parking Space.'
  } as GameData
};

export type SiteConfig = typeof siteConfig;

export const staleBoard = [
  ['5DUDYoT7tefEi1LETr3dLRAdqNFFFoYiT8N9axZCQUxb3vvf', 280],
  ['5FEda1GYvjMYcBiuRE7rb85QbD5bQNHuZajhRvHYTxm4PPz5', 275],
  ['5G6WMtWFYJ4YZo3GZBXzoBLbxN1rpFsvCdXPj3uWVELyDe6A', 155],
  ['5Di7RnyX8TXwM9C9RCVHWTuXemwmRiJLiX3wapYgN588qB2E', 155],
  ['5Di7RnyX8TXwM9C9RCVHWTuXemwmRiJLiX3wapYgN588qB2E', 155],
  ['5Di7RnyX8TXwM9C9RCVHWTuXemwmRiJLiX3wapYgN588qB2E', 155]
];

export const staleUser = {
  points: 0,
  wins: 0,
  losses: 0,
  practiseRounds: 0,
  lastPlayedRound: 0,
  nfts: {
    xorange: 0,
    xpink: 0,
    xblue: 0,
    xcyan: 0,
    xcoral: 0,
    xpurple: 0,
    xleafgreen: 0,
    xgreen: 0
  }
};

export const collections = [
  {
    collectionName: 'xorange',
    collectionId: 0
  },
  {
    collectionName: 'xpink',
    collectionId: 1
  },
  {
    collectionName: 'Xblue',
    collectionId: 2
  },
  {
    collectionName: 'xcyan',
    collectionId: 3
  },
  {
    collectionName: 'xcoral',
    collectionId: 4
  },
  {
    collectionName: 'xpurple',
    collectionId: 5
  },
  {
    collectionName: 'xleafgreen',
    collectionId: 6
  },
  {
    collectionName: 'xgreen',
    collectionId: 7
  }
];

export const collection = {
  '0': {
    collectionName: 'xorange',
    collectionId: 0,
    nftImage: '/images/Xorange_property_NFT21_apartment.webp'
  },
  '1': {
    collectionName: 'xpink',
    collectionId: 1,
    nftImage: '/images/Xpink_property_NFT25_apartment.webp'
  },
  '2': {
    collectionName: 'Xblue',
    collectionId: 2,
    nftImage: '/images/Xblue_property_NFT29_apartment.webp'
  },
  '3': {
    collectionName: 'xcyan',
    collectionId: 3,
    nftImage: '/images/Xcyan_property_NFT18_apartment.webp'
  },
  '4': {
    collectionName: 'xcoral',
    collectionId: 4,
    nftImage: '/images/Xcoral_property_NFT15_apartment.webp'
  },
  '5': {
    collectionName: 'xpurple',
    collectionId: 5,
    nftImage: '/images/Xpurple_property_NFT12_apartment.webp'
  },
  '6': {
    collectionName: 'xleafgreen',
    collectionId: 6,
    nftImage: '/images/Xleafgreen_property_NFT6_apartment.webp'
  },
  '7': {
    collectionName: 'xgreen',
    collectionId: 7,
    nftImage: '/images/Xgreen_property_NFT3_apartment.webp'
  }
};

export const collectionImage = {
  xorange: {
    collectionName: 'xorange',
    nftImage: '/images/Xorange_property_NFT21_apartment.webp'
  },
  xpink: {
    collectionName: 'xpink',
    nftImage: '/images/Xpink_property_NFT25_apartment.webp'
  },
  xblue: {
    collectionName: 'xblue',
    nftImage: '/images/Xblue_property_NFT29_apartment.webp'
  },
  xcyan: {
    collectionName: 'xcyan',
    nftImage: '/images/Xcyan_property_NFT18_apartment.webp'
  },
  xcoral: {
    collectionName: 'xcoral',
    nftImage: '/images/Xcoral_property_NFT15_apartment.webp'
  },
  xpurple: {
    collectionName: 'xpurple',
    nftImage: '/images/Xpurple_property_NFT12_apartment.webp'
  },
  xleafgreen: {
    collectionName: 'xleafgreen',
    nftImage: '/images/Xleafgreen_property_NFT6_apartment.webp'
  },
  xgreen: {
    collectionName: 'xgreen',
    nftImage: '/images/Xgreen_property_NFT3_apartment.webp'
  }
};
