'use client';

import {
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  Sidebar,
} from '@/components/ui/sidebar';

import { BicepsFlexed, Home, Quote, TypeOutline, User } from 'lucide-react';

import { NAVIGATION } from '@/lib/config/navigation';

import { useTranslations } from 'next-intl';

import { NavigationMain } from './navigation-main';
import { Logo } from '../icons';
import { NavFooter } from './nav-footer';
import { UserSession } from '@/lib/types';

interface AppSidebarProps {
  user: UserSession | null;
}

export function AppSidebar({ user }: AppSidebarProps) {
  const t = useTranslations('common');
  const tNavigation = useTranslations('navigation');
  const tSections = useTranslations('sections');

  const nav_sections = [
    {
      title: tSections('main'),
      items: [
        {
          title: tNavigation('dashboard'),
          href: NAVIGATION.DASHBOARD,
          icon: Home,
        },
      ],
    },
    {
      title: tSections('tables'),
      items: [
        {
          title: tNavigation('exercises'),
          href: NAVIGATION.EXERCISES,
          icon: BicepsFlexed,
        },
        {
          title: tNavigation('exercise_types'),
          href: NAVIGATION.EXERCISE_TYPES,
          icon: TypeOutline,
        },
        {
          title: tNavigation('quotes'),
          href: NAVIGATION.QUOTES,
          icon: Quote,
        },
        {
          title: tNavigation('users'),
          href: NAVIGATION.USERS,
          icon: User,
        },
      ],
    },
  ];

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center px-4 justify-start py-0">
              <Logo className="size-15 p-0 m-0" />
              <span className="ml-2 bg-linear-to-br from-gainzos-green via-gainzos-blue to-gainzos-purple bg-clip-text text-transparent font-bold text-xl tracking-wide drop-shadow-[0_2px_4px_rgba(0,122,204,0.4)]">
                {t('app_name')}
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavigationMain sections={nav_sections} />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <NavFooter UserSession={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
