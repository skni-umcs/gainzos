'use client';

import { useState, useMemo } from 'react';
import { CommonTable } from "../shared/common-table";
import { useQuotesColumns } from "./quotes-columns";
import { useQuotes } from "@/lib/hooks/quote";
import { useTranslations } from "next-intl";
import { FadeLoader } from "react-spinners";
import { QuoteFilters } from "./quote-filters";
import { Quote } from "@/lib/types/quote";

export function QuotesTable() {
  const { data: quotesData, isPending } = useQuotes();
  const t = useTranslations('entities.quotes');
  const columns = useQuotesColumns();

  // Stany filtrów
  const [showVulgar, setShowVulgar] = useState(false);
  const [showNonVulgar, setShowNonVulgar] = useState(false);

  // Filtrowane dane
  const filteredData = useMemo(() => {
    if (!quotesData) return [];

    return quotesData.filter((quote: Quote) => {
      if (!showVulgar && !showNonVulgar) return true;
      if (showVulgar && showNonVulgar) return true;
      if (showVulgar && !showNonVulgar) return quote.isVulgar === true;
      if (!showVulgar && showNonVulgar) return quote.isVulgar === false;
      return false;
    });
  }, [quotesData, showVulgar, showNonVulgar]);

  // Reset filtrów
  const handleResetFilters = () => {
    setShowVulgar(false);
    setShowNonVulgar(false);
  };

  const handleBulkDelete = () => {
    // Logika usuwania zaznaczonych cytatów
  };

  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-center py-10">
          <FadeLoader color="#4B5563" />
        </div>
      ) : (
        <CommonTable
          columns={columns}
          data={filteredData}
          searchPlaceholder={t('search.placeholder')}
          searchColumnKey="text"
          onBulkDelete={handleBulkDelete}
          filters={
            <QuoteFilters
              showVulgar={showVulgar}
              showNonVulgar={showNonVulgar}
              onShowVulgarChange={setShowVulgar}
              onShowNonVulgarChange={setShowNonVulgar}
              onReset={handleResetFilters}
            />
          }
        />
      )}
    </>
  );
}