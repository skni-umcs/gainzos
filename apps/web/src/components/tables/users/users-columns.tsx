'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { User } from '@/lib/types/user';
import { ColumnHeader } from '../shared/column-header';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils/format-dates';

export function useUsersColumns(): ColumnDef<User>[] {
  const tColumns = useTranslations('entities.users');

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
      accessorKey: 'username',
      header: ({ column }) => (
        <ColumnHeader 
          column={column} 
          title={tColumns('fields.username')}
        />
      ),
      cell: ({ row }) => {
        const username = row.getValue('username') as string;
        return <div className="max-w-sm">{username}</div>;
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <ColumnHeader column={column} title={tColumns('fields.email')} />
      ),
      cell: ({ row }) => {
        const email = row.getValue('email') as string;
        return <div>{email}</div>;
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <ColumnHeader column={column} title={tColumns('fields.createdAt')} />
      ),
      cell: ({ row }) => {
        const createdAt = row.getValue('createdAt') as string;
        return (
          <Badge variant="default">
            {formatDate(createdAt)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <ColumnHeader column={column} title={tColumns('fields.role')} />
      ),
      cell: ({ row }) => {
        const role = row.getValue('role') as string;
        return <div>{role}</div>;
      },
    }
  ];
}
