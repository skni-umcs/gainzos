'use client';

import { Modal } from '@/components/layout/common/modal';
import { EditExerciseTypeForm } from './_components/edit-exercise-type-form';
import { useTranslations } from 'next-intl';
import { use } from 'react';

interface EditExerciseTypeModalProps {
  params: Promise<{ id: string }>;
}

export default function EditExerciseTypeModal({ params }: EditExerciseTypeModalProps) {
  const tExerciseTypes = useTranslations('entities.exerciseTypes.actions');
  const { id } = use(params);

  return (
    <Modal title={tExerciseTypes('editExerciseType')}>
      <EditExerciseTypeForm exerciseTypeId={id} />
    </Modal>
  );
}