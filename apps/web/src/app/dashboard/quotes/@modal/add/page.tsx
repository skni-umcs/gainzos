'use client'

import { Modal } from '@/components/layout/common/modal'
import  { AddQuoteForm } from './_components/quote-add-form'
import { useTranslations } from 'next-intl';

export default function AddQuotePage() {
  const t = useTranslations('entities.quotes.actions');

  return (
    <div>
      <Modal
        title={t('addQuote')}
      >
        <AddQuoteForm />
      </Modal>
    </div>
  )
}