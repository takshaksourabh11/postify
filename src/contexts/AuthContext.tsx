import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, DatabaseOperations } from '../lib/supabase'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id)
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
      console.log('Auth state change:', event, session?.user?.id)
      
      setSession(session)
      setUser(session?.user ?? null)
      
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          console.log('User signed in, creating profile...')
          // Create or update user profile
          await handleUserSignIn(session.user)
          await loadUserProfile(session.user.id)
          
          // Navigate to dashboard after successful sign in
          navigate('/dashboard')
          toast.success('Successfully connected! Welcome to Postify!')
        } catch (error) {
          console.error('Error during sign in process:', error)
          toast.error('Connected successfully, but there was an issue setting up your profile.')
        }
      } else if (event === 'SIGNED_OUT') {
        setUserProfile(null)
        navigate('/')
        toast.success('Successfully signed out!')
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed for user:', session?.user?.id)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleUserSignIn = async (user: User) => {
    try {
      console.log('Creating/updating user profile for:', user.id)
      console.log('User metadata:', user.user_metadata)
      
      // Extract user data from different providers
      const userData = {
        id: user.id,
        email: user.email || '',
        name: extractUserName(user),
        avatar_url: extractAvatarUrl(user)
      }

      console.log('User data to upsert:', userData)

      const result = await DatabaseOperations.upsertUser(userData)
      
      if (!result) {
        throw new Error('Failed to create user profile')
      }

      console.log('User profile created/updated successfully:', result.id)
      
    } catch (error) {
      console.error('Error handling user sign in:', error)
      throw error
    }
  }

  const extractUserName = (user: User): string => {
    // Try different metadata fields based on provider
    const metadata = user.user_metadata || {}
    
    return (
      metadata.full_name ||
      metadata.name ||
      metadata.display_name ||
      metadata.preferred_username ||
      metadata.username ||
      metadata.screen_name ||
      metadata.given_name ||
      metadata.first_name ||
      user.email?.split('@')[0] ||
      'User'
    )
  }

  const extractAvatarUrl = (user: User): string | undefined => {
    const metadata = user.user_metadata || {}
    
    return (
      metadata.avatar_url ||
      metadata.picture ||
      metadata.profile_image_url ||
      metadata.profile_pic ||
      metadata.image ||
      undefined
    )
  }

  const loadUserProfile = async (userId: string) => {
    try {
      console.log('Loading user profile for:', userId)
      const profile = await DatabaseOperations.getUserById(userId)
      
      if (profile) {
        console.log('User profile loaded successfully')
        setUserProfile(profile)
      } else {
        console.warn('No user profile found for:', userId)
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  const signInWithProvider = async (provider: 'twitter' | 'linkedin') => {
    try {
      setLoading(true)
      
      // Map provider names to Supabase provider names
      const providerMap = {
        twitter: 'twitter',
        linkedin: 'linkedin_oidc'
      } as const

      const supabaseProvider = providerMap[provider]
      
      // Define comprehensive scopes for each provider
      const scopeMap = {
        twitter: 'tweet.read tweet.write users.read follows.read offline.access like.read like.write',
        linkedin_oidc: 'openid profile email w_member_social r_liteprofile r_emailaddress'
      }

      const scopes = scopeMap[supabaseProvider]
      
      console.log('Initiating OAuth with provider:', supabaseProvider, 'scopes:', scopes)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: supabaseProvider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          scopes: scopes,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      })

      if (error) {
        console.error('OAuth error:', error)
        
        // Handle specific error cases
        if (error.message.includes('provider is not enabled')) {
          throw new Error(`${provider === 'twitter' ? 'X (Twitter)' : 'LinkedIn'} authentication is not configured yet. Please contact support or try the other provider.`)
        } else if (error.message.includes('validation_failed')) {
          throw new Error(`Authentication configuration error. Please try again or contact support.`)
        } else {
          throw new Error(`Failed to connect with ${provider === 'twitter' ? 'X (Twitter)' : 'LinkedIn'}: ${error.message}`)
        }
      }

      console.log('OAuth initiated successfully:', data)
      
    } catch (error) {
      console.error('Sign in error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      console.log('Signing out user')
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        toast.error('Failed to sign out')
        throw error
      }
      
      // Clear local state
      setUser(null)
      setSession(null)
      setUserProfile(null)
      
    } catch (error) {
      console.error('Sign out error:', error)
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