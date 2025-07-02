import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '../../contexts/AuthContext'
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
  MessageSquare
} from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'signup' | 'signin'
}

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [selectedProvider, setSelectedProvider] = useState<'twitter' | 'linkedin' | null>(null)
  const [showPermissions, setShowPermissions] = useState(false)
  const { signInWithProvider, loading } = useAuth()

  const handleProviderSelect = (provider: 'twitter' | 'linkedin') => {
    setSelectedProvider(provider)
    setShowPermissions(true)
  }

  const handleContinue = async () => {
    if (selectedProvider) {
      await signInWithProvider(selectedProvider)
      onClose()
    }
  }

  const handleBack = () => {
    setShowPermissions(false)
    setSelectedProvider(null)
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
            description: 'Access your public profile, name, username, and profile picture'
          },
          {
            icon: <BarChart3 className="h-5 w-5 text-green-500" />,
            title: 'Follower Analytics',
            description: 'View follower count, engagement metrics, and growth statistics'
          },
          {
            icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
            title: 'Tweet Performance',
            description: 'Analyze tweet reach, impressions, and engagement data'
          },
          {
            icon: <Calendar className="h-5 w-5 text-orange-500" />,
            title: 'Content Management',
            description: 'Schedule and publish tweets on your behalf'
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
            icon: <Eye className="h-5 w-5 text-blue-500" />,
            title: 'Profile Information',
            description: 'Access your professional profile, name, headline, and photo'
          },
          {
            icon: <Users className="h-5 w-5 text-green-500" />,
            title: 'Network Analytics',
            description: 'View connection count, industry insights, and network growth'
          },
          {
            icon: <BarChart3 className="h-5 w-5 text-purple-500" />,
            title: 'Post Performance',
            description: 'Track post engagement, reach, and professional network impact'
          },
          {
            icon: <Calendar className="h-5 w-5 text-orange-500" />,
            title: 'Content Publishing',
            description: 'Create and schedule professional posts and articles'
          }
        ]
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </DialogTitle>
        </DialogHeader>

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
                disabled={loading}
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
                disabled={loading}
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
                  <span>AI-powered content generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Advanced analytics dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Smart scheduling tools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Multi-account management</span>
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

                <div className="space-y-3">
                  {getProviderPermissions(selectedProvider).permissions.map((permission, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mt-0.5">
                        {permission.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{permission.title}</h4>
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
                    Your data is encrypted and never shared with third parties. You can revoke access anytime.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1"
                disabled={loading}
              >
                Back
              </Button>
              <Button
                onClick={handleContinue}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? 'Connecting...' : 'Continue'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}