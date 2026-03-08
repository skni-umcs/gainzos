'use client';

import { Modal } from '@/components/layout/common/modal';
import { EditQuoteForm } from './_components/edit-quote-form';
import { useTranslations } from 'next-intl';
import { use } from 'react';
import { useQuote } from '@/lib/hooks/quote';

interface EditQuoteModalProps {
  params: Promise<{ id: string }>;
}

export default function EditQuoteModal({ params }: EditQuoteModalProps) {
  const tQuote = useTranslations('entities.quotes.actions');
  const { id } = use(params);
  const quote = useQuote(parseInt(id)).data;

  if (!quote) {
    return null;
  }

  return (
    <Modal title={tQuote('editQuote')}>
      <EditQuoteForm quote={quote} />
    </Modal>
  );
}
