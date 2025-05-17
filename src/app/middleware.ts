import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

const protectedRoutes = ['/dictionary', '/recommend', '/training'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // якщо йдемо на захищену сторінку без токену
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // якщо на login/register і вже є токен — редірект у dictionary
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/dictionary', request.url));
  }

  return NextResponse.next();
}
