'use client';

import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils/utils';
import { Button } from '@/components/ui/button';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

interface CommonFiltersProps {
  title: string;
  filterByLabel: string;
  resetLabel: string;
  filterOptions: FilterOption[];
  onReset: () => void;
}

export function CommonFilters({
  title,
  filterByLabel,
  resetLabel,
  filterOptions,
  onReset,
}: CommonFiltersProps) {
  const activeFilterCount = filterOptions.filter((option) => option.checked).length;
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'relative inline-flex items-center'
          )}
        >
          <Filter className="mr-2 h-4 w-4" />
          {title}
          {hasActiveFilters && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{filterByLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {filterOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.id}
            checked={option.checked}
            onCheckedChange={option.onCheckedChange}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
        
        {hasActiveFilters && (
          <>
            <DropdownMenuSeparator />
            <Button onClick={onReset} variant="tableAction" size="sm" className="w-full justify-start">
              {resetLabel}
            </Button>

          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
