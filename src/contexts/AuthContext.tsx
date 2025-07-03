import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, DatabaseOperations, X_API_CONFIG } from '../lib/supabase'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { AuthDebugger, ProviderConfigChecker } from '../lib/auth-debug'

interface AuthContextType {
  user: User | null
  session: Session | null
  userProfile: any | null
  loading: boolean
  signInWithProvider: (provider: 'twitter' | 'linkedin') => Promise<void>
  signOut: () => Promise<void>
  refreshUserProfile: () => Promise<void>
  debugAuthSystem: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userProfile, setUserProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Generate initial auth system report
    AuthDebugger.generateAuthReport()
    
    // Log X API configuration status
    console.group('🔧 X (Twitter) API Configuration')
    console.log('API Key:', X_API_CONFIG.apiKey ? '✅ Present' : '❌ Missing')
    console.log('API Secret:', X_API_CONFIG.apiSecret ? '✅ Present' : '❌ Missing')
    console.log('Client ID:', X_API_CONFIG.clientId ? '✅ Present' : '❌ Missing')
    console.log('Client Secret:', X_API_CONFIG.clientSecret ? '✅ Present' : '❌ Missing')
    console.log('Callback URL:', X_API_CONFIG.callbackUrl)
    console.groupEnd()
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      AuthDebugger.logAuthFlow('Initial Session Check', { 
        hasSession: !!session,
        userId: session?.user?.id 
      })
      
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
      AuthDebugger.logAuthFlow('Auth State Change', { 
        event, 
        hasSession: !!session,
        userId: session?.user?.id 
      })
      
      setSession(session)
      setUser(session?.user ?? null)
      
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          AuthDebugger.logAuthFlow('User Sign In Process Started')
          
          // Create or update user profile
          await handleUserSignIn(session.user)
          await loadUserProfile(session.user.id)
          
          // Navigate to dashboard after successful sign in
          navigate('/dashboard')
          toast.success('Successfully connected to X! Welcome to Postify!')
          
          AuthDebugger.logAuthFlow('User Sign In Process Completed')
        } catch (error) {
          AuthDebugger.logError(error, 'Sign In Process')
          toast.error('Connected successfully, but there was an issue setting up your profile.')
        }
      } else if (event === 'SIGNED_OUT') {
        AuthDebugger.logAuthFlow('User Signed Out')
        setUserProfile(null)
        navigate('/')
        toast.success('Successfully signed out!')
      } else if (event === 'TOKEN_REFRESHED') {
        AuthDebugger.logAuthFlow('Token Refreshed', { userId: session?.user?.id })
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleUserSignIn = async (user: User) => {
    try {
      AuthDebugger.logAuthFlow('Creating User Profile', {
        userId: user.id,
        email: user.email,
        metadata: user.user_metadata,
        provider: user.app_metadata?.provider
      })
      
      // Extract user data from different providers
      const userData = {
        id: user.id,
        email: user.email || '',
        name: extractUserName(user),
        avatar_url: extractAvatarUrl(user)
      }

      AuthDebugger.logAuthFlow('User Data Extracted', userData)

      const result = await DatabaseOperations.upsertUser(userData)
      
      if (!result) {
        throw new Error('Failed to create user profile')
      }

      AuthDebugger.logAuthFlow('User Profile Created Successfully', { profileId: result.id })
      
    } catch (error) {
      AuthDebugger.logError(error, 'User Sign In Handler')
      throw error
    }
  }

  const extractUserName = (user: User): string => {
    // Try different metadata fields based on provider
    const metadata = user.user_metadata || {}
    
    const name = (
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

    AuthDebugger.logAuthFlow('Name Extraction', { 
      extractedName: name,
      availableFields: Object.keys(metadata)
    })

    return name
  }

  const extractAvatarUrl = (user: User): string | undefined => {
    const metadata = user.user_metadata || {}
    
    const avatarUrl = (
      metadata.avatar_url ||
      metadata.picture ||
      metadata.profile_image_url ||
      metadata.profile_pic ||
      metadata.image ||
      undefined
    )

    AuthDebugger.logAuthFlow('Avatar URL Extraction', { 
      extractedUrl: avatarUrl,
      availableFields: Object.keys(metadata)
    })

    return avatarUrl
  }

  const loadUserProfile = async (userId: string) => {
    try {
      AuthDebugger.logAuthFlow('Loading User Profile', { userId })
      
      const profile = await DatabaseOperations.getUserById(userId)
      
      if (profile) {
        AuthDebugger.logAuthFlow('User Profile Loaded Successfully')
        setUserProfile(profile)
      } else {
        AuthDebugger.logAuthFlow('No User Profile Found', { userId })
      }
    } catch (error) {
      AuthDebugger.logError(error, 'Load User Profile')
    }
  }

  const signInWithProvider = async (provider: 'twitter' | 'linkedin') => {
    try {
      setLoading(true)
      
      AuthDebugger.logAuthFlow('OAuth Sign In Started', { provider })
      
      // Check provider status first
      const providerStatus = await ProviderConfigChecker.checkProviderStatus(provider)
      AuthDebugger.logAuthFlow('Provider Status Check', providerStatus)
      
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
      
      // Get the correct redirect URL
      const redirectTo = `${window.location.origin}/dashboard`
      
      const authOptions = {
        provider: supabaseProvider,
        options: {
          redirectTo: redirectTo,
          scopes: scopes,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      }
      
      AuthDebugger.logAuthFlow('OAuth Configuration', {
        provider: supabaseProvider,
        scopes,
        redirectTo: authOptions.options.redirectTo,
        origin: window.location.origin,
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
        xApiConfig: provider === 'twitter' ? {
          hasApiKey: !!X_API_CONFIG.apiKey,
          hasClientId: !!X_API_CONFIG.clientId,
          callbackUrl: X_API_CONFIG.callbackUrl
        } : null
      })

      const { data, error } = await supabase.auth.signInWithOAuth(authOptions)

      if (error) {
        AuthDebugger.logError(error, 'OAuth Sign In')
        
        // Enhanced error handling with specific messages
        let userFriendlyMessage = ''
        
        if (error.message.includes('provider is not enabled') || error.message.includes('validation_failed')) {
          userFriendlyMessage = `${provider === 'twitter' ? 'X (Twitter)' : 'LinkedIn'} authentication is not properly configured. Please check your OAuth credentials in Supabase.`
          
          // Log detailed configuration help
          console.group('🔧 CONFIGURATION ISSUE DETECTED')
          console.log(`The ${provider} provider appears to be misconfigured. Please verify:`)
          console.log('1. Provider is enabled in Supabase Dashboard → Authentication → Providers')
          console.log('2. Correct OAuth credentials are entered (API Key and Secret)')
          console.log('3. Callback URL is set to: https://kqjgrolqbwgavnhzkfdc.supabase.co/auth/v1/callback')
          console.log('4. Required scopes are configured')
          
          if (provider === 'twitter') {
            console.log('\n📱 Twitter/X Setup Instructions:')
            console.log('- Go to https://developer.twitter.com/en/portal/dashboard')
            console.log('- Create a new app or use existing one')
            console.log('- In Supabase Dashboard → Authentication → Providers → Twitter:')
            console.log(`  • API Key: ${X_API_CONFIG.apiKey}`)
            console.log(`  • API Secret Key: ${X_API_CONFIG.apiSecret}`)
            console.log(`  • Callback URL: ${X_API_CONFIG.callbackUrl}`)
            console.log('- Enable OAuth 2.0 with PKCE in your Twitter app settings')
            console.log('- Make sure your Twitter app has the required permissions')
          } else {
            console.log('\n💼 LinkedIn Setup:')
            console.log('- Go to https://developer.linkedin.com/apps')
            console.log('- Create a new app or use existing one')
            console.log('- Add "Sign In with LinkedIn using OpenID Connect" product')
            console.log('- Set redirect URL: https://kqjgrolqbwgavnhzkfdc.supabase.co/auth/v1/callback')
          }
          console.groupEnd()
          
        } else if (error.message.includes('Invalid login credentials')) {
          userFriendlyMessage = 'Invalid credentials. Please check your OAuth app configuration.'
        } else if (error.message.includes('Email not confirmed')) {
          userFriendlyMessage = 'Please confirm your email address before signing in.'
        } else if (error.message.includes('Too many requests')) {
          userFriendlyMessage = 'Too many login attempts. Please wait a moment and try again.'
        } else {
          userFriendlyMessage = `Failed to connect with ${provider === 'twitter' ? 'X (Twitter)' : 'LinkedIn'}: ${error.message}`
        }
        
        throw new Error(userFriendlyMessage)
      }

      AuthDebugger.logAuthFlow('OAuth Initiated Successfully', { 
        hasData: !!data,
        dataKeys: data ? Object.keys(data) : []
      })
      
    } catch (error) {
      AuthDebugger.logError(error, 'Sign In With Provider')
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
      AuthDebugger.logAuthFlow('Sign Out Started')
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        AuthDebugger.logError(error, 'Sign Out')
        toast.error('Failed to sign out')
        throw error
      }
      
      // Clear local state
      setUser(null)
      setSession(null)
      setUserProfile(null)
      
      AuthDebugger.logAuthFlow('Sign Out Completed')
      
    } catch (error) {
      AuthDebugger.logError(error, 'Sign Out Process')
    } finally {
      setLoading(false)
    }
  }

  const refreshUserProfile = async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }

  const debugAuthSystem = () => {
    AuthDebugger.generateAuthReport()
    
    // Test both providers
    ProviderConfigChecker.checkProviderStatus('twitter')
    ProviderConfigChecker.checkProviderStatus('linkedin')
    
    // Test connectivity
    AuthDebugger.testProviderConnectivity('twitter')
    AuthDebugger.testProviderConnectivity('linkedin')
    
    // Log X API configuration
    console.group('🔧 X (Twitter) API Configuration Status')
    console.log('Configuration Object:', X_API_CONFIG)
    console.log('All credentials present:', !!(
      X_API_CONFIG.apiKey && 
      X_API_CONFIG.apiSecret && 
      X_API_CONFIG.clientId && 
      X_API_CONFIG.clientSecret
    ))
    console.groupEnd()
  }

  const value = {
    user,
    session,
    userProfile,
    loading,
    signInWithProvider,
    signOut,
    refreshUserProfile,
    debugAuthSystem
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