'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { ExerciseType } from '@/lib/types/exercise-type';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteExerciseType, useExerciseTypes } from '@/lib/hooks/exercise-type';
import { toast } from 'sonner';
import { deleteFile } from '@/lib/api/media';
import RingLoader from "react-spinners/RingLoader";
import { Trash2 } from "lucide-react";

interface DeleteExerciseTypeFormProps {
  exerciseTypeId: string;
}

export function DeleteExerciseTypeForm({ exerciseTypeId }: DeleteExerciseTypeFormProps) {
  const tExerciseTypes = useTranslations('entities.exerciseTypes');
  const tCommon = useTranslations('common');
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: deleteExerciseType, isPending } = useDeleteExerciseType();
  const { data: exerciseTypes, isLoading } = useExerciseTypes();

  const exerciseType = exerciseTypes?.find(type => type.id?.toString() === exerciseTypeId);

  const onSubmit = async () => {
    if (!exerciseType?.id) {
      toast.error('Brak ID typu ćwiczenia');
      return;
    }

    setIsDeleting(true);

    try {
      deleteExerciseType(exerciseType.id.toString(), {
        onSuccess: async () => {
          if (exerciseType.image?.id) {
            try {
              await deleteFile(exerciseType.image.id);
            } catch (err) {
              console.error('Błąd usuwania obrazka:', err);
            }
          }

          queryClient.invalidateQueries({ queryKey: ['exercise-types'] });
          toast.success(tExerciseTypes('toast.success_delete'));
          router.back();
        },
        onError: (error) => {
          toast.error(tExerciseTypes('toast.error_delete'));
          console.error('Błąd usuwania typu ćwiczenia:', error);
        },
      });
    } catch (error) {
      console.error('Błąd podczas usuwania:', error);
      toast.error(tExerciseTypes('toast.error_delete'));
    } finally {
      setIsDeleting(false);
    }
  };

  const form = useForm<ExerciseType>({
    defaultValues: {
      id: exerciseType?.id || null,
      name: exerciseType?.name || '',
      image: exerciseType?.image || { id: 0 },
    },
  });

  useEffect(() => {
    if (exerciseType) {
      form.reset({
        id: exerciseType.id,
        name: exerciseType.name,
        image: exerciseType.image,
      });
    }
  }, [exerciseType, form]);

  if (isLoading) {
    return <div className="p-6 text-center">Ładowanie...</div>;
  }

  if (!exerciseType) {
    return <div className="p-6 text-center">Nie znaleziono typu ćwiczenia</div>;
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="rounded-lg border p-4 bg-destructive/10">
            <h3 className="font-semibold mb-2 text-destructive">
              ⚠️ Ostrzeżenie
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ta akcja jest nieodwracalna. Typ ćwiczenia zostanie trwale usunięty.
            </p>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tExerciseTypes('fields.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="bg-muted" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {exerciseType.image?.id && (
              <div className="mt-4">
                <FormLabel>{tExerciseTypes('fields.image')}</FormLabel>
                <img
                  src={`/api/media/${exerciseType.image.id}`}
                  alt={exerciseType.name}
                  className="mt-2 w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending || isDeleting}
              className="flex-1"
            >
              {tCommon('actions.cancel')}
            </Button>

            <Button
              type="submit"
              variant="destructive"
              disabled={isPending || isDeleting}
              className="flex-1"
            >
              {isPending || isDeleting ? (
                <>
                  <RingLoader size={24} color="#ffffff" />
                  <span className="ml-2">{tCommon('actions.loading')}</span>
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  <span className="ml-2">{tCommon('actions.delete')}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}