'use client';

import { Modal } from '@/components/layout/common/modal';
import { ViewExercisesForm } from './_components/view-exercises-form';
import { useTranslations } from 'next-intl';
import { use } from 'react';

interface EditExerciseModalProps {
  params: Promise<{ id: string }>;
}

export default function EditExerciseModal({ params }: EditExerciseModalProps) {
  const tExercises = useTranslations('entities.exercises.actions');
  const { id } = use(params);

  return (
    <Modal title={tExercises('viewExercise')}>
      <ViewExercisesForm exerciseId={id} />
    </Modal>
  );
}