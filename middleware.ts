import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.cookies.has('Authorization')) {
    return NextResponse.next();
  }

  const response = NextResponse.redirect(new URL('/auth/login', request.url));
  response.cookies.set({
    name: "after-login",
    value: "/",
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60, // 1 hour
  });

  return response;
};

export const config = {
  matcher: '/none',
};
