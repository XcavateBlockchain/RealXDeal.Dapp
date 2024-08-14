'use client';

import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '../icons';
import { siteConfig } from '@/config/site';

export default function BottomNav() {
  return (
    <div className="fixed bottom-[10px] z-[50] flex w-full min-w-full items-center justify-center px-[100px]">
      <nav className="relative flex w-full items-center justify-between rounded-lg border border-border bg-card px-[42px] py-5 shadow-header">
        <NavList items={siteConfig.sideNav} />
      </nav>
    </div>
  );
}

const NavList = ({ items }: { items: NavItem[] }) => {
  const path = usePathname();
  // const router = useRouter();

  return (
    <div className="flex w-full items-center justify-center gap-8">
      {items.map((item: NavItem) => {
        const Icon = Icons[item.icon];
        const isActive = path.includes(item.href);
        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              'flex w-[184px] items-center gap-2 rounded-lg p-2 text-[17px]/[24px] font-light transition-colors duration-300 ease-in',
              isActive
                ? 'bg-primary-300 text-primary hover:bg-primary-300/85'
                : 'text-white hover:text-primary-300'
            )}
          >
            <Icon className="size-6" /> {item.title}
          </Link>
        );
      })}
    </div>
  );
};
