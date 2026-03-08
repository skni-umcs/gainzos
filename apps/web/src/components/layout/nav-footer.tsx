'use client';

import { Button } from '../ui/button';
import { Dock, LogOut, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLogoutUser, useValidateUser } from '@/lib/hooks/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BarLoader } from 'react-spinners';

export function NavFooter() {
  const t = useTranslations('common');
  const tNavigation = useTranslations('navigation');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const { data: currentUser, isPending: isLoadingUser } = useValidateUser(true);
  const { mutate: logoutUser, isPending } = useLogoutUser();


  if (!currentUser) {
    return (
      <div className="flex justify-center items-center p-4">
        <BarLoader width={100} height={4} color="#36d7b7" />
      </div>
    );
  }
  
  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        toast.success(t('toast.success_logout'));
        router.push('/login');
      },
      onError: (error: Error) => {
        toast.error(t('toast.error_logout'));
        console.error('Error logging out user:', error);
      },
    });
  };

  return (
    <div className="p-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex-1 justify-start w-full gap-3 p-2">
            <User className="w-8 h-8 text-primary" />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium truncate">
                {isLoadingUser ? '...' : (currentUser.session?.username || 'User')}
              </p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">{currentUser.session?.email || 'User'}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => window.open(`${apiUrl}/gainzos/swagger-ui/index.html#`, '_blank')}
          >
            <Dock className="w-4 h-4 mr-2" />
            {tNavigation('documentation')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout} 
            disabled={isPending}
            className="text-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t('logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
