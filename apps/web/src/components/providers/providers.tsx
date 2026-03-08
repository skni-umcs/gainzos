'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { useState } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
}

export function Providers({ children, messages }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextIntlClientProvider messages={messages} locale="pl">
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
