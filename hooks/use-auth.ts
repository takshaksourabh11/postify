"use client";

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useCallback } from 'react';

/**
 * Custom hook for authentication management
 * Provides authentication state and methods
 */
export function useAuth() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * Sign in with a specific provider
   */
  const login = useCallback(async (provider: 'twitter' | 'linkedin') => {
    setIsLoading(true);
    try {
      await signIn(provider, { 
        callbackUrl: '/dashboard',
        redirect: true 
      });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  /**
   * Sign out the current user
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  /**
   * Check if user has a specific permission
   */
  const hasPermission = useCallback((permission: string) => {
    // Implement your permission logic here
    // This could check user roles, subscription status, etc.
    return true;
  }, [session]);
  
  /**
   * Check if user has premium subscription
   */
  const isPremium = useCallback(() => {
    return session?.user?.planType === 'premium';
  }, [session]);
  
  return {
    // Authentication state
    user: session?.user || null,
    isAuthenticated: !!session,
    isLoading: status === 'loading' || isLoading,
    
    // Authentication methods
    login,
    logout,
    
    // Permission checks
    hasPermission,
    isPremium,
    
    // Session data
    session,
  };
}