"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";
import { useTranslations } from "next-intl";

interface UploadVideoCardProps {
  onFileChange?: (file: File | null) => void;
  maxSize?: number;
  accept?: Record<string, string[]>;
  className?: string;
}

export function UploadVideoCard({
  onFileChange,
  maxSize = 50 * 1024 * 1024,
  accept = { "video/*": [".mp4", ".webm", ".mov", ".avi", ".mkv"] },
  className,
}: UploadVideoCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[]) => {
      const f = accepted[0];
      if (!f) return;
      if (preview) URL.revokeObjectURL(preview);

      const url = f.type.startsWith("video/") ? URL.createObjectURL(f) : null;
      setFile(f);
      setPreview(url);
      onFileChange?.(f);
    },
    [preview, onFileChange]
  );

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    onFileChange?.(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize,
    accept,
  });

  const tFiles = useTranslations("files.upload");

  return (
    <div className={cn("space-y-4", className)}>
      {!file ? (
        <Card
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed cursor-pointer transition-all",
            isDragActive
              ? "border-gainzos-blue bg-gainzos-blue/10"
              : "border-gainzos-border bg-gainzos-bg"
          )}
        >
          <CardContent className="px-4 py-2 text-center flex items-center justify-center min-h-20">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2">
              <Upload className="size-6 text-gainzos-text-bright" />
              <p className="text-sm text-gainzos-text-bright">
                {tFiles('drop_here')}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-gainzos-border bg-gainzos-bg">
          <CardContent className="px-4 py-2 flex items-center gap-4 min-h-20">
            {preview ? (
              <video
                src={preview}
                className="rounded-md border object-cover size-16"
                muted
              />
            ) : (
              <div className="size-16 flex items-center justify-center border rounded-md bg-gainzos-sidebar shrink-0">
                <File className="size-8 text-gainzos-text-bright" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gainzos-text-bright truncate">{file.name}</p>
              <p className="text-xs text-gainzos-text-bright">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              onClick={removeFile}
              variant="destructive"
              size="icon-sm"
              className="shrink-0"
            >
              <X className="size-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
