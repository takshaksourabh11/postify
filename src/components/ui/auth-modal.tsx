import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '../../contexts/AuthContext'
import { AuthDebugger } from '../../lib/auth-debug'
import { 
  Shield, 
  Users, 
  BarChart3, 
  Calendar, 
  Twitter, 
  Linkedin,
  CheckCircle,
  Lock,
  Eye,
  MessageSquare,
  TrendingUp,
  Share2,
  Heart,
  UserCheck,
  FileText,
  AlertCircle,
  Loader2,
  Info,
  Settings,
  ExternalLink,
  Bug
} from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'signup' | 'signin'
}

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [selectedProvider, setSelectedProvider] = useState<'twitter' | 'linkedin' | null>(null)
  const [showPermissions, setShowPermissions] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDebugInfo, setShowDebugInfo] = useState(false)
  const { signInWithProvider, loading, debugAuthSystem } = useAuth()

  // Debug mode detection (show debug info in development)
  useEffect(() => {
    setShowDebugInfo(import.meta.env.DEV)
  }, [])

  const handleProviderSelect = (provider: 'twitter' | 'linkedin') => {
    setSelectedProvider(provider)
    setShowPermissions(true)
    setError(null)
    
    // Log provider selection for debugging
    AuthDebugger.logAuthFlow('Provider Selected', { provider })
  }

  const handleContinue = async () => {
    if (selectedProvider && !isConnecting) {
      try {
        setIsConnecting(true)
        setError(null)
        
        AuthDebugger.logAuthFlow('Authentication Attempt Started', { provider: selectedProvider })
        
        await signInWithProvider(selectedProvider)
        // Don't close modal here - let the auth context handle navigation
      } catch (err) {
        AuthDebugger.logError(err, 'Authentication Modal')
        
        const errorMessage = err instanceof Error ? err.message : `Failed to connect with ${selectedProvider}. Please try again.`
        setError(errorMessage)
        
        // Show additional debug info for configuration errors
        if (errorMessage.includes('not configured')) {
          console.group('🔧 SETUP INSTRUCTIONS')
          console.log(`To enable ${selectedProvider} authentication:`)
          console.log('1. Go to your Supabase Dashboard')
          console.log('2. Navigate to Authentication → Providers')
          console.log(`3. Enable ${selectedProvider === 'twitter' ? 'Twitter' : 'LinkedIn (OIDC)'} provider`)
          console.log('4. Add your OAuth app credentials')
          console.log('5. Configure redirect URLs')
          console.groupEnd()
        }
      } finally {
        setIsConnecting(false)
      }
    }
  }

  const handleBack = () => {
    setShowPermissions(false)
    setSelectedProvider(null)
    setError(null)
  }

  const handleClose = () => {
    if (!isConnecting) {
      setShowPermissions(false)
      setSelectedProvider(null)
      setError(null)
      onClose()
    }
  }

  const handleDebugAuth = () => {
    debugAuthSystem()
    toast.success('Debug information logged to console. Check browser developer tools.')
  }

  const getProviderPermissions = (provider: 'twitter' | 'linkedin') => {
    if (provider === 'twitter') {
      return {
        name: 'X (Twitter)',
        icon: <Twitter className="h-6 w-6" />,
        color: 'bg-black',
        permissions: [
          {
            icon: <Eye className="h-5 w-5 text-blue-500" />,
            title: 'Profile Information',
            description: 'Access your public profile, name, username, bio, and profile picture',
            required: true
          },
          {
            icon: <MessageSquare className="h-5 w-5 text-green-500" />,
            title: 'Tweet Management',
            description: 'Create, publish, and schedule tweets on your behalf',
            required: true
          },
          {
            icon: <BarChart3 className="h-5 w-5 text-purple-500" />,
            title: 'Analytics & Engagement',
            description: 'View tweet performance, likes, retweets, comments, and impressions',
            required: true
          },
          {
            icon: <Users className="h-5 w-5 text-orange-500" />,
            title: 'Follower Insights',
            description: 'Access follower count, growth metrics, and audience analytics',
            required: true
          },
          {
            icon: <TrendingUp className="h-5 w-5 text-red-500" />,
            title: 'Performance Tracking',
            description: 'Monitor reach, engagement rates, and content performance over time',
            required: true
          }
        ]
      }
    } else {
      return {
        name: 'LinkedIn',
        icon: <Linkedin className="h-6 w-6" />,
        color: 'bg-[#0077B5]',
        permissions: [
          {
            icon: <UserCheck className="h-5 w-5 text-blue-500" />,
            title: 'Professional Profile',
            description: 'Access your professional profile, headline, summary, and photo',
            required: true
          },
          {
            icon: <FileText className="h-5 w-5 text-green-500" />,
            title: 'Content Publishing',
            description: 'Create and publish posts, articles, and updates to your network',
            required: true
          },
          {
            icon: <BarChart3 className="h-5 w-5 text-purple-500" />,
            title: 'Post Analytics',
            description: 'Track post engagement, views, likes, comments, and shares',
            required: true
          },
          {
            icon: <Users className="h-5 w-5 text-orange-500" />,
            title: 'Network Insights',
            description: 'View connection count, industry insights, and network growth',
            required: true
          },
          {
            icon: <Share2 className="h-5 w-5 text-red-500" />,
            title: 'Professional Metrics',
            description: 'Monitor profile views, post reach, and professional network impact',
            required: true
          }
        ]
      }
    }
  }

  const getConfigurationInstructions = (provider: 'twitter' | 'linkedin') => {
    if (provider === 'twitter') {
      return {
        title: 'Twitter/X OAuth Setup Required',
        steps: [
          'Go to Supabase Dashboard → Authentication → Providers',
          'Enable "Twitter" provider',
          'Create a Twitter Developer App at developer.twitter.com',
          'Add your Twitter API Key and API Secret Key',
          'Set redirect URL to: https://your-project.supabase.co/auth/v1/callback',
          'Save configuration and try again'
        ]
      }
    } else {
      return {
        title: 'LinkedIn OAuth Setup Required',
        steps: [
          'Go to Supabase Dashboard → Authentication → Providers',
          'Enable "LinkedIn (OIDC)" provider',
          'Create a LinkedIn App at developer.linkedin.com',
          'Add your LinkedIn Client ID and Client Secret',
          'Set redirect URL to: https://your-project.supabase.co/auth/v1/callback',
          'Save configuration and try again'
        ]
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </DialogTitle>
        </DialogHeader>

        {/* Debug Panel (Development Only) */}
        {showDebugInfo && (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bug className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">Debug Mode</span>
              </div>
              <Button
                onClick={handleDebugAuth}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Run Debug
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Development mode detected. Debug information will be logged to console.
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">Connection Failed</span>
            </div>
            <p className="text-xs text-red-700 mt-1">{error}</p>
            
            {/* Configuration Help */}
            {error.includes('not configured') && selectedProvider && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center space-x-2 mb-2">
                  <Settings className="h-3 w-3 text-blue-600" />
                  <span className="text-xs font-medium text-blue-800">
                    {getConfigurationInstructions(selectedProvider).title}
                  </span>
                </div>
                <ol className="text-xs text-blue-700 space-y-1">
                  {getConfigurationInstructions(selectedProvider).steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <a
                    href="https://supabase.com/docs/guides/auth/social-login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Supabase OAuth Documentation
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {!showPermissions ? (
          <div className="space-y-6 py-4">
            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure OAuth2.0 Authentication</span>
            </div>

            {/* Provider Selection */}
            <div className="space-y-3">
              <Button
                onClick={() => handleProviderSelect('twitter')}
                variant="outline"
                className="w-full h-12 flex items-center justify-center space-x-3 border-2 hover:border-gray-300 transition-colors"
                disabled={loading || isConnecting}
              >
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Twitter className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">Continue with X (Twitter)</span>
              </Button>

              <Button
                onClick={() => handleProviderSelect('linkedin')}
                variant="outline"
                className="w-full h-12 flex items-center justify-center space-x-3 border-2 hover:border-gray-300 transition-colors"
                disabled={loading || isConnecting}
              >
                <div className="w-8 h-8 bg-[#0077B5] rounded-full flex items-center justify-center">
                  <Linkedin className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">Continue with LinkedIn</span>
              </Button>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-gray-900">What you'll get:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>AI-powered content generation and optimization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Advanced analytics and performance insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Smart scheduling and automation tools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Multi-platform content management</span>
                </div>
              </div>
            </div>

            {/* Privacy Note */}
            <div className="text-xs text-gray-500 text-center">
              <Lock className="h-3 w-3 inline mr-1" />
              We never store your passwords. Your data is encrypted and secure.
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Provider Header */}
            {selectedProvider && (
              <div className="flex items-center justify-center space-x-3">
                <div className={`w-10 h-10 ${getProviderPermissions(selectedProvider).color} rounded-full flex items-center justify-center`}>
                  {getProviderPermissions(selectedProvider).icon}
                </div>
                <div>
                  <h3 className="font-semibold">{getProviderPermissions(selectedProvider).name}</h3>
                  <p className="text-sm text-gray-600">Review permissions</p>
                </div>
              </div>
            )}

            {/* Permissions List */}
            {selectedProvider && (
              <div className="space-y-4">
                <div className="text-center">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    Postify will access the following:
                  </Badge>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {getProviderPermissions(selectedProvider).permissions.map((permission, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mt-0.5">
                        {permission.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900 text-sm">{permission.title}</h4>
                          {permission.required && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Security Note */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Secure & Private</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Your data is encrypted and never shared with third parties. You can revoke access anytime from your {selectedProvider} settings.
                  </p>
                </div>

                {/* Usage Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">How We Use This Access</span>
                  </div>
                  <ul className="text-xs text-blue-700 mt-1 space-y-1">
                    <li>• Create and schedule your content automatically</li>
                    <li>• Analyze your performance and provide insights</li>
                    <li>• Optimize your posting times for maximum engagement</li>
                    <li>• Generate AI-powered content suggestions</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1"
                disabled={isConnecting}
              >
                Back
              </Button>
              <Button
                onClick={handleContinue}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Authorize & Continue'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}