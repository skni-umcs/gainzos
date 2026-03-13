import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/server/get-session';

const PUBLIC_PATHS = ['/login', '/register'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
    if (isPublicPath) {
        return NextResponse.next();
    }

    const session = await getSession();

    if (!session) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
    ],
};