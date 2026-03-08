'use client';

import { Edit, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quote } from '@/lib/types/quote';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { NAVIGATION } from '@/lib/config/navigation';
import { toast } from 'sonner';
import { useDeleteQuote } from '@/lib/hooks/quote';
import { useState } from 'react';
import { DeleteModal } from '@/components/controls/delete-modal';
import { useQueryClient } from '@tanstack/react-query';

interface QuotesActionsProps {
  quote: Quote;
}

export function QuotesActions({ quote }: QuotesActionsProps) {
  const t = useTranslations('entities.quotes');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteQuote, isPending } = useDeleteQuote();

  const handleEdit = () => {
    router.push(NAVIGATION.EDIT_QUOTE(quote.id!));
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    toast.success(t('toast.copy_success'));
  };

  const handleDeleteConfirm = () => {
    deleteQuote(quote.id!, {
      onSuccess: () => {
        toast.success(t('toast.success_delete'));
        queryClient.invalidateQueries({ queryKey: ['quotes'] });
        setIsDeleteModalOpen(false);
        router.push(NAVIGATION.QUOTES);
      },
      onError: () => {
        toast.error(t('toast.error_delete'));
      }
    });
  };

  return (
    <>
    <div className="flex items-center gap-2 justify-end">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Copy className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('actions.copy')}</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Edit className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('actions.edit')}</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('actions.delete')}</TooltipContent>
      </Tooltip>
    </div>

    {isDeleteModalOpen && (
      <DeleteModal
        title={t('deleteModal.title')}
        description={t('deleteModal.description')}
        onConfirm={() => {
          handleDeleteConfirm();
        }}
        onClose={() => {
          setIsDeleteModalOpen(false);
          router.push(NAVIGATION.QUOTES);
        }}
        isPending={isPending}
        className="max-w-md"
      />
    )}
    </>
  );
}
