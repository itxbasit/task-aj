// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Skip middleware for API routes and static files
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname;
  
  // Check for auth token in cookies (synced from localStorage)
  const authToken = request.cookies.get('auth-token')?.value;
  const isAuthenticated = !!authToken;

  console.log('🔐 Middleware - Path:', path);
  console.log('🔐 Middleware - Authenticated:', isAuthenticated);

  // Define public routes (no auth required)
  const publicRoutes = ['/', '/login', '/register'];
  const isPublicRoute = publicRoutes.includes(path);

  // If authenticated and trying to access login/register, redirect to home
  if (isAuthenticated && (path === '/login' || path === '/register')) {
    console.log('➡️ Redirecting to / from auth route');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If not authenticated and trying to access home, redirect to login
  if (!isAuthenticated && path === '/') {
    console.log('➡️ Redirecting to /login from home');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If not authenticated and trying to access protected routes
  const protectedRoutes = ['/documents'];
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  
  if (!isAuthenticated && isProtectedRoute) {
    console.log('➡️ Redirecting to /login from protected route');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};