import BottomNav from '@/components/layouts/bottom-nav';
import DashboardSiteHeader from '@/components/layouts/dashboard-site-header';
import { getCookieStorage } from '@/lib/storage';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const address = await getCookieStorage('accountKey');
  return (
    <div className="relative flex min-h-screen flex-col">
      <DashboardSiteHeader open={!address} />
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <Fragment>
//       <section className="min-h-screen w-full overflow-hidden">
//         <div className="flex min-h-screen">
//           <SidebarNav />
//           <section className="relative ml-[214px] box-border flex min-h-min w-full basis-auto flex-col">
//             <main className="container mx-auto box-border flex min-h-0 flex-auto flex-col">
//               <div className="overflow-y-auto">{children}</div>
//             </main>
//           </section>
//         </div>
//       </section>

//     </Fragment>
//   );
// }
