import BottomNav from '@/components/layouts/bottom-nav';
import DashboardSiteHeader from '@/components/layouts/dashboard-site-header';
import { getCookieStorage } from '@/lib/storage';

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const address = await getCookieStorage('accountKey');
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* <DashboardSiteHeader open={!address} /> */}
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
