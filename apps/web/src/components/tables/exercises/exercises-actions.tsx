'use client';

import { Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Exercise } from '@/lib/types/exercise';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { NAVIGATION } from '@/lib/config/navigation';

interface ExercisesActionsProps {
  exercise: Exercise;
}

export function ExercisesActions({ exercise }: ExercisesActionsProps) {
  const t = useTranslations('entities.exercises');
  const router = useRouter();

  const handleEdit = () => {
    router.push(NAVIGATION.EDIT_EXERCISE(exercise.id!));
  };

  const handleDelete = () => {
    router.push(NAVIGATION.DELETE_EXERCISE(exercise.id!));
  };

  const handleView = () => {
    router.push(NAVIGATION.VIEW_EXERCISE(exercise.id!));
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
