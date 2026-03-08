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
import { useState } from 'react';
import { ExerciseType } from '@/lib/types/exercise-type';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { usePostExerciseType } from '@/lib/hooks/exercise-type';
import { toast } from 'sonner';
import { uploadFile, deleteFile } from '@/lib/api/media';
import RingLoader from "react-spinners/RingLoader";
import { Sparkles } from "lucide-react";


export function AddExerciseTypeForm() {
  const tExerciseTypes = useTranslations('entities.exerciseTypes');
  const tCommon = useTranslations('common');
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: postExerciseType, isPending } = usePostExerciseType();

  const handleFileChange = (file: File | null) => {
    setCurrentFile(file);
  };

  const onSubmit = async (data: ExerciseType) => {
    setIsUploading(true);

    try {
      const fileId = await uploadFile(currentFile!);

      if (!fileId) {
        throw new Error('Failed to upload file');
      }

      const newExerciseType: ExerciseType = {
        name: data.name,
        image: {
          id: fileId.id!,
        },
      };

      postExerciseType(newExerciseType, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['exercise-types'] });
          toast.success(tExerciseTypes('toast.success_add'));
          router.back();
        },
        onError: (error) => {
          toast.error(tExerciseTypes('toast.error_add'));
          if (fileId.id) {
            deleteFile(fileId.id).catch((err) =>
              console.error('Error deleting file after failed exercise type add:', err)
            );
          }
          console.error('Error adding exercise type:', error);
        },
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const form = useForm<ExerciseType>({
    defaultValues: {
      id: null,
      name: '',
      image: {
        id: 0,
      },
    },
  });

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
                  <UploadImageCard onFileChange={handleFileChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
             <Button
              type="button"
              variant="default"
              onClick={() => router.back()}
              disabled={isPending}
              className="flex-1 cursor-pointer"
            >
              {tCommon('actions.cancel')}
            </Button>

            <Button type="submit" variant="add" disabled={isPending || isUploading} className="flex-1 cursor-pointer">
              {isPending ? (
                <>
                  <RingLoader size={24} color="#082445" />
                  {tCommon('actions.loading')}
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> {tCommon('actions.add')}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
