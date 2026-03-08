'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ExerciseType } from "@/lib/types/exercise-type";
import { ColumnHeader } from "../shared/column-header";
import { ExerciseTypesActions } from "./exercise-types-actions";

export function useExerciseTypesColumns(): ColumnDef<ExerciseType>[] {
  const tColumns = useTranslations("entities.exerciseTypes");

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()
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
      accessorKey: "name",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title={tColumns("fields.name")}
        />
      ),
      cell: ({ row }) => {
        const name = row.getValue("name") as string;
        return <div className="max-w-sm">{name}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <ExerciseTypesActions exerciseType={row.original} />,
    },
  ];
}