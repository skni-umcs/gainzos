'use client';

import { Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExerciseType } from '@/lib/types/exercise-type';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { NAVIGATION } from '@/lib/config/navigation';
import { useRouter } from 'next/navigation';

interface ExerciseTypesActionsProps {
  exerciseType: ExerciseType;
}

export function ExerciseTypesActions({ exerciseType }: ExerciseTypesActionsProps) {
  const t = useTranslations('entities.exerciseTypes');
  const router = useRouter();

  const handleEdit = () => {
    router.push(NAVIGATION.EDIT_EXERCISE_TYPE(exerciseType.id!));
  };

  const handleDelete = () => {
    router.push(NAVIGATION.DELETE_EXERCISE_TYPE(exerciseType.id!));
  };

  const handleView = () => {
    router.push(NAVIGATION.VIEW_EXERCISE_TYPE(exerciseType.id!));
  };

  return (
      <div className="flex items-center gap-2 justify-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                handleView();
              }}
            >
              <Eye className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('actions.view')}</TooltipContent>
        </Tooltip>


      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Edit className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('actions.edit')}</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('actions.delete')}</TooltipContent>
      </Tooltip>
    </div>
  );
}