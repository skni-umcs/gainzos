'use client';

import { CommonFilters } from '../shared/common-filters';
import { useTranslations } from 'next-intl';
import { ExerciseType } from '@/lib/types/exercise-type';

interface ExerciseFiltersProps {
  exerciseTypes: ExerciseType[];
  selectedTypeIds: number[];
  onTypeToggle: (typeId: number) => void;
  onReset: () => void;
}

export function ExerciseFilters({
  exerciseTypes,
  selectedTypeIds,
  onTypeToggle,
  onReset,
}: ExerciseFiltersProps) {
  const t = useTranslations('entities.exercises');
  const tCommon = useTranslations('common');

  const filterOptions = exerciseTypes.map((type) => ({
    id: `type-${type.id}`,
    label: type.name,
    checked: selectedTypeIds.includes(type.id!),
    onCheckedChange: () => onTypeToggle(type.id!),
  }));

  return (
    <CommonFilters
      title={t('filters.title')}
      filterByLabel={t('filters.filter_by')}
      resetLabel={tCommon('actions.reset_filters')}
      filterOptions={filterOptions}
      onReset={onReset}
    />
  );
}