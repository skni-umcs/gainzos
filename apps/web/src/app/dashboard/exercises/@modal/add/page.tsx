'use client';

import { Modal } from '@/components/layout/common/modal';
import { AddExerciseForm } from './_components/add-exercise-form';
import { useTranslations } from 'next-intl';

export default function AddExercisePage() {
  const t = useTranslations('entities.exercises.actions');

  return (
    <div>
      <Modal title={t('addExercise')}>
        <AddExerciseForm />
      </Modal>
    </div>
  );
}