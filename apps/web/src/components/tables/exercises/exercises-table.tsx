'use client';

import { useState, useMemo } from 'react';
import { CommonTable } from "../shared/common-table";
import { useExercisesColumns } from "./exercises-columns";
import { useExercises } from "@/lib/hooks/exercise";
import { useExerciseTypes } from '@/lib/hooks/exercise-type';
import { useTranslations } from "next-intl";
import { FadeLoader } from "react-spinners";
import { ExerciseFilters } from "./exercises-filtres";

export function ExercisesTable() {
  const { data: exercisesData, isPending } = useExercises();
  const { data: exerciseTypes = [] } = useExerciseTypes();
  const t = useTranslations('entities.exercises');
  const columns = useExercisesColumns();

  // Stany filtrów
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([]);

  // Obsługa zmiany filtrów
  const handleTypeToggle = (typeId: number) => {
    setSelectedTypeIds((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  // Reset filtrów
  const handleReset = () => {
    setSelectedTypeIds([]);
  };

  // Filtrowanie ćwiczeń według wybranych typów
  const filteredExercises = useMemo(() => {
    if (!exercisesData) return [];
    if (selectedTypeIds.length === 0) return exercisesData;
    
    return exercisesData.filter((exercise) => {
      const typeId = exercise.exercisesType?.id;
      return typeId && selectedTypeIds.includes(typeId);
    });
  }, [exercisesData, selectedTypeIds]);

  const handleBulkDelete = () => {
    // Logika usuwania zaznaczonych ćwiczeń
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
          data={filteredExercises}
          searchPlaceholder={t('search.placeholder')}
          searchColumnKey="name"
          onBulkDelete={handleBulkDelete}
          filters={
            <ExerciseFilters
              exerciseTypes={exerciseTypes}
              selectedTypeIds={selectedTypeIds}
              onTypeToggle={handleTypeToggle}
              onReset={handleReset}
            />
          }
        />
      )}
    </>
  );
}