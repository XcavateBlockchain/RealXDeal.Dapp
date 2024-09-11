'use client';

import { Icons } from '@/components/icons';
import WalletConnect from '@/components/wallet-connect/wallet-connect';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type HeaderProps = {
  open: boolean;
  closeModalNavigationPath?: string;
};

export const ProfileHeader = ({
  open = false,
  closeModalNavigationPath = '/'
}: HeaderProps) => {
  const router = useRouter();
  const [walletModal, showModal] = useState(open);

  useEffect(() => {
    showModal(open);
  }, [open]);

  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex items-center gap-6">
        <div
          className="size-[130px] rounded-full border-4 border-[#DAB436]"
          style={{ boxShadow: '0px 0px 24px 0px #DAB436' }}
        >
          <img
            className="size-full rounded-full"
            src="/images/profile.jpeg"
            alt="Rounded avatar"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-[24px]/[24px] font-medium">Victor X</h1>
          <span className="flex items-center gap-2 rounded-3xl bg-primary-300/[0.24] px-2 py-[2px] text-[18px]/[22px] font-extralight">
            1Ay00011DY... <Icons.copy className="size-3.5" />
          </span>
          <span>
            Rank: <span className="text-primary-400">N0 1 world</span>
          </span>
        </div>
      </div>
      {walletModal ? (
        <WalletConnect open={walletModal} />
      ) : (
        <div className="space-x-2.5">
          <span>Pints:</span>
          <span className="text-primary-400">3000</span>
        </div>
      )}
    </div>
  );
};

type CircleCardProps = {
  color: string;
};

export const CircleCard = ({ color }: CircleCardProps) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="99"
        height="99"
        viewBox="0 0 99 99"
        fill="none"
      >
        <g filter="url(#filter0_d_717_4061)">
          <path
            d="M90.2139 49.75C90.2139 72.2556 71.9695 90.5 49.4639 90.5C26.9583 90.5 8.71387 72.2556 8.71387 49.75C8.71387 27.2444 26.9583 9 49.4639 9C71.9695 9 90.2139 27.2444 90.2139 49.75ZM14.4216 49.75C14.4216 69.1033 30.1106 84.7922 49.4639 84.7922C68.8172 84.7922 84.5061 69.1033 84.5061 49.75C84.5061 30.3967 68.8172 14.7078 49.4639 14.7078C30.1106 14.7078 14.4216 30.3967 14.4216 49.75Z"
            fill={color}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_717_4061"
            x="0.563868"
            y="0.85"
            width="97.8"
            height="97.8"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4.075" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.92549 0 0 0 0 0.698039 0 0 0 0 0.470588 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_717_4061"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_717_4061"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
