interface PageHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ children, className }: PageHeaderProps) {
  return (
    <header className={`w-full h-[77px] px-6 flex justify-between items-center border-b border-sidebar-border gainzos-bg-light ${className ?? ''}`}>
      {children}
    </header>
  );
}