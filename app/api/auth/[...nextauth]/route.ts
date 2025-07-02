import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * NextAuth.js API route handler
 * Handles all authentication requests (/api/auth/*)
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };