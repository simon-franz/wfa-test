import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const authCookie = (await cookies()).get('auth')?.value;
  const hasAccess = authCookie === 'msfwab';

  // Skip auth check for login page and API routes
  const isLoginPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname.match(/^\/[^/]+\/login$/);
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/');

  if (isApiRoute || isLoginPage) {
    return intlMiddleware(request);
  }

  if (!hasAccess) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
