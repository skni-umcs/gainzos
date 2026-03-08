"use client";

import { Modal } from '@/components/layout/common/modal';
import { AddExerciseTypeForm } from './_components/add-exercise-type-form';
import { useTranslations } from 'next-intl';

export default function AddExerciseTypePage() {
  const tExerciseTypes = useTranslations('entities.exerciseTypes.actions');

  return (
    <Modal title={tExerciseTypes('addExerciseType')}>
      <AddExerciseTypeForm />
    </Modal>
  );
}
