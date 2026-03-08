"use client"

import { LucideIcon } from "lucide-react";

interface PageTitleProps {
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}

export function PageTitle({ icon: Icon, children, className }: PageTitleProps) {


  return (
    <h1 className={`flex items-center gap-3 text-3xl font-bold tracking-tight gainzos-text-bright ${className ?? ''}`}>
      {Icon && <Icon className="size-8 gainzos-blue" />}
      {children}
    </h1>
  );
}
