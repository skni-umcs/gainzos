import { useMutation } from '@tanstack/react-query';
import { Quote } from '@/lib/types/quote';
import { useQuery } from '@tanstack/react-query';
import { api } from '../react-query/api';

export function usePostQuote() {
  return useMutation({
    mutationKey: ['post-quote'],
    mutationFn: (newQuote: Quote) => api.quotes.add(newQuote),
  });
}

export function useQuotes() {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: api.quotes.getAll,
  });
}

export function useUpdateQuote() {
  return useMutation({
    mutationKey: ['update-quote'],
    mutationFn: (updatedQuote: Quote) => api.quotes.update(updatedQuote),
  });
}

export function useDeleteQuote() {
  return useMutation({
    mutationKey: ['delete-quote'],
    mutationFn: (quoteId: number) => api.quotes.delete(quoteId),
  });
}
