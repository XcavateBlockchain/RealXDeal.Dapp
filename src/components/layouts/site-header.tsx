'use client';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../icons';
import { ConnectWallet } from './connect-wallet';
import ConnectedWalletDropDown from './connected-wallet';
import { useSubstrateContext } from '@/context/polkadot-contex';
import { ConnectCredentialWallet } from './connect-credential-wallet';

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isConnected } = useSubstrateContext();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full backdrop-blur">
      <div className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 md:px-[100px]">
        <Link href={'/'}>
          <Image src={'/images/logo.svg'} alt="logo" width={183} height={72} priority />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {siteConfig.mainNav.map(nav => (
            <Link
              key={nav.title}
              href={nav.href}
              className="text-[1.1rem]/[1.5rem] font-light transition-colors duration-300 hover:text-primary-300"
            >
              {nav.title}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {isConnected ? <ConnectedWalletDropDown /> : <ConnectWallet />}
          {isConnected ? <ConnectCredentialWallet /> : null}
        </div>

        <div className="flex items-center md:hidden">
          <button onClick={toggleMobileMenu} className="mobile-menu-button">
            <svg
              className="h-6 w-6 text-primary-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
          <div className="m-4 mt-0 z-10 relative">
  <div className=" mt-0 absolute right-0 w-44 divide-y divide-gray-100 rounded border bg-white shadow">
    <ul className="py-1 text-sm text-gray-700">
    {siteConfig.mainNav.map(nav => (
       <li>
            <Link
              key={nav.title}
              href={nav.href}

              className="block px-4 py-2 hover:bg-gray-100 text-[1.1rem]/[1.5rem] font-light transition-colors duration-300 hover:text-primary-300"
            >
              {nav.title}
            </Link>
            </li>

          ))}
    </ul>
  </div>
</div>
     
      )}
    </header>
  );
}
