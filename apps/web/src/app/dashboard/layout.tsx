'use client';
import { AppSidebar } from '@/components/layout/app-sidebar';

import { SidebarProvider } from '@/components/ui/sidebar';
import { useValidateUser } from '@/lib/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { data: userData, isPending } = useValidateUser(true);

  useEffect(() => {
    if (!isPending && userData) {
      // Sprawdź czy użytkownik ma rolę ADMIN
      if (userData?.session?.authority !== 'ROLE_ADMIN') {
        router.replace('/login');
        return;
      }
    }
    
    if (!isPending && !userData) {
      // Brak sesji - przekieruj do logowania
      router.replace('/login');
    }
  }, [userData, isPending, router]);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader size={50} color="#36d7b7" />
      </div>
    );

  return (
    <main className={'antialiased gainzos-bg gainzos-text-bright'}>
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </main>
  );
}
