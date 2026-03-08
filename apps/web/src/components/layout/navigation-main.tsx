'use client'
import { type LucideIcon } from 'lucide-react'
import Link from 'next/link';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

interface NavItem {
  title: string,
  href: string,
  icon?: LucideIcon,
}

interface NavSection {
  title: string,
  items: NavItem[],
}

interface NavigationMainProps {
  sections: NavSection[],
}

export function NavigationMain({ sections }: NavigationMainProps) {
  return <>
    {sections.map((section) => (
      <SidebarGroup key={section.title}>
        <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
        <SidebarMenu>
          {section.items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.href} className="flex items-center space-x-2">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    ))}
  </>
}

