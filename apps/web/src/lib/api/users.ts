import { User } from '@/lib/types/user';

export async function getUsers() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/user/getAll`, {
    method: 'GET',
    credentials: 'include',
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await res.json();
  return data as User[];
}