import { Quote } from "@/lib/types/quote";

export async function fetchQuotes() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const res = await fetch(`${apiUrl}/api/quotes/getAll`, {
    method: 'GET',
    next: { revalidate: 60 },
    credentials: 'include',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch quotes');
  }

  const data = await res.json();
  return data as Quote[];
}

export async function addQuote(quote: Quote) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/quotes/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(quote),
  });

  if (!res.ok) {
    throw new Error('Failed to add quote');
  }

  const data = await res.text();
  const message = typeof data === 'string' 
    ? String(data) 
    : 'Success';
  return { message, success: true };
}

export async function updateQuote(quote: Quote) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const res = await fetch(`${apiUrl}/api/quotes/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quote),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to update quote');
  }

  const data = await res.json();
  const message = typeof data === 'object' && data !== null && 'message' in data 
    ? String(data.message) 
    : 'Success';
  return { message, success: true };
}

export async function deleteQuote(quoteId: number) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const res = await fetch(`${apiUrl}/api/quotes/${quoteId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to delete quote');
  }

  const data = await res.json();
  const message = typeof data === 'object' && data !== null && 'message' in data
    ? String(data.message)
    : 'Success';
  return { message, success: true };
}

export async function getQuoteById(quoteId: number) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/quotes/${quoteId}`, {
    method: 'GET',
    next: { revalidate: 60 },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch quote');
  }

  const data = await res.json();
  return data as Quote;
}