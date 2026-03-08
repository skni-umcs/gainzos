"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 gainzos-success" />,
        info: <InfoIcon className="size-4 gainzos-info" />,
        warning: <TriangleAlertIcon className="size-4 gainzos-warning" />,
        error: <OctagonXIcon className="size-4 gainzos-error" />,
        loading: <Loader2Icon className="size-4 animate-spin gainzos-blue" />,
      }}
      toastOptions={{
        classNames: {
          toast: 'gainzos-bg-light border-gainzos-border shadow-lg',
          title: 'gainzos-text-bright font-semibold',
          description: 'gainzos-text',
          actionButton: 'gainzos-accent gainzos-text-bright',
          cancelButton: 'gainzos-bg-lighter gainzos-text',
          success: 'border-l-4 border-l-[var(--color-gainzos-success)]',
          error: 'border-l-4 border-l-[var(--color-gainzos-error)]',
          warning: 'border-l-4 border-l-[var(--color-gainzos-warning)]',
          info: 'border-l-4 border-l-[var(--color-gainzos-info)]',
        },
      }}
      style={
        {
          "--normal-bg": "var(--color-gainzos-bg-light)",
          "--normal-text": "var(--color-gainzos-text-bright)",
          "--normal-border": "var(--color-gainzos-border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
