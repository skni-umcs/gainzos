'use client';
import { Page } from '@/components/layout/pages/custom-page';
import { PageTitle } from '@/components/layout/pages/page-title';
import { PageContent } from '@/components/layout/pages/page-content';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout/pages/page-header';
import { Button } from '@/components/ui/button';
import { Quote, Plus } from 'lucide-react';
import { NAVIGATION } from '@/lib/config/navigation';
import Link from 'next/link';
import { QuotesTable } from '@/components/tables/quotes/quotes-table';

export default function QuotesPage() {
  const tNavigation = useTranslations('navigation');
  const tActions = useTranslations('common.actions');

  return (
    <Page>
      <PageHeader>
        <PageTitle icon={Quote}>{tNavigation('quotes')}</PageTitle>
        <Button variant="add" asChild>
          <Link href={NAVIGATION.ADD_QUOTE} className="flex items-center gap-2">
            <Plus className="size-4" />
            {tActions('add')}
          </Link>
        </Button>
      </PageHeader>
      <PageContent>
        <QuotesTable />
      </PageContent>
    </Page>
  );
}
