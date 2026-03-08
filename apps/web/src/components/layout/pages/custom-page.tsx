'use client'

interface PageProps {
  children?: React.ReactNode;
  className?: string;
}

export function Page({ children, className }: PageProps) {
  return (
    <div className={`flex flex-col h-full w-full gainzos-bg gainzos-text ${className ?? ''}`}>
      {children}
    </div>
  );
}