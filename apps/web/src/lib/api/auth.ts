import { User } from '@/lib/types/user';
import { AuthResponse } from '@/lib/types/auth';

export async function getUsers() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/auth/getAll`, {
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

export async function registerUser(user: User) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const data = {
    username: user.username,
    email: user.email,
    password: user.password,
  };

  const res = await fetch(`${apiUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to add user');
  }

  const response = await res.json();
  return response;
}

export async function loginUser(user: User) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const data = {
    email: user.email,
    password: user.password,
  };


  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Failed to login user' }));
    throw new Error(errorData.error || 'Failed to login user');
  }

  const response = await res.json();
  return response;
}

export async function logoutUser() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to logout user');
  }
  return await res.json();
}

export async function validateUser(detailed: boolean = false) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const url = detailed 
      ? `${apiUrl}/api/auth/session?detailed=true`
      : `${apiUrl}/api/auth/session`;
      
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data as AuthResponse;
  } catch (error) {
    console.error('Failed to validate user:', error);
    return null;
  }
}
