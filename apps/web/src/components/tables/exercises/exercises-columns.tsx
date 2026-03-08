'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { Exercise } from '@/lib/types/exercise';
import { ColumnHeader } from '../shared/column-header';
import { ExercisesActions } from './exercises-actions';


export function useExercisesColumns(): ColumnDef<Exercise>[] {
  const tColumns = useTranslations('entities.exercises');

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
      accessorKey: 'name',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title={tColumns('fields.name')}
        />
      ),
      cell: ({ row }) => {
        const name = row.getValue('name') as string;
        return <div className="max-w-sm">{name}</div>;
      },
    },

    {
      accessorKey: 'description',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title={tColumns('fields.description')}
        />
      ),
      cell: ({ row }) => {
        const description = row.getValue('description') as string;
        return <div className="max-w-sm">{description}</div>;
      },
    },

    {
      accessorKey: 'exercisesType.name',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title={tColumns('fields.exercise_type')}
        />
      ),
      cell: ({ row }) => {
        const exerciseType = row.original.exercisesType;
        return <div>{exerciseType?.name ?? "-"}</div>;
      },
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => <ExercisesActions exercise={row.original} />,
    },
  ];
}