'use client';

import { FormControl, FormLabel } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ExerciseType } from '@/lib/types/exercise-type'

interface ExerciseTypeSelectProps {
  value: ExerciseType | { id: number } | null | undefined
  onChange: (value: ExerciseType | { id: number } | null | undefined) => void
  isLoading?: boolean
  isError?: boolean
  exerciseTypes?: ExerciseType[] | null | undefined
  label: string
  placeholder: string
  loadingText?: string
  errorText?: string
  emptyText?: string
}

export function ExerciseTypeSelect({
  value,
  onChange,
  isLoading = false,
  isError = false,
  exerciseTypes = [],
  label,
  placeholder,
  loadingText = "Loading...",
  errorText = "Error loading types",
  emptyText = "No types available",
}: ExerciseTypeSelectProps) {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        {isLoading ? (
          <div className="text-sm text-muted-foreground">{loadingText}</div>
        ) : isError ? (
          <div className="text-sm text-red-500">{errorText}</div>
        ) : !exerciseTypes || exerciseTypes.length === 0 ? (
          <div className="text-sm text-yellow-600">{emptyText}</div>
        ) : (
          <Select
            value={value?.id?.toString() ?? ""}
            onValueChange={(val) => {
              const id = Number(val)
              const selected = exerciseTypes.find((t) => t.id === id) ?? null
              onChange(selected)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder ?? "Wybierz typ"} />
            </SelectTrigger>
            <SelectContent>
              {exerciseTypes.map((t, i) => (
                <SelectItem
                  key={t?.id ?? `exercise-type-${i}`}
                  value={t?.id?.toString() ?? ""}
                >
                  {t?.name ?? ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormControl>
    </>
  )
}