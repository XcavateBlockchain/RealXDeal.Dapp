import SidebarNav from '@/components/layouts/sidebar-nav';
import { Fragment } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <section className="min-h-screen w-full overflow-hidden">
        <div className="flex min-h-screen">
          <SidebarNav />
          <section className="relative ml-[214px] box-border flex min-h-min w-full basis-auto flex-col">
            <main className="container mx-auto box-border flex min-h-0 flex-auto flex-col">
              <div className="overflow-y-auto">{children}</div>
            </main>
          </section>
        </div>
      </section>
    </Fragment>
  );
}
