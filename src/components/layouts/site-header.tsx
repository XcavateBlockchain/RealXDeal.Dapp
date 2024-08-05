'use client';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../icons';
import ConnectWallet from './connect-wallet';

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="w-full backdrop-blur">
      <div className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 md:px-[100px]">
        <Link href={'/'}>
          <Image
            src={'/images/logo.svg'}
            alt="logo"
            width={183}
            height={72}
            className="hidden lg:block"
            priority
          />
          <Image
            src={'/images/logo.svg'}
            alt="logo"
            width={114}
            height={45}
            className="block lg:hidden"
            priority
          />
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

        <div className="hidden md:flex">
          <ConnectWallet />
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
        <div className="mobile-menu md:hidden">
          <nav className="flex flex-col items-center gap-4 py-4">
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
          <div className="flex justify-center py-4">
            <ConnectWallet />
          </div>
        </div>
      )}
    </header>
  );
}
