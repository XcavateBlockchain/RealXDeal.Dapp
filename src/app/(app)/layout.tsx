import BottomNav from '@/components/layouts/bottom-nav';
import DashboardSiteHeader from '@/components/layouts/dashboard-site-header';
import SidebarNav from '@/components/layouts/sidebar-nav';
import { Fragment } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <DashboardSiteHeader />
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
