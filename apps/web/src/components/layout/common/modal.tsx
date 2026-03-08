'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export function Modal({ title, children, className }: ModalProps) {
  const router = useRouter();

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
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
} 
