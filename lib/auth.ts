import { NextAuthOptions } from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import LinkedInProvider from 'next-auth/providers/linkedin';
import { JWT } from 'next-auth/jwt';

/**
 * NextAuth.js configuration for social authentication
 * Implements OAuth2.0 with Twitter and LinkedIn providers
 */
export const authOptions: NextAuthOptions = {
  providers: [
    /**
     * Twitter OAuth2.0 Provider Configuration
     * Requires Twitter API v2 credentials
     */
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope: "users.read tweet.read follows.read offline.access",
        },
      },
    }),
    
    /**
     * LinkedIn OAuth2.0 Provider Configuration
     * Requires LinkedIn API credentials
     */
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "r_liteprofile r_emailaddress w_member_social",
        },
      },
    }),
  ],
  
  /**
   * Database adapter configuration
   * In production, replace with your database adapter
   */
  // adapter: PrismaAdapter(prisma),
  
  /**
   * Custom pages for authentication flow
   */
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  
  /**
   * Session configuration
   * Uses JWT for stateless sessions
   */
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  /**
   * JWT configuration with custom token handling
   */
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  /**
   * Callback functions for customizing authentication flow
   */
  callbacks: {
    /**
     * JWT callback - runs whenever a JWT is created, updated, or accessed
     * Used to persist additional user data in the token
     */
    async jwt({ token, user, account, profile }) {
      // Initial sign in
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
        
        // Store provider-specific user data
        if (account.provider === 'twitter') {
          token.twitterId = profile?.id;
          token.username = profile?.username;
        } else if (account.provider === 'linkedin') {
          token.linkedinId = profile?.id;
        }
        
        // Create or update user in database
        await createOrUpdateUser({
          email: user.email!,
          name: user.name!,
          image: user.image,
          provider: account.provider,
          providerId: profile?.id!,
          accessToken: account.access_token!,
          refreshToken: account.refresh_token,
        });
      }
      
      return token;
    },
    
    /**
     * Session callback - runs whenever a session is checked
     * Used to send properties to the client
     */
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken as string;
      session.provider = token.provider as string;
      session.user.id = token.sub!;
      
      return session;
    },
    
    /**
     * Redirect callback - controls where users are redirected after authentication
     */
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful authentication
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  
  /**
   * Event handlers for logging and analytics
   */
  events: {
    async signIn({ user, account, profile }) {
      console.log(`User ${user.email} signed in with ${account?.provider}`);
      
      // Track sign-in event for analytics
      // await analytics.track('user_signed_in', {
      //   userId: user.id,
      //   provider: account?.provider,
      //   timestamp: new Date().toISOString(),
      // });
    },
    
    async signOut({ token }) {
      console.log(`User signed out`);
      
      // Track sign-out event for analytics
      // await analytics.track('user_signed_out', {
      //   userId: token.sub,
      //   timestamp: new Date().toISOString(),
      // });
    },
  },
  
  /**
   * Enable debug mode in development
   */
  debug: process.env.NODE_ENV === 'development',
};

/**
 * User data interface for database operations
 */
interface CreateUserData {
  email: string;
  name: string;
  image?: string | null;
  provider: string;
  providerId: string;
  accessToken: string;
  refreshToken?: string | null;
}

/**
 * Create or update user in database
 * Handles user creation and updates during authentication
 */
async function createOrUpdateUser(userData: CreateUserData) {
  try {
    // In production, replace with your database operations
    // Example with Prisma:
    /*
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        image: userData.image,
        lastLoginAt: new Date(),
        // Update access tokens
        accounts: {
          upsert: {
            where: {
              provider_providerAccountId: {
                provider: userData.provider,
                providerAccountId: userData.providerId,
              },
            },
            update: {
              access_token: userData.accessToken,
              refresh_token: userData.refreshToken,
            },
            create: {
              type: 'oauth',
              provider: userData.provider,
              providerAccountId: userData.providerId,
              access_token: userData.accessToken,
              refresh_token: userData.refreshToken,
            },
          },
        },
      },
      create: {
        email: userData.email,
        name: userData.name,
        image: userData.image,
        emailVerified: new Date(),
        createdAt: new Date(),
        accounts: {
          create: {
            type: 'oauth',
            provider: userData.provider,
            providerAccountId: userData.providerId,
            access_token: userData.accessToken,
            refresh_token: userData.refreshToken,
          },
        },
      },
    });
    
    return user;
    */
    
    // Temporary console log for development
    console.log('Creating/updating user:', userData);
    
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw new Error('Failed to create or update user');
  }
}