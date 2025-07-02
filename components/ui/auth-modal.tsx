"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Twitter, Linkedin, Shield, Eye, Users, BarChart3, CheckCircle, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signup' | 'signin';
}

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [step, setStep] = useState<'auth' | 'permissions'>('auth');

  /**
   * Handle social authentication
   * Initiates OAuth2.0 flow with the selected provider
   */
  const handleSocialAuth = async (provider: 'twitter' | 'linkedin') => {
    setIsLoading(provider);
    
    try {
      // Show permissions step first
      setStep('permissions');
      setIsLoading(null);
      
      // Simulate API call delay for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would redirect to OAuth provider
      // window.location.href = `/api/auth/${provider}`;
      
    } catch (error) {
      console.error('Authentication error:', error);
      setIsLoading(null);
    }
  };

  /**
   * Handle permission acceptance and complete authentication
   */
  const handleAcceptPermissions = async () => {
    setIsLoading('completing');
    
    try {
      // Simulate completing authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would complete the OAuth flow
      // and redirect to dashboard or close modal
      onClose();
      
    } catch (error) {
      console.error('Permission acceptance error:', error);
    } finally {
      setIsLoading(null);
      setStep('auth');
    }
  };

  const permissions = [
    {
      icon: <Eye className="h-5 w-5 text-blue-500" />,
      title: "Profile Information",
      description: "Access your basic profile info (name, profile picture, bio)",
      required: true
    },
    {
      icon: <Users className="h-5 w-5 text-green-500" />,
      title: "Follower Analytics",
      description: "View your follower count and engagement metrics",
      required: true
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-purple-500" />,
      title: "Post Performance",
      description: "Analyze your post engagement and reach statistics",
      required: true
    },
    {
      icon: <Shield className="h-5 w-5 text-orange-500" />,
      title: "Content Management",
      description: "Schedule and publish posts on your behalf",
      required: false
    }
  ];

  if (step === 'permissions') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">
                Permissions Required
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Postify needs access to the following information to provide you with the best experience:
            </p>
            
            <div className="space-y-3">
              {permissions.map((permission, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-0.5">
                    {permission.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {permission.title}
                      </h4>
                      {permission.required && (
                        <Badge variant="secondary" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {permission.description}
                    </p>
                  </div>
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-blue-800 font-medium">
                    Your data is secure
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    We use industry-standard encryption and never share your personal information with third parties.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setStep('auth')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleAcceptPermissions}
                disabled={isLoading === 'completing'}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {isLoading === 'completing' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Accept & Continue'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {mode === 'signup' ? 'Get Started with Postify' : 'Welcome Back'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            {mode === 'signup' 
              ? 'Connect your social media account to start growing your presence with AI-powered content tools.'
              : 'Sign in to continue managing your social media growth.'
            }
          </p>
          
          {/* Social Authentication Buttons */}
          <div className="space-y-3">
            {/* Twitter/X Authentication */}
            <Button
              variant="outline"
              className="w-full h-12 text-left justify-start space-x-3 hover:bg-gray-50 border-gray-200"
              onClick={() => handleSocialAuth('twitter')}
              disabled={isLoading !== null}
            >
              {isLoading === 'twitter' ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              ) : (
                <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                  <Twitter className="h-3 w-3 text-white" fill="currentColor" />
                </div>
              )}
              <span className="flex-1 text-sm font-medium">
                Continue with X (Twitter)
              </span>
            </Button>
            
            {/* LinkedIn Authentication */}
            <Button
              variant="outline"
              className="w-full h-12 text-left justify-start space-x-3 hover:bg-gray-50 border-gray-200"
              onClick={() => handleSocialAuth('linkedin')}
              disabled={isLoading !== null}
            >
              {isLoading === 'linkedin' ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              ) : (
                <div className="w-5 h-5 bg-[#0077B5] rounded-sm flex items-center justify-center">
                  <Linkedin className="h-3 w-3 text-white" fill="currentColor" />
                </div>
              )}
              <span className="flex-1 text-sm font-medium">
                Continue with LinkedIn
              </span>
            </Button>
          </div>
          
          {/* Security Notice */}
          <div className="bg-gray-50 rounded-lg p-3 mt-6">
            <div className="flex items-start space-x-2">
              <Shield className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-700 font-medium">
                  Secure & Private
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Your login is protected by OAuth2.0 security standards. We never store your social media passwords.
                </p>
              </div>
            </div>
          </div>
          
          {/* Terms */}
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our{' '}
            <a href="#" className="text-orange-500 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-orange-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}