'use client';

import { Page } from '@/components/layout/pages/custom-page';
import { PageTitle } from '@/components/layout/pages/page-title';
import { PageContent } from '@/components/layout/pages/page-content';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout/pages/page-header';
import { User } from 'lucide-react';
import { UsersTable } from '@/components/tables/users/users-table';

function UsersPage() {
  const tNavigation = useTranslations('navigation');

  return (
    <Page>
      <PageHeader>
        <PageTitle icon={User}>{tNavigation('users')}</PageTitle>
      </PageHeader>
      <PageContent>
        <UsersTable />
      </PageContent>
    </Page>
  );
}

export default UsersPage;