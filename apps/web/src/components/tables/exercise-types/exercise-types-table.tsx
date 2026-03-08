'use client';

import { CommonTable } from "../shared/common-table";
import { useExerciseTypesColumns } from './exercise-types-columns';
import { useExerciseTypes } from "@/lib/hooks/exercise-type";
import { useTranslations } from "next-intl";
import { FadeLoader } from "react-spinners";

export function ExerciseTypesTable() {
  const { data: exerciseTypesData, isPending } = useExerciseTypes();
  const t = useTranslations('entities.exerciseTypes');
  const columns = useExerciseTypesColumns();

  const handleBulkDelete = () => {
    // Logika usuwania zaznaczonych typów ćwiczeń
  };

  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-center py-10">
          <FadeLoader color="#4B5563" />
        </div>
      ) : (
        <CommonTable
          columns={columns}
          data={exerciseTypesData || []}
          searchPlaceholder={t('search.placeholder')}
          searchColumnKey="name"
          onBulkDelete={handleBulkDelete}
        />
      )}
    </>
  );
}