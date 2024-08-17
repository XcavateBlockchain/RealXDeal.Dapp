'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  {
    title: 'NFTS',
    href: ''
  },
  {
    title: 'Listed',
    href: ''
  },
  {
    title: 'Offers',
    href: ''
  }
];

export default function SettingsNav() {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center justify-start border-b">
      {nav.map(nav => {
        const isPathname = nav.href && pathname === nav.href;
        return (
          <Link
            key={nav.title}
            href={nav.href}
            className={cn(
              'rounded-b-none rounded-t border-b-2 p-4 text-[18px]/[24px]',
              isPathname ? 'border-primary-300 text-white' : 'text-white'
            )}
          >
            {nav.title}
          </Link>
        );
      })}
    </div>
  );
}
