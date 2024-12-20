import type { Metadata } from 'next';
import { Unbounded } from 'next/font/google';
import { fontHeading } from '@/lib/fonts';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import dynamic from 'next/dynamic';
// import { NodeSocketProvider, WalletProvider } from '@/context';

const unbounded = Unbounded({
  style: 'normal',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-unbounded'
});

export const metadata: Metadata = {
  title: 'RealXDeal',
  description:
    'Are you willing to stake your reputation on it? guess correct property prices and win NFTs.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const NodeSocketProvider = dynamic(() =>
    import('@/context').then(mod => mod.NodeSocketProvider)
  );
  const WalletProvider = dynamic(() => import('@/context').then(mod => mod.WalletProvider));

  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          unbounded.variable,
          fontHeading.variable
        )}
      >
        <NodeSocketProvider>
          <WalletProvider>{children}</WalletProvider>
        </NodeSocketProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
