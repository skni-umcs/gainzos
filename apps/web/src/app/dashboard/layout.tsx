import { AppSidebar } from '@/components/layout/app-sidebar';

import { SidebarProvider } from '@/components/ui/sidebar';
import { getSession } from '@/lib/server/get-session';
import { redirect } from 'next/navigation';
import { UserSession } from '@/lib/types';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user: UserSession | null = await getSession();

  const isAdmin = user?.role === 'ADMIN';

  // if (!isAdmin) {
  //   redirect('/login');
  // }

  return (
    <main className={'antialiased gainzos-bg gainzos-text-bright'}>
      <SidebarProvider>
        <AppSidebar user={user} />
        {children}
      </SidebarProvider>
    </main>
  );
}
