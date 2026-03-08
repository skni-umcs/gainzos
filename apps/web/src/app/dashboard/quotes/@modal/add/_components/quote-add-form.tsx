'use client';

import { Quote } from '@/lib/types/quote';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { usePostQuote } from '@/lib/hooks/quote';
import { useQueryClient } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { RingLoader } from 'react-spinners';
 
export function AddQuoteForm() {
  const router = useRouter();
  const form = useForm<Quote>({
    defaultValues: {
      text: '',
      author: '',
      isVulgar: false,
    },
  });
  const { mutate: postQuote, isPending } = usePostQuote();
  const queryClient = useQueryClient();
  const tQuote = useTranslations('entities.quotes');
  const tCommon = useTranslations('common');

  const onSubmit = (data: Quote) => {
    const newQuote: Quote = {
      text: data.text,
      author: data.author,
      isVulgar: data.isVulgar || false,
    };

    postQuote(newQuote, {
      onSuccess: () => {
        toast.success(tQuote('toast.success_add'));
        queryClient.invalidateQueries({ queryKey: ['quotes'] });
        form.reset();
      },
      onError: (error) => {
        toast.error(tQuote('toast.error_add'));
        console.error('Error adding quote:', error);
      },
    });
  };

  return (
    <div className="space-y-6 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="text"
            rules={{ required: tQuote('fields.text_required') }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base gainzos-text-bright">{tQuote('fields.text')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={tQuote('fields.text_placeholder')}
                    className="min-h-[150px] gainzos-bg-light/50 gainzos-text-bright placeholder:gainzos-text-dim"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="gainzos-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            rules={{ required: tQuote('fields.author_required') }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base gainzos-text-bright">{tQuote('fields.author')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={tQuote('fields.author_placeholder')}
                    className="min-h-[50px] gainzos-bg-light/50 gainzos-text-bright placeholder:gainzos-text-dim"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="gainzos-error" />
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
                    🔞 {tQuote('fields.is_vulgar')}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="default"
              onClick={() => router.back()}
              disabled={isPending}
              className="flex-1 cursor-pointer"
            >
              {tCommon('actions.cancel')}
            </Button>
            <Button type="submit" variant="add" disabled={isPending} className="flex-1 cursor-pointer">
              {isPending ? (
                <>
                  <RingLoader size={24} color="#082445" />
                  {tCommon('actions.loading')}
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> {tCommon('actions.add')}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
