'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

import { Quote } from '@/lib/types/quote';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { useUpdateQuote, useQuotes } from '@/lib/hooks/quote';
import { toast } from 'sonner';

import RingLoader from 'react-spinners/RingLoader';
import { Pencil } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface EditQuoteFormProps {
  quote: Quote
}

export function EditQuoteForm({ quote }: EditQuoteFormProps) {
  const tQuotes = useTranslations('entities.quotes');
  const tCommon = useTranslations('common');

  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updateQuote, isPending } = useUpdateQuote();
  const { data: quotes, isLoading } = useQuotes();


  const form = useForm<Quote>({
    defaultValues: {
      id: quote?.id ?? null,
      author: quote?.author ?? '',
      text: quote?.text ?? '',
      isVulgar: quote?.isVulgar ?? false,
    },
  });

  useEffect(() => {
    if (quote) {
      form.reset({
        id: quote.id,
        author: quote.author,
        text: quote.text,
        isVulgar: quote.isVulgar,
      });
    }
  }, [quote, form]);

  const onSubmit = async (data: Quote) => {
    if (!quote?.id) {
      toast.error('Brak ID cytatu');
      return;
    }

    setIsUploading(true);

    try {
      const updatedQuote = {
        id: quote.id,
        author: data.author,
        text: data.text,
        isVulgar: data.isVulgar,
      };

      updateQuote(updatedQuote, {
        onSuccess: async () => {
          queryClient.invalidateQueries({ queryKey: ['quotes'] });
          toast.success(tQuotes('toast.success_edit'));
          router.back();
        },

        onError: (error) => {
          toast.error(tQuotes('toast.error_edit'));
          console.error('Error updating quote:', error);
        },
      });
    } catch (error) {
      toast.error(tQuotes('toast.error_edit'));
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <RingLoader size={40} color="#3b82f6" className="mx-auto" />
        <p className="mt-4">Ładowanie danych...</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="p-6 text-center">
        <p className="text-destructive font-semibold">
          Nie znaleziono cytatu
        </p>
        <Button onClick={() => router.back()} className="mt-4">
          Wróć
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tQuotes('fields.author')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={tQuotes('fields.author_placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tQuotes('fields.text')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={tQuotes('fields.text_placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isVulgar"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-gainzos-border p-4 gainzos-bg-light/30">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-base gainzos-text cursor-pointer">
                    🔞 {tQuotes('fields.is_vulgar')}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending || isUploading}
              className="flex-1"
            >
              {tCommon('actions.cancel')}
            </Button>

            <Button
              type="submit"
              variant="default"
              disabled={isPending || isUploading}
              className="flex-1"
            >
              {isPending || isUploading ? (
                <>
                  <RingLoader size={24} color="#ffffff" />
                  <span className="ml-2">{tCommon('actions.loading')}</span>
                </>
              ) : (
                <>
                  <Pencil className="size-4" />
                  <span className="ml-2">{tCommon('actions.edit')}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
