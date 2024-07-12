import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
}

export type GameData = {
  cover_image: string;
  type: string;
  summary: string;
  bedrooms: number;
  bathrooms: number;
  size: any;
  // address: string;
  // post_code: string;
  // features: string;
  images: string[];
  location: {
    latitude: any;
    longitude: any;
  };
};
