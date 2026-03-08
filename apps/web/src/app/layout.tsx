
import "./globals.css";
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/providers/providers';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html lang="pl">
      <body >
        <Providers messages={messages}>
          <Toaster position="top-right" className='bg-gainzos-bg-light/50'/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
