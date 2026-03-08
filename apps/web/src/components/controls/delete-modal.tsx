'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

interface DeleteModalProps {
  title: string;
  description: string;
  className?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteModal({ title, description, className, isPending, onConfirm, onClose }: DeleteModalProps) {
  const router = useRouter();
  const t = useTranslations('common');

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className={`max-w-6xl w-[90vw] max-h-[90vh] gainzos-bg-light gainzos-text border-gainzos-border overflow-hidden flex flex-col ${className ?? ''}`}>
        <DialogTitle className="text-2xl font-bold gainzos-text-bright pb-4 border-b border-gainzos-border">
          {title}
        </DialogTitle>
        <div className="flex-1 overflow-auto pt-4">
          {description}
        </div>
        <Button variant="destructive" onClick={onConfirm} disabled={isPending}>
          {isPending ? t('deleting') : t('confirmDelete')}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          {t('cancel')}
        </Button>
      </DialogContent>
    </Dialog>
  );
} 
