import { getCookieStorage } from '@/lib/storage';
import GameHeader from './_components/game-header';
import { getUserData } from '@/lib/queries';
import GameContextProvider from '@/context/game-context';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const address = await getCookieStorage('accountKey');
  const user = await getUserData(address ? address : '');

  return (
    <GameContextProvider>
      <div className="relative flex min-h-screen flex-col">
        <GameHeader open={!address} points={user?.points ?? 0} />
        <main className="flex-1">{children}</main>
      </div>
    </GameContextProvider>
  );
}
