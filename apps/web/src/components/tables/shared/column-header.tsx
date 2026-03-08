import { Column } from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';

interface ColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}

export function ColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: ColumnHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted();
  const canSort = column.getCanSort();

  if (!canSort) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className="flex items-center gap-2">
      {title}
      <Button
        variant="tableAction"
        onClick={() => column.toggleSorting(sorted === 'asc')}
        size="icon-sm"
      >
        {sorted === 'asc' ? (
          <ArrowUp className="size-4" />
        ) : sorted === 'desc' ? (
          <ArrowDown className="size-4" />
        ) : (
          <ArrowUpDown className="size-4" />
        )}
      </Button>
    </div>
  );
}
