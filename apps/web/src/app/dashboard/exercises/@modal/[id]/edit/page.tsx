'use client';

import { Modal } from '@/components/layout/common/modal';
import { EditExerciseForm } from './_components/edit-exercise-form';
import { useTranslations } from 'next-intl';
import { use } from 'react';

interface EditExerciseModalProps {
  params: Promise<{ id: string }>;
}

export default function EditExerciseTypeModal({ params }: EditExerciseModalProps) {
  const tExercises = useTranslations('entities.exercises.actions');
  const { id } = use(params);

  return (
    <Modal title={tExercises('editExercise')}>
      <EditExerciseForm exerciseId={id} />
    </Modal>
  );
}
