import 'server-only';

import { cookies } from 'next/headers';
import { UserSession } from '../types';

export async function getSession(): Promise<UserSession | null> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/validate`, {
        method: 'GET',
        headers: {
            Cookie: cookieHeader,
        },
        cache: 'no-store',
        credentials: 'include',
    });

    if (!res.ok) {
        return null;
    }

    return (await res.json()) as UserSession;
}
