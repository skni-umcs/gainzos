'use client';

import { UploadImageCard } from '@/components/controls/upload-image-card';
import { UploadVideoCard } from '@/components/controls/upload-video-card';

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

import { useUpdateExercise, useExercises } from '@/lib/hooks/exercise';
import { uploadFile, deleteFile } from '@/lib/api/media';

import { toast } from 'sonner';
import RingLoader from 'react-spinners/RingLoader';
import { Pencil } from 'lucide-react';

interface EditExerciseFormProps {
  exerciseId: string;
}

export function EditExerciseForm({ exerciseId }: EditExerciseFormProps) {
  const tExercises = useTranslations('entities.exercises');
  const tCommon = useTranslations('common');

  const [currentImageFile, setCurrentImageFile] = useState<File | null>(null);
  const [currentVideoFile, setCurrentVideoFile] = useState<File | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updateExercise, isPending } = useUpdateExercise();
  const { data: exercises, isLoading } = useExercises();

  const exercise = exercises?.find(
    (type) => type.id?.toString() === exerciseId
  );

  const handleImageChange = (file: File | null) => {
    setCurrentImageFile(file);
  };

  const handleVideoChange = (file: File | null) => {
    setCurrentVideoFile(file);
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
      video: exercise?.video || { id: 0 },
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
        video: exercise.video,
      });
    }
  }, [exercise, form]);

  const onSubmit = async (data: Exercise) => {
    if (!exercise?.id) {
      toast.error('Brak ID typu ćwiczenia');
      return;
    }

    setIsUploading(true);

    try {
      let imageId = exercise.image?.id;
      const oldImageId = exercise.image?.id;

      if (currentImageFile) {
        const fileId = await uploadFile(currentImageFile);
        if (!fileId) throw new Error('Failed to upload image');
        imageId = fileId.id!;
      }

      let videoId = exercise.video?.id;
      const oldVideoId = exercise.video?.id;

      if (currentVideoFile) {
        const fileId = await uploadFile(currentVideoFile);
        if (!fileId) throw new Error('Failed to upload video');
        videoId = fileId.id!;
      }

      const updatedExercise = {
        id: exercise.id,
        name: data.name,
        description: data.description,
        force: data.force,
        primaryMuscle: data.primaryMuscle,
        secondaryMuscle: data.secondaryMuscle,
        exercisesType: {
          id: Number(exerciseId),
          name: exercise.name ?? null,
        },
        image: {
          id: imageId!,
        },
        video: {
          id: videoId!,
        },
      };

      updateExercise(updatedExercise, {
        onSuccess: async () => {
          if (currentImageFile && oldImageId && oldImageId !== imageId) {
            try {
              await deleteFile(oldImageId);
            } catch (err) {
              console.error('Error deleting old image:', err);
            }
          }

          if (currentVideoFile && oldVideoId && oldVideoId !== videoId) {
            try {
              await deleteFile(oldVideoId);
            } catch (err) {
              console.error('Error deleting old video:', err);
            }
          }

          queryClient.invalidateQueries({ queryKey: ['exercise-types'] });
          toast.success(tExercises('toast.success_edit'));
          router.back();
        },

        onError: (error) => {
          toast.error(tExercises('toast.error_edit'));

          if (currentImageFile && imageId && imageId !== oldImageId) {
            deleteFile(imageId).catch((err) =>
              console.error('Error deleting image after failed update:', err)
            );
          }

          if (currentVideoFile && videoId && videoId !== oldVideoId) {
            deleteFile(videoId).catch((err) =>
              console.error('Error deleting video after failed update:', err)
            );
          }

          console.error('Error updating exercise type:', error);
        },
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error(tExercises('toast.error_edit'));
    } finally {
      setIsUploading(false);
    }
  };

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
        <p className="text-destructive font-semibold">
          Nie znaleziono typu ćwiczenia
        </p>
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
                <FormLabel>{tExercises('fields.name')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={tExercises('fields.name_placeholder')}
                    {...field}
                  />
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
                <FormLabel>{tExercises('fields.description')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={tExercises('fields.description_placeholder')}
                    {...field}
                  />
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
                    placeholder="Enter force type (e.g., Push, Pull)"
                    {...field}
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
                    placeholder="Enter primary muscle group"
                    {...field}
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
                    placeholder="Enter secondary muscle group (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>{tExercises('fields.image')}</FormLabel>
                <FormControl>
                  <UploadImageCard onFileChange={handleImageChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="video"
            render={() => (
              <FormItem>
                <FormLabel>{tExercises('fields.video')}</FormLabel>
                <FormControl>
                  <UploadVideoCard onFileChange={handleVideoChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending || isUploading}
              className="flex-1"
            >
              {tCommon('actions.cancel')}
            </Button>

            <Button
              type="submit"
              variant="default"
              disabled={isPending || isUploading}
              className="flex-1"
            >
              {isPending || isUploading ? (
                <>
                  <RingLoader size={24} color="#ffffff" />
                  <span className="ml-2">{tCommon('actions.loading')}</span>
                </>
              ) : (
                <>
                  <Pencil className="size-4" />
                  <span className="ml-2">{tCommon('actions.edit')}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
