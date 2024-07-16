import { Icons } from '@/components/icons';
import {
  InjectedExtension,
  InjectedMetadata,
  InjectedProvider
} from '@polkadot/extension-inject/types';
import { Signer } from '@polkadot/types/types';

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

export interface WalletAccount {
  address: string;
  source: string;
  name?: string;
  wallet?: Wallet;
  signer?: unknown;
}

export interface WalletLogoProps {
  src: string;
  alt: string;
}

export interface WalletInfo {
  extensionName: string;
  title: string;
  installUrl: string;
  logo: WalletLogoProps;
}

export interface WalletMethods {
  enable: () => Promise<unknown>;

  getAccounts: (ss58Format: number) => Promise<WalletAccount[] | null>;
}

export interface Wallet extends WalletInfo, WalletMethods {
  installed: boolean | undefined;

  extension: InjectedExtension | undefined;

  signer: Signer | undefined;

  metadata: InjectedMetadata | undefined;

  provider: InjectedProvider | undefined;
}
