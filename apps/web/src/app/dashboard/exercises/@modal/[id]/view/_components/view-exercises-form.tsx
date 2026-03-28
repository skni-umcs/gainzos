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
import { Exercise } from '@/lib/types/exercise';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useExercises } from '@/lib/hooks/exercise';
import { toast } from 'sonner';
import RingLoader from "react-spinners/RingLoader";

interface ViewExerciseFormProps {
  exerciseId: string;
}

export function ViewExercisesForm({ exerciseId }: ViewExerciseFormProps) {
  const tExercise = useTranslations('entities.exercises');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const { data: exercises, isLoading } = useExercises();

  const exercise = exercises?.find(type => type.id?.toString() === exerciseId);

  const onSubmit = async (data: Exercise) => {
    if (!exercise?.id) {
      toast.error('Brak ID typu ćwiczenia');
      return;
    }
  };

  const form = useForm<Exercise>({
    defaultValues: {
      id: exercise?.id || null,
      name: exercise?.name || '',
      description: exercise?.description || '',
      force: exercise?.force || '',
      primaryMuscle: exercise?.primaryMuscle || '',
      secondaryMuscle: exercise?.secondaryMuscle || '',
      image: exercise?.image || { id: 0 },
    },
  });

  useEffect(() => {
    if (exercise) {
      form.reset({
        id: exercise.id,
        name: exercise.name,
        description: exercise.description || '',
        force: exercise.force || '',
        primaryMuscle: exercise.primaryMuscle || '',
        secondaryMuscle: exercise.secondaryMuscle || '',
        image: exercise.image,
      });
    }
  }, [exercise, form]);

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <RingLoader size={40} color="#3b82f6" className="mx-auto" />
        <p className="mt-4">Ładowanie danych...</p>
      </div>
    );
  }

  if (!exercise) {
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
                <FormLabel>{tExercise('fields.name')}</FormLabel>
                <FormControl>
                  <Input placeholder={tExercise('fields.name_placeholder')}
                         {...field}
                         readOnly={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tExercise('fields.description')}</FormLabel>
                <FormControl>
                  <Input placeholder={tExercise('fields.description_placeholder')}
                         {...field}
                         readOnly={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="force"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Force</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Force type"
                    {...field}
                    readOnly={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="primaryMuscle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Muscle</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Primary muscle group"
                    {...field}
                    readOnly={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondaryMuscle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Muscle</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Secondary muscle group"
                    {...field}
                    readOnly={true}
                  />
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
                <FormLabel>{tExercise('fields.image')}</FormLabel>
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

          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tExercise('fields.video')}</FormLabel>
                {field.value?.id ? (
                  <video
                    src={`/api/media/${field.value.id}`}
                    controls
                    className="mt-2 w-32 h-32 object-cover rounded border"
                    preload={"metadata"}
                  />
                ) : (
                  <div className="mt-2 w-32 h-32 bg-muted rounded border flex items-center justify-center text-muted-foreground text-sm">
                    Brak video
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