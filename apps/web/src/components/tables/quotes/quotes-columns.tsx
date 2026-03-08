'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { Quote } from '@/lib/types/quote';
import { ColumnHeader } from '../shared/column-header';
import { QuotesActions } from './quotes-actions';
import { Badge } from '@/components/ui/badge';

export function useQuotesColumns(): ColumnDef<Quote>[] {
  const tColumns = useTranslations('entities.quotes');

  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      accessorKey: 'text',
      header: ({ column }) => (
        <ColumnHeader 
          column={column} 
          title={tColumns('fields.text')}
        />
      ),
      cell: ({ row }) => {
        const text = row.getValue('text') as string;
        return <div className="max-w-sm">{text}</div>;
      },
    },
    {
      accessorKey: 'author',
      header: ({ column }) => (
        <ColumnHeader column={column} title={tColumns('fields.author')} />
      ),
      cell: ({ row }) => {
        const author = row.getValue('author') as string;
        return <div>{author}</div>;
      },
    },
    {
      accessorKey: 'isVulgar',
      header: ({ column }) => (
        <ColumnHeader column={column} title={tColumns('fields.isVulgar')} />
      ),
      cell: ({ row }) => {
        const isVulgar = row.getValue('isVulgar') as boolean;
        return (
          <Badge variant={isVulgar ? 'destructive' : 'default'}>
            {isVulgar ? tColumns('fields.isVulgar_yes') : tColumns('fields.isVulgar_no')}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => <QuotesActions quote={row.original} />,
    },
  ];
}
