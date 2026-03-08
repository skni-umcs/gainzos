'use client';

import { Page } from '@/components/layout/pages/custom-page';
import { PageTitle } from '@/components/layout/pages/page-title';
import { PageContent } from '@/components/layout/pages/page-content';
import { PageHeader } from '@/components/layout/pages/page-header';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { TypeOutline, Plus } from 'lucide-react';
import { NAVIGATION } from '@/lib/config/navigation';
import Link from 'next/link';
import { ExerciseTypesTable } from '@/components/tables/exercise-types/exercise-types-table';

export default function ExerciseTypesPage() {
  const tNavigation = useTranslations('navigation');
  const tActions = useTranslations('common.actions');

  return (
    <Page>
      <PageHeader>
        <PageTitle icon={TypeOutline}>{tNavigation('exercise_types')}</PageTitle>
        <Button variant="add" asChild>
          <Link href={NAVIGATION.ADD_EXERCISE_TYPE} className="flex items-center gap-2">
            <Plus className="size-4" />
            {tActions('add')}
          </Link>
        </Button>
      </PageHeader>
      <PageContent>
        <ExerciseTypesTable />
      </PageContent>
    </Page>
  );
}
