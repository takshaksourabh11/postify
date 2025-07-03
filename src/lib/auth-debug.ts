/**
 * Authentication Debug Utilities
 * Comprehensive logging and debugging for OAuth authentication flow
 */

export class AuthDebugger {
  private static logPrefix = '[AUTH-DEBUG]'

  /**
   * Log authentication flow steps with detailed information
   */
  static logAuthFlow(step: string, data?: any) {
    console.group(`${this.logPrefix} ${step}`)
    console.log('Timestamp:', new Date().toISOString())
    console.log('Current URL:', window.location.href)
    if (data) {
      console.log('Data:', data)
    }
    console.groupEnd()
  }

  /**
   * Log provider configuration status
   */
  static logProviderConfig(provider: string, isEnabled: boolean, hasCredentials: boolean) {
    console.group(`${this.logPrefix} Provider Configuration`)
    console.log('Provider:', provider)
    console.log('Enabled:', isEnabled)
    console.log('Has Credentials:', hasCredentials)
    console.log('Environment Check:', {
      VITE_SUPABASE_URL: !!import.meta.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: !!import.meta.env.VITE_SUPABASE_ANON_KEY
    })
    console.groupEnd()
  }

  /**
   * Log detailed error information
   */
  static logError(error: any, context: string) {
    console.group(`${this.logPrefix} ERROR - ${context}`)
    console.error('Error Object:', error)
    console.error('Error Message:', error?.message)
    console.error('Error Code:', error?.code)
    console.error('Error Details:', error?.details)
    console.error('Stack Trace:', error?.stack)
    console.error('Timestamp:', new Date().toISOString())
    console.error('Current URL:', window.location.href)
    console.groupEnd()
  }

  /**
   * Test provider connectivity
   */
  static async testProviderConnectivity(provider: string) {
    console.group(`${this.logPrefix} Testing Provider Connectivity`)
    
    try {
      // Test basic Supabase connection
      const { supabase } = await import('../lib/supabase')
      
      // Check if we can access auth
      const { data: session, error } = await supabase.auth.getSession()
      console.log('Supabase Auth Access:', !!session, error ? `Error: ${error.message}` : 'OK')
      
      // Check provider availability (this will help identify configuration issues)
      console.log('Provider being tested:', provider)
      console.log('Available providers should be configured in Supabase Dashboard')
      
      // Test X API configuration if testing Twitter
      if (provider === 'twitter') {
        const { X_API_CONFIG } = await import('../lib/supabase')
        console.log('X API Configuration Status:', {
          hasApiKey: !!X_API_CONFIG.apiKey,
          hasApiSecret: !!X_API_CONFIG.apiSecret,
          hasClientId: !!X_API_CONFIG.clientId,
          hasClientSecret: !!X_API_CONFIG.clientSecret,
          callbackUrl: X_API_CONFIG.callbackUrl,
          allConfigured: !!(X_API_CONFIG.apiKey && X_API_CONFIG.apiSecret && X_API_CONFIG.clientId && X_API_CONFIG.clientSecret)
        })
      }
      
      return true
    } catch (error) {
      console.error('Connectivity test failed:', error)
      return false
    } finally {
      console.groupEnd()
    }
  }

  /**
   * Validate environment configuration
   */
  static validateEnvironment() {
    console.group(`${this.logPrefix} Environment Validation`)
    
    const requiredEnvVars = [
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_ANON_KEY'
    ]
    
    const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName])
    
    console.log('Required Environment Variables:', requiredEnvVars)
    console.log('Missing Variables:', missingVars)
    console.log('Environment Status:', missingVars.length === 0 ? 'VALID' : 'INVALID')
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
    console.log('Anon Key Present:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
    
    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars)
    }
    
    console.groupEnd()
    
    return missingVars.length === 0
  }

  /**
   * Generate detailed authentication report
   */
  static generateAuthReport() {
    console.group(`${this.logPrefix} Authentication System Report`)
    
    // Environment check
    const envValid = this.validateEnvironment()
    
    // Browser compatibility
    const browserInfo = {
      userAgent: navigator.userAgent,
      cookiesEnabled: navigator.cookieEnabled,
      localStorage: typeof Storage !== 'undefined',
      sessionStorage: typeof sessionStorage !== 'undefined'
    }
    
    // URL information
    const urlInfo = {
      currentUrl: window.location.href,
      origin: window.location.origin,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash
    }
    
    console.log('Environment Valid:', envValid)
    console.log('Browser Info:', browserInfo)
    console.log('URL Info:', urlInfo)
    
    // X API Configuration check
    import('../lib/supabase').then(({ X_API_CONFIG }) => {
      console.log('X API Configuration:', {
        configured: !!(X_API_CONFIG.apiKey && X_API_CONFIG.apiSecret && X_API_CONFIG.clientId && X_API_CONFIG.clientSecret),
        callbackUrl: X_API_CONFIG.callbackUrl,
        hasAllCredentials: {
          apiKey: !!X_API_CONFIG.apiKey,
          apiSecret: !!X_API_CONFIG.apiSecret,
          clientId: !!X_API_CONFIG.clientId,
          clientSecret: !!X_API_CONFIG.clientSecret
        }
      })
    })
    
    console.groupEnd()
    
    return {
      environmentValid: envValid,
      browserCompatible: browserInfo.cookiesEnabled && browserInfo.localStorage,
      currentUrl: window.location.href,
      origin: window.location.origin
    }
  }

  /**
   * Test database connectivity
   */
  static async testDatabaseConnectivity() {
    console.group(`${this.logPrefix} Database Connectivity Test`)
    
    try {
      const { supabase } = await import('../lib/supabase')
      
      // Test basic connection
      const { data, error } = await supabase
        .from('users')
        .select('count')
        .limit(1)
      
      if (error) {
        console.error('Database connection failed:', error)
        return false
      }
      
      console.log('Database connection successful')
      return true
      
    } catch (error) {
      console.error('Database test failed:', error)
      return false
    } finally {
      console.groupEnd()
    }
  }
}

/**
 * Provider Configuration Checker
 */
export class ProviderConfigChecker {
  /**
   * Check if provider is properly configured
   */
  static async checkProviderStatus(provider: 'twitter' | 'linkedin') {
    console.group(`[PROVIDER-CHECK] ${provider.toUpperCase()} Status`)
    
    try {
      const { supabase } = await import('../lib/supabase')
      
      // Map to Supabase provider names
      const providerMap = {
        twitter: 'twitter',
        linkedin: 'linkedin_oidc'
      }
      
      const supabaseProvider = providerMap[provider]
      
      AuthDebugger.logAuthFlow('Checking Provider Status', {
        requestedProvider: provider,
        supabaseProvider: supabaseProvider
      })
      
      console.log(`Checking ${provider} (${supabaseProvider}) configuration...`)
      
      // Check X API configuration if checking Twitter
      if (provider === 'twitter') {
        const { X_API_CONFIG } = await import('../lib/supabase')
        const isConfigured = !!(X_API_CONFIG.apiKey && X_API_CONFIG.apiSecret && X_API_CONFIG.clientId && X_API_CONFIG.clientSecret)
        
        console.log('X API Configuration Status:', {
          configured: isConfigured,
          details: {
            hasApiKey: !!X_API_CONFIG.apiKey,
            hasApiSecret: !!X_API_CONFIG.apiSecret,
            hasClientId: !!X_API_CONFIG.clientId,
            hasClientSecret: !!X_API_CONFIG.clientSecret,
            callbackUrl: X_API_CONFIG.callbackUrl
          }
        })
        
        console.groupEnd()
        return {
          provider,
          supabaseProvider,
          configured: isConfigured,
          available: true,
          credentials: {
            hasApiKey: !!X_API_CONFIG.apiKey,
            hasApiSecret: !!X_API_CONFIG.apiSecret,
            hasClientId: !!X_API_CONFIG.clientId,
            hasClientSecret: !!X_API_CONFIG.clientSecret
          }
        }
      }
      
      console.groupEnd()
      return {
        provider,
        supabaseProvider,
        configured: false, // We'll determine this from the error response
        available: true
      }
      
    } catch (error) {
      console.error('Provider status check failed:', error)
      AuthDebugger.logError(error, `Provider Status Check - ${provider}`)
      console.groupEnd()
      return {
        provider,
        configured: false,
        available: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}