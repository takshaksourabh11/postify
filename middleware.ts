import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

/**
 * Middleware for protecting routes and handling authentication
 * Runs before every request to protected routes
 */
export default withAuth(
  function middleware(req) {
    // Get the pathname of the request
    const { pathname } = req.nextUrl;
    
    // Check if user is accessing admin routes
    if (pathname.startsWith('/admin')) {
      // Add admin role check here if needed
      // if (req.nextauth.token?.role !== 'admin') {
      //   return NextResponse.redirect(new URL('/unauthorized', req.url));
      // }
    }
    
    // Check if user has valid subscription for premium features
    if (pathname.startsWith('/premium')) {
      const userPlan = req.nextauth.token?.planType;
      if (userPlan !== 'premium') {
        return NextResponse.redirect(new URL('/upgrade', req.url));
      }
    }
    
    // Allow the request to continue
    return NextResponse.next();
  },
  {
    callbacks: {
      /**
       * Determine if the request should be processed by the middleware
       */
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Public routes that don't require authentication
        const publicRoutes = ['/', '/auth', '/pricing', '/about'];
        if (publicRoutes.some(route => pathname.startsWith(route))) {
          return true;
        }
        
        // API routes that don't require authentication
        const publicApiRoutes = ['/api/auth', '/api/public'];
        if (publicApiRoutes.some(route => pathname.startsWith(route))) {
          return true;
        }
        
        // All other routes require authentication
        return !!token;
      },
    },
  }
);

/**
 * Configure which routes should be processed by the middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};