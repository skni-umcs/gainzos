'use client';

import { Modal } from '@/components/layout/common/modal';
import { ViewExerciseTypeForm } from './_components/view-exercise-type-form';
import { useTranslations } from 'next-intl';
import { use } from 'react';

interface ViewExerciseTypeModalProps {
  params: Promise<{ id: string }>;
}

export default function ViewExerciseTypeModal({ params }: ViewExerciseTypeModalProps) {
  const tExerciseTypes = useTranslations('entities.exerciseTypes.actions');
  const { id } = use(params);

  return (
    <Modal title={tExerciseTypes('viewExerciseType')}>
      <ViewExerciseTypeForm exerciseTypeId={id} />
    </Modal>
  );
}