import BottomNav from '@/components/layouts/bottom-nav';
import { Shell } from '@/components/shell';
import { getCookieStorage } from '@/lib/storage';
import { ProfileHeader } from './profile/_components/profile-header';
import { getUserData } from '@/lib/queries';

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const address = await getCookieStorage('accountKey');

  const user = await getUserData(address ? address : '');
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <Shell>
          <ProfileHeader open={!address} address={address} user={user} />
          {children}
        </Shell>
      </main>
      <BottomNav />
    </div>
  );
}
