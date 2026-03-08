'use client';

import { CommonFilters } from '../shared/common-filters';
import { useTranslations } from 'next-intl';

interface QuoteFiltersProps {
  showVulgar: boolean;
  showNonVulgar: boolean;
  onShowVulgarChange: (value: boolean) => void;
  onShowNonVulgarChange: (value: boolean) => void;
  onReset: () => void;
}

export function QuoteFilters({
  showVulgar,
  showNonVulgar,
  onShowVulgarChange,
  onShowNonVulgarChange,
  onReset,
}: QuoteFiltersProps) {
  const t = useTranslations('entities.quotes');
  const tCommon = useTranslations('common');

  const filterOptions = [
    {
      id: 'non-vulgar',
      label: t('filters.show_clean'),
      checked: showNonVulgar,
      onCheckedChange: onShowNonVulgarChange,
    },
    {
      id: 'vulgar',
      label: t('filters.show_vulgar'),
      checked: showVulgar,
      onCheckedChange: onShowVulgarChange,
    },
  ];

  return (
    <CommonFilters
      title={t('filters.title')}
      filterByLabel={t('filters.filter_by')}
      resetLabel={tCommon('actions.reset_filters')}
      filterOptions={filterOptions}
      onReset={onReset}
    />
  );
}