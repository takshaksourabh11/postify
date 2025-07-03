import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, DatabaseOperations, X_API_CONFIG } from '../lib/supabase'
import { toast } from 'sonner'
import { useNavigate, useLocation } from 'react-router-dom'
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
  const location = useLocation()

  useEffect(() => {
    console.group('🚀 AUTH SYSTEM INITIALIZATION')
    console.log('Current URL:', window.location.href)
    console.log('Current Path:', location.pathname)
    console.log('Search Params:', location.search)
    
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
    
    // Check for OAuth callback parameters - CRITICAL FIX
    const urlParams = new URLSearchParams(location.search)
    const authCode = urlParams.get('code')
    const error = urlParams.get('error')
    const errorDescription = urlParams.get('error_description')
    
    if (authCode) {
      console.log('🔍 OAuth callback detected with code:', authCode.substring(0, 10) + '...')
      console.log('🚨 CRITICAL: OAuth callback should be handled by Supabase, not our app!')
      
      // This indicates a configuration problem - the callback URL is wrong
      console.error('❌ CONFIGURATION ERROR: OAuth callback URL is misconfigured!')
      console.error('Expected: Supabase should handle the callback at /auth/v1/callback')
      console.error('Actual: Our app is receiving the callback directly')
      
      toast.error('OAuth configuration error. Please check callback URL settings.')
      
      // Clear the URL parameters to prevent loops
      const cleanUrl = window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
    }
    
    if (error) {
      console.error('❌ OAuth error detected:', error, errorDescription)
      toast.error(`Authentication failed: ${errorDescription || error}`)
    }
    
    console.groupEnd()
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.group('🔍 INITIAL SESSION CHECK')
      console.log('Session exists:', !!session)
      console.log('User ID:', session?.user?.id)
      console.log('Provider:', session?.user?.app_metadata?.provider)
      console.log('Email:', session?.user?.email)
      console.log('Session error:', error)
      console.groupEnd()
      
      AuthDebugger.logAuthFlow('Initial Session Check', { 
        hasSession: !!session,
        userId: session?.user?.id,
        hasAuthCode: !!authCode,
        provider: session?.user?.app_metadata?.provider
      })
      
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        console.log('👤 User found in session, loading profile...')
        loadUserProfile(session.user.id)
      }
      
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.group('🔄 AUTH STATE CHANGE')
      console.log('Event:', event)
      console.log('Session exists:', !!session)
      console.log('User ID:', session?.user?.id)
      console.log('Provider:', session?.user?.app_metadata?.provider)
      console.log('Current path:', location.pathname)
      console.groupEnd()
      
      AuthDebugger.logAuthFlow('Auth State Change', { 
        event, 
        hasSession: !!session,
        userId: session?.user?.id,
        currentPath: location.pathname,
        provider: session?.user?.app_metadata?.provider
      })
      
      setSession(session)
      setUser(session?.user ?? null)
      
      if (event === 'SIGNED_IN' && session?.user) {
        console.group('✅ USER SIGNED IN - PROCESSING')
        console.log('User metadata:', session.user.user_metadata)
        console.log('App metadata:', session.user.app_metadata)
        
        try {
          AuthDebugger.logAuthFlow('User Sign In Process Started')
          
          // Create or update user profile with enhanced error handling
          console.log('🔄 Starting user profile creation/update...')
          await handleUserSignIn(session.user)
          
          console.log('📋 Loading user profile...')
          await loadUserProfile(session.user.id)
          
          // Navigate to dashboard after successful sign in
          console.log('🚀 Redirecting to dashboard after successful authentication')
          navigate('/dashboard', { replace: true })
          toast.success('Successfully connected to X! Welcome to Postify!')
          
          AuthDebugger.logAuthFlow('User Sign In Process Completed')
        } catch (error) {
          console.error('❌ Error in sign in process:', error)
          AuthDebugger.logError(error, 'Sign In Process')
          
          // Show error but still navigate to dashboard
          toast.error('Connected successfully, but there was an issue setting up your profile. You can still use the dashboard.')
          navigate('/dashboard', { replace: true })
        }
        console.groupEnd()
        
      } else if (event === 'SIGNED_OUT') {
        console.log('👋 User signed out')
        AuthDebugger.logAuthFlow('User Signed Out')
        setUserProfile(null)
        navigate('/', { replace: true })
        toast.success('Successfully signed out!')
        
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('🔄 Token refreshed')
        AuthDebugger.logAuthFlow('Token Refreshed', { userId: session?.user?.id })
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [navigate, location])

  const handleUserSignIn = async (user: User) => {
    const maxRetries = 3
    let lastError: Error | null = null

    console.group('👤 USER PROFILE CREATION/UPDATE')
    console.log('User ID:', user.id)
    console.log('Email:', user.email)
    console.log('Provider:', user.app_metadata?.provider)
    console.log('User metadata keys:', Object.keys(user.user_metadata || {}))

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt}/${maxRetries} - Creating/updating user profile`)
        
        AuthDebugger.logAuthFlow(`Creating User Profile (Attempt ${attempt}/${maxRetries})`, {
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

        console.log('📝 Extracted user data:', userData)
        AuthDebugger.logAuthFlow('User Data Extracted', userData)

        const result = await DatabaseOperations.upsertUser(userData)
        
        if (result) {
          console.log('✅ User profile created/updated successfully:', result.id)
          AuthDebugger.logAuthFlow('User Profile Created Successfully', { profileId: result.id })
          console.groupEnd()
          return result
        } else {
          throw new Error('Failed to create user profile - no data returned')
        }
        
      } catch (error) {
        console.error(`❌ Attempt ${attempt} failed:`, error)
        AuthDebugger.logError(error, `User Sign In Handler (Attempt ${attempt})`)
        lastError = error instanceof Error ? error : new Error('Unknown error')
        
        // Check if it's a non-retryable error
        if (error instanceof Error) {
          const errorMessage = error.message.toLowerCase()
          if (
            errorMessage.includes('jwt') || 
            errorMessage.includes('permission') ||
            errorMessage.includes('rls') ||
            errorMessage.includes('unauthorized') ||
            errorMessage.includes('forbidden')
          ) {
            console.log('🚫 Non-retryable error detected, stopping attempts')
            break
          }
        }
        
        if (attempt === maxRetries) {
          console.log('🔥 All retry attempts exhausted')
          break
        }
        
        // Wait before retry with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
        console.log(`⏳ Retrying in ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    // Log the final error but don't throw - allow user to proceed
    if (lastError) {
      console.warn('⚠️ User profile creation failed after all attempts:', lastError.message)
      console.warn('🔄 User will still be able to access the dashboard')
    }
    
    console.groupEnd()
  }

  const extractUserName = (user: User): string => {
    // Try different metadata fields based on provider
    const metadata = user.user_metadata || {}
    
    console.log('🏷️ Extracting name from metadata:', metadata)
    
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

    console.log('📝 Extracted name:', name)
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

    console.log('🖼️ Extracted avatar URL:', avatarUrl)
    AuthDebugger.logAuthFlow('Avatar URL Extraction', { 
      extractedUrl: avatarUrl,
      availableFields: Object.keys(metadata)
    })

    return avatarUrl
  }

  const loadUserProfile = async (userId: string) => {
    const maxRetries = 3
    let lastError: Error | null = null

    console.group('📋 LOADING USER PROFILE')
    console.log('User ID:', userId)

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt}/${maxRetries} - Loading user profile`)
        AuthDebugger.logAuthFlow(`Loading User Profile (Attempt ${attempt}/${maxRetries})`, { userId })
        
        const profile = await DatabaseOperations.getUserById(userId)
        
        if (profile) {
          console.log('✅ User profile loaded successfully:', profile.id)
          AuthDebugger.logAuthFlow('User Profile Loaded Successfully')
          setUserProfile(profile)
          console.groupEnd()
          return
        } else {
          console.log('👤 No user profile found in database')
          AuthDebugger.logAuthFlow('No User Profile Found', { userId })
          console.groupEnd()
          return
        }
      } catch (error) {
        console.error(`❌ Attempt ${attempt} failed:`, error)
        AuthDebugger.logError(error, `Load User Profile (Attempt ${attempt})`)
        lastError = error instanceof Error ? error : new Error('Unknown error')
        
        if (attempt === maxRetries) {
          console.error('🔥 Failed to load user profile after all retries:', lastError)
          console.groupEnd()
          return
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
      }
    }
    
    console.groupEnd()
  }

  const signInWithProvider = async (provider: 'twitter' | 'linkedin') => {
    try {
      setLoading(true)
      
      console.group('🚀 OAUTH SIGN IN PROCESS')
      console.log('Provider:', provider)
      console.log('Current URL:', window.location.href)
      
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
      
      // CRITICAL FIX: Use Supabase's callback URL, not our app URL
      const redirectTo = `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/callback`
      
      console.log('🔧 CRITICAL FIX: Using Supabase callback URL instead of app URL')
      console.log('Previous (incorrect):', `${window.location.origin}/dashboard`)
      console.log('New (correct):', redirectTo)
      
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
      
      console.log('🔧 OAuth Configuration:', {
        provider: supabaseProvider,
        scopes,
        redirectTo: authOptions.options.redirectTo,
        origin: window.location.origin,
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL
      })
      
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

      console.log('🚀 Initiating OAuth with Supabase callback URL:', redirectTo)

      const { data, error } = await supabase.auth.signInWithOAuth(authOptions)

      if (error) {
        console.error('❌ OAuth error:', error)
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
        
        console.groupEnd()
        throw new Error(userFriendlyMessage)
      }

      console.log('✅ OAuth initiated successfully')
      console.log('Redirect URL:', data?.url)
      
      AuthDebugger.logAuthFlow('OAuth Initiated Successfully', { 
        hasData: !!data,
        dataKeys: data ? Object.keys(data) : [],
        redirectUrl: data?.url
      })

      console.log('🔄 User will be redirected to provider for authentication...')
      console.groupEnd()
      
    } catch (error) {
      console.error('❌ Sign in error:', error)
      console.groupEnd()
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
      console.log('👋 Starting sign out process...')
      AuthDebugger.logAuthFlow('Sign Out Started')
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('❌ Sign out error:', error)
        AuthDebugger.logError(error, 'Sign Out')
        toast.error('Failed to sign out')
        throw error
      }
      
      // Clear local state
      setUser(null)
      setSession(null)
      setUserProfile(null)
      
      console.log('✅ Sign out completed successfully')
      AuthDebugger.logAuthFlow('Sign Out Completed')
      
    } catch (error) {
      console.error('❌ Sign out process error:', error)
      AuthDebugger.logError(error, 'Sign Out Process')
    } finally {
      setLoading(false)
    }
  }

  const refreshUserProfile = async () => {
    if (user) {
      console.log('🔄 Refreshing user profile...')
      await loadUserProfile(user.id)
    }
  }

  const debugAuthSystem = () => {
    console.group('🔍 AUTH SYSTEM DEBUG')
    
    AuthDebugger.generateAuthReport()
    
    // Test both providers
    ProviderConfigChecker.checkProviderStatus('twitter')
    ProviderConfigChecker.checkProviderStatus('linkedin')
    
    // Test connectivity
    AuthDebugger.testProviderConnectivity('twitter')
    AuthDebugger.testProviderConnectivity('linkedin')
    
    // Log current state
    console.log('Current Auth State:', {
      user: !!user,
      session: !!session,
      userProfile: !!userProfile,
      loading,
      currentPath: location.pathname
    })
    
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
    
    // CRITICAL: Check callback URL configuration
    console.group('🚨 CALLBACK URL CONFIGURATION CHECK')
    console.log('Current app origin:', window.location.origin)
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
    console.log('Expected callback URL:', `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/callback`)
    console.log('X API callback URL:', X_API_CONFIG.callbackUrl)
    console.log('Callback URLs match:', X_API_CONFIG.callbackUrl === `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/callback`)
    
    if (X_API_CONFIG.callbackUrl !== `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/callback`) {
      console.error('❌ CALLBACK URL MISMATCH!')
      console.error('This is likely the cause of the redirect issue.')
      console.error('Please update the callback URL in your X Developer Portal to:', `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/callback`)
    } else {
      console.log('✅ Callback URLs are correctly configured')
    }
    console.groupEnd()
    
    console.groupEnd()
    toast.success('Debug information logged to console. Check browser developer tools.')
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