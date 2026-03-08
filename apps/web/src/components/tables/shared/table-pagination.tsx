'use client';

import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { PAGE_SIZE_OPTIONS } from '@/lib/config/navigation';

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  const tTable = useTranslations('common.table');

  return (
    <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
      {/* Sekcja wyboru wierszy i rozmiaru strony */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Informacja o wybranych wierszach */}
        <div className="text-sm text-muted-foreground">
          {tTable('rows_chosen', {
            count: table.getFilteredSelectedRowModel().rows.length,
            total: table.getFilteredRowModel().rows.length,
          })}
        </div>
        
        {/* Wybór rozmiaru strony */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {tTable('rows_per_page')}
          </span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent 
              side="bottom"
              className='bg-gainzos-bg text-gainzos-text'
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem 
                  key={size} 
                  value={`${size}`}
                  
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Sekcja paginacji */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
        {/* Informacja o stronie */}
        <div className="text-sm text-muted-foreground text-center sm:text-left">
          {tTable('page_info', {
            page: table.getState().pagination.pageIndex + 1,
            totalPages: table.getPageCount(),
          })}
        </div>
        
        {/* Przyciski nawigacji */}
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex-1 sm:flex-none"
          >
            {tTable('previous')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex-1 sm:flex-none"
          >
            {tTable('next')}
          </Button>
        </div>
      </div>
    </div>
  );
}