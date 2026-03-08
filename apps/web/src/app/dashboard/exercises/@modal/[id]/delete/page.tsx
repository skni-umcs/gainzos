'use client';

import { Modal } from '@/components/layout/common/modal';
import { DeleteExerciseForm } from './_components/delete-exercise-form';
import { useTranslations } from 'next-intl';
import { use } from 'react';

interface DeleteExerciseModalProps {
  params: Promise<{ id: string }>;
}

export default function DeleteExerciseTypeModal({
                                                  params
                                                }: DeleteExerciseModalProps) {
  const tExercises = useTranslations('entities.exercises.actions');
  const { id } = use(params);

  return (
    <Modal title={tExercises('deleteExercise')}>
      <DeleteExerciseForm exerciseId={id} />
    </Modal>
  );
}