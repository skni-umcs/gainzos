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
import { Exercise } from '@/lib/types/exercise';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteExercise, useExercises } from '@/lib/hooks/exercise';
import { toast } from 'sonner';
import { deleteFile } from '@/lib/api/media';
import RingLoader from "react-spinners/RingLoader";
import { Trash2 } from "lucide-react";

interface DeleteExerciseFormProps {
  exerciseId: string;
}

export function DeleteExerciseForm({ exerciseId }: DeleteExerciseFormProps) {
  const tExercises = useTranslations('entities.exercises');
  const tCommon = useTranslations('common');

  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteExercise, isPending } = useDeleteExercise();
  const { data: exercises, isLoading } = useExercises();

  const exercise = exercises?.find(
    (ex) => ex.id?.toString() === exerciseId
  );

  const onSubmit = async () => {
    if (!exercise?.id) {
      toast.error('Brak ID ćwiczenia');
      return;
    }

    setIsDeleting(true);

    try {
      deleteExercise(exercise.id, {
        onSuccess: async () => {
          // DELETE IMAGE
          if (exercise.image?.id) {
            try {
              await deleteFile(exercise.image.id);
            } catch (err) {
              console.error('Błąd usuwania obrazka:', err);
            }
          }

          // DELETE VIDEO
          if (exercise.video?.id) {
            try {
              await deleteFile(exercise.video.id);
            } catch (err) {
              console.error('Błąd usuwania wideo:', err);
            }
          }

          queryClient.invalidateQueries({ queryKey: ['exercises'] });
          toast.success(tExercises('toast.success_delete'));
          router.back();
        },

        onError: (error) => {
          console.error('Błąd usuwania ćwiczenia:', error);
          toast.error(tExercises('toast.error_delete'));
        },
      });
    } catch (error) {
      console.error('Błąd podczas usuwania:', error);
      toast.error(tExercises('toast.error_delete'));
    } finally {
      setIsDeleting(false);
    }
  };

  const form = useForm<Exercise>({
    defaultValues: {
      id: exercise?.id || null,
      name: exercise?.name || '',
      image: exercise?.image || { id: 0 },
      video: exercise?.video || { id: 0 },
    },
  });

  useEffect(() => {
    if (exercise) {
      form.reset({
        id: exercise.id,
        name: exercise.name,
        image: exercise.image,
        video: exercise.video,
      });
    }
  }, [exercise, form]);

  if (isLoading) {
    return <div className="p-6 text-center">Ładowanie...</div>;
  }

  if (!exercise) {
    return <div className="p-6 text-center">Nie znaleziono ćwiczenia</div>;
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
              Ta akcja jest nieodwracalna. Ćwiczenie zostanie trwale usunięte razem ze zdjęciem i wideo.
            </p>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tExercises('fields.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="bg-muted" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
