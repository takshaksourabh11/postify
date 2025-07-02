import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, DatabaseOperations } from '../lib/supabase'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null
  session: Session | null
  userProfile: any | null
  loading: boolean
  signInWithProvider: (provider: 'twitter' | 'linkedin') => Promise<void>
  signOut: () => Promise<void>
  refreshUserProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userProfile, setUserProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (event === 'SIGNED_IN' && session?.user) {
        // Create or update user profile
        await handleUserSignIn(session.user)
        await loadUserProfile(session.user.id)
        toast.success('Successfully signed in!')
      } else if (event === 'SIGNED_OUT') {
        setUserProfile(null)
        toast.success('Successfully signed out!')
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleUserSignIn = async (user: User) => {
    try {
      await DatabaseOperations.upsertUser({
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture
      })
    } catch (error) {
      console.error('Error handling user sign in:', error)
    }
  }

  const loadUserProfile = async (userId: string) => {
    try {
      const profile = await DatabaseOperations.getUserById(userId)
      setUserProfile(profile)
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  const signInWithProvider = async (provider: 'twitter' | 'linkedin') => {
    try {
      setLoading(true)
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider === 'twitter' ? 'twitter' : 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          scopes: provider === 'twitter' 
            ? 'tweet.read users.read follows.read offline.access'
            : 'r_liteprofile r_emailaddress w_member_social'
        }
      })

      if (error) {
        console.error('Auth error:', error)
        toast.error(`Failed to sign in with ${provider}`)
      }
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out error:', error)
        toast.error('Failed to sign out')
      }
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const refreshUserProfile = async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }

  const value = {
    user,
    session,
    userProfile,
    loading,
    signInWithProvider,
    signOut,
    refreshUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}