import { useMutation } from '@tanstack/react-query';
import { addQuote, updateQuote, deleteQuote, fetchQuotes, getQuoteById } from '@/lib/api/quotes';
import { Quote } from '@/lib/types/quote';
import { useQuery } from '@tanstack/react-query';

export function usePostQuote() {
  return useMutation({
    mutationKey: ['post-quote'],
    mutationFn: (newQuote: Quote) => addQuote(newQuote),
  });
}

export function useQuotes() {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: fetchQuotes,
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useUpdateQuote() {
  return useMutation({
    mutationKey: ['update-quote'],
    mutationFn: (updatedQuote: Quote) => updateQuote(updatedQuote),
  });
}

export function useDeleteQuote() {
  return useMutation({
    mutationKey: ['delete-quote'],
    mutationFn: (quoteId: number) => deleteQuote(quoteId),
  });
}

export function useQuote(quoteId: number) {
  return useQuery({
    queryKey: ['quote', quoteId],
    queryFn: () => getQuoteById(quoteId),
  });
}