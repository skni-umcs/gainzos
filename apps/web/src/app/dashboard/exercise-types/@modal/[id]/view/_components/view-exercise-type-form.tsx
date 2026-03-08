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
import { useEffect } from 'react';
import { ExerciseType } from '@/lib/types/exercise-type';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useExerciseTypes } from '@/lib/hooks/exercise-type';
import { toast } from 'sonner';
import RingLoader from "react-spinners/RingLoader";

interface ViewExerciseTypeFormProps {
  exerciseTypeId: string;
}

export function ViewExerciseTypeForm({ exerciseTypeId }: ViewExerciseTypeFormProps) {
  const tExerciseTypes = useTranslations('entities.exerciseTypes');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const { data: exerciseTypes, isLoading } = useExerciseTypes();

  const exerciseType = exerciseTypes?.find(type => type.id?.toString() === exerciseTypeId);

  const onSubmit = async (data: ExerciseType) => {
    if (!exerciseType?.id) {
      toast.error('Brak ID typu ćwiczenia');
      return;
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
    return (
      <div className="p-6 text-center">
        <RingLoader size={40} color="#3b82f6" className="mx-auto" />
        <p className="mt-4">Ładowanie danych...</p>
      </div>
    );
  }

  if (!exerciseType) {
    return (
      <div className="p-6 text-center">
        <p className="text-destructive font-semibold">Nie znaleziono typu ćwiczenia</p>
        <Button onClick={() => router.back()} className="mt-4">
          Wróć
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tExerciseTypes('fields.name')}</FormLabel>
                <FormControl>
                  <Input placeholder={tExerciseTypes('fields.name_placeholder')} {...field} readOnly={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tExerciseTypes('fields.image')}</FormLabel>
                {field.value?.id ? (
                  <img
                    src={`/api/media/${field.value.id}`}
                    alt={form.getValues('name')}
                    className="mt-2 w-32 h-32 object-cover rounded border"
                  />
                ) : (
                  <div className="mt-2 w-32 h-32 bg-muted rounded border flex items-center justify-center text-muted-foreground text-sm">
                    Brak obrazka
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              {tCommon('actions.cancel')}
            </Button>

          </div>
        </form>
      </Form>
    </div>
  );
}