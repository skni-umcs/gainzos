'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { queryClient } from '@/lib/react-query/query-client';

interface ProvidersProps {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
}

export function Providers({ children, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider messages={messages} locale="pl">
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
