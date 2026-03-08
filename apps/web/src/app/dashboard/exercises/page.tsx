'use client';

import { Page } from '@/components/layout/pages/custom-page';
import { PageTitle } from '@/components/layout/pages/page-title';
import { PageContent } from '@/components/layout/pages/page-content';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout/pages/page-header';
import { Button } from '@/components/ui/button';
import { BicepsFlexed, Plus } from 'lucide-react';
import { NAVIGATION } from '@/lib/config/navigation';
import Link from 'next/link';
import { ExercisesTable } from '@/components/tables/exercises/exercises-table';

export default function ExercisesPage() {
  const tNavigation = useTranslations('navigation');
  const tActions = useTranslations('common.actions');

  return (
    <Page>
      <PageHeader>
        <PageTitle icon={BicepsFlexed}>{tNavigation('exercises')}</PageTitle>
        <Button variant="add" asChild>
          <Link href={NAVIGATION.ADD_EXERCISE} className="flex items-center gap-2">
            <Plus className="size-4" />
            {tActions('add')}
          </Link>
        </Button>
      </PageHeader>
      <PageContent>
        <ExercisesTable />
      </PageContent>
    </Page>
  );
}