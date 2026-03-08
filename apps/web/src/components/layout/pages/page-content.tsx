
interface PageContentProps {
  children?: React.ReactNode;
  className?: string;
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <div className={`flex-1 p-6 w-full max-w-full overflow-auto gainzos-bg ${className ?? ''}`}>
      {children}
    </div>
  );
}