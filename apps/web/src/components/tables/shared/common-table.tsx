'use client';

import React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TablePagination } from './table-pagination';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CommonTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  searchColumnKey?: string;
  pageSize?: number;
  filters?: React.ReactNode;
  onBulkDelete: () => void;
}

export function CommonTable<TData, TValue>({
  columns,
  data,
  searchColumnKey,
  pageSize = 10,
  filters,
}: CommonTableProps<TData, TValue>) {
  const tTable = useTranslations('common.table');

  // Stan sortowania
  const [sorting, setSorting] = useState<SortingState>([]);

  // Stan filtrowania
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Stan wyboru wierszy
  const [rowSelection, setRowSelection] = useState({});

  // Inicjalizacja tabeli z TanStack
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* Sekcja kontrolek - wyszukiwanie */}
      {searchColumnKey && (
        <div className="flex items-center py-4 justify-between gap-4">
          <Input
            placeholder={tTable('search_placeholder')}
            value={(table.getColumn(searchColumnKey)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(searchColumnKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            {' '}
            <Button
              variant="destructive"
              size="sm"
              disabled={Object.keys(rowSelection).length === 0}
            >
              {tTable('bulk_delete')}
            </Button>
            {filters}
          </div>
        </div>
      )}

      {/* Tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="text-gainzos-text [&_tr]:hover:bg-transparent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead 
                      key={header.id}
                      style={{
                        width: header.getSize() !== 150 ? header.getSize() : undefined,
                        minWidth: header.column.columnDef.minSize,
                        maxWidth: header.column.columnDef.maxSize,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                      key={cell.id}
                      style={{
                        width: cell.column.getSize() !== 150 ? cell.column.getSize() : undefined,
                        minWidth: cell.column.columnDef.minSize,
                        maxWidth: cell.column.columnDef.maxSize,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {tTable('no_results')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginacja i informacje o wybranych wierszach */}
      <TablePagination table={table} />
    </div>
  );
}
