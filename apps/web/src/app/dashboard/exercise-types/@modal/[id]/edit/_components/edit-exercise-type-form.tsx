'use client';

import { UploadImageCard } from '@/components/controls/upload-image-card';
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
import { useUpdateExerciseType, useExerciseTypes } from '@/lib/hooks/exercise-type';
import { toast } from 'sonner';
import { uploadFile, deleteFile } from '@/lib/api/media';
import RingLoader from "react-spinners/RingLoader";
import { Pencil } from "lucide-react";

interface EditExerciseTypeFormProps {
  exerciseTypeId: string;
}

export function EditExerciseTypeForm({ exerciseTypeId }: EditExerciseTypeFormProps) {
  const tExerciseTypes = useTranslations('entities.exerciseTypes');
  const tCommon = useTranslations('common');
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: updateExerciseType, isPending } = useUpdateExerciseType();
  const { data: exerciseTypes, isLoading } = useExerciseTypes();

  const exerciseType = exerciseTypes?.find(type => type.id?.toString() === exerciseTypeId);

  const handleFileChange = (file: File | null) => {
    setCurrentFile(file);
  };

  const onSubmit = async (data: ExerciseType) => {
    if (!exerciseType?.id) {
      toast.error('Brak ID typu ćwiczenia');
      return;
    }

    setIsUploading(true);

    try {
      let imageId = exerciseType.image?.id;
      const oldImageId = exerciseType.image?.id;

      if (currentFile) {
        const fileId = await uploadFile(currentFile);

        if (!fileId) {
          throw new Error('Failed to upload file');
        }

        imageId = fileId.id!;
      }

      const updatedExerciseType: ExerciseType = {
        id: exerciseType.id,
        name: data.name,
        image: {
          id: imageId!,
        },
      };

      updateExerciseType(updatedExerciseType, {
        onSuccess: async () => {
          // Jeśli był nowy obrazek, usuń stary
          if (currentFile && oldImageId && oldImageId !== imageId) {
            try {
              await deleteFile(oldImageId);
            } catch (err) {
              console.error('Error deleting old image:', err);
            }
          }

          queryClient.invalidateQueries({ queryKey: ['exercise-types'] });
          toast.success(tExerciseTypes('toast.success_edit'));
          router.back();
        },
        onError: (error) => {
          toast.error(tExerciseTypes('toast.error_edit'));

          if (currentFile && imageId && imageId !== oldImageId) {
            deleteFile(imageId).catch((err) =>
              console.error('Error deleting file after failed exercise type update:', err)
            );
          }

          console.error('Error updating exercise type:', error);
        },
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error(tExerciseTypes('toast.error_edit'));
    } finally {
      setIsUploading(false);
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
                  <Input placeholder={tExerciseTypes('fields.name_placeholder')} {...field} />
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
                <FormLabel>{tExerciseTypes('fields.image')}</FormLabel>
                <FormControl>
                  <UploadImageCard
                    onFileChange={handleFileChange}
                  />
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