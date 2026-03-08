'use client';

import { Modal } from '@/components/layout/common/modal';
import { DeleteExerciseTypeForm } from './_components/delete-exercise-type-form';
import { useTranslations } from 'next-intl';
import { use } from 'react';

interface DeleteExerciseTypeModalProps {
  params: Promise<{ id: string }>;
}

export default function DeleteExerciseTypeModal({
                                                  params
                                                }: DeleteExerciseTypeModalProps) {
  const tExerciseTypes = useTranslations('entities.exerciseTypes.actions');
  const { id } = use(params);

  return (
    <Modal title={tExerciseTypes('deleteExerciseType')}>
      <DeleteExerciseTypeForm exerciseTypeId={id} />
    </Modal>
  );
}