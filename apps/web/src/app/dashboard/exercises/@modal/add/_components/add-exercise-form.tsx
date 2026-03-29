'use client';

import { UploadImageCard } from "@/components/controls/upload-image-card";
import { UploadVideoCard } from "@/components/controls/upload-video-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Exercise } from "@/lib/types/exercise";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { usePostExercise } from "@/lib/hooks/exercise";
import { toast } from "sonner";
import { uploadFile, deleteFile } from "@/lib/api/media";
import RingLoader from "react-spinners/RingLoader";
import { Sparkles } from "lucide-react";
import { useExerciseTypes } from '@/lib/hooks/exercise-type';
import { ExerciseTypeSelect } from '@/components/controls/select-exercise-types';
import { Media } from "@/lib/types/media";

export function AddExerciseForm() {
  const tExercises = useTranslations("entities.exercises");
  const tCommon = useTranslations("common");
  const [currentImageFile, setCurrentImageFile] = useState<File | null>(null);
  const [currentVideoFile, setCurrentVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: postExercise, isPending } = usePostExercise();
  const { data: exerciseTypes, isLoading: isLoadingTypes, isError: isErrorTypes } = useExerciseTypes();

  const handleImageFileChange = (file: File | null) => {
    setCurrentImageFile(file);
  };

  const handleVideoFileChange = (file: File | null) => {
    setCurrentVideoFile(file);
  }

  const onSubmit = async (data: Exercise) => {
    setIsUploading(true);

    try {
      const imageMedia: Media = await uploadFile(currentImageFile!);  
      const videoMedia: Media = await uploadFile(currentVideoFile!);

      console.log("Uploaded image media:", imageMedia);
      console.log("Uploaded video media:", videoMedia);

      if (!imageMedia?.id || !videoMedia?.id) {
        throw new Error("Failed to upload file");
      }

      const newExercise: Exercise = {
        id: null,
        name: data.name,
        description: data.description,
        force: data.force,
        primaryMuscle: data.primaryMuscle,
        secondaryMuscle: data.secondaryMuscle,
        exercisesType: data.exercisesType,
        image: {
          id: imageMedia.id,
        },
        video: {
          id: videoMedia.id,
        },
      };

      postExercise(newExercise, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["exercises"] });
          toast.success(tExercises("toast.success_add"));
          router.back();
        },
        onError: (error) => {
          toast.error(tExercises("toast.error_add"));
          if (imageMedia?.id) {
            deleteFile(imageMedia.id).catch((err) =>
              console.error("Error deleting image after failed exercise add:", err)
            );
          }
          if (videoMedia?.id) {
            deleteFile(videoMedia.id).catch((err) =>
              console.error("Error deleting video after failed exercise add:", err)
            );
          }
          console.error("Error adding exercise:", error);
        },
      });
    } catch (error) {
      toast.error(tExercises("toast.error_add"));
      console.error("Error adding exercise:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const form = useForm<Exercise>({
    defaultValues: {
      id: null,
      name: "",
      description: "",
      force: "",
      primaryMuscle: "",
      secondaryMuscle: "",
      exercisesType: undefined,
      image: {
        id: 0,
      },
      video: {
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
                <FormLabel>{tExercises("fields.name")}</FormLabel>
                <FormControl>
                  <Input placeholder={tExercises("fields.name_placeholder")} {...field} />
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
                <FormLabel>{tExercises("fields.description")}</FormLabel>
                <FormControl>
                  <Input placeholder={tExercises("fields.description_placeholder")} {...field} />
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
            name="exercisesType"
            render={({ field }) => (
              <FormItem>
                <ExerciseTypeSelect
                  value={field.value ?? null}
                  onChange={field.onChange}
                  isLoading={isLoadingTypes}
                  isError={isErrorTypes}
                  exerciseTypes={exerciseTypes}
                  label={tExercises("fields.exercise_type")}
                  placeholder={tExercises("fields.exercise_type_placeholder")}
                  loadingText={tExercises("states.loading")}
                  errorText={tExercises("states.error_loading_types")}
                  emptyText={tExercises("states.no_types_available")}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>{tExercises("fields.image")}</FormLabel>
                <FormControl>
                  <UploadImageCard onFileChange={handleImageFileChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="video"
            render={() => (
              <FormItem>
                <FormLabel>{tExercises("fields.video")}</FormLabel>
                <FormControl>
                  <UploadVideoCard onFileChange={handleVideoFileChange} />
                </FormControl>
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
              {(isPending || isUploading) ? (
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