import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Shield, Users, FileText, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Terms() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 text-orange-500">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                  </svg>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Postify</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-orange-500" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Welcome to Postify ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our social media management platform and services (the "Service") operated by Postify.
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </CardContent>
          </Card>

          {/* Account Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-orange-500" />
                Account Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Account Creation</h4>
              <ul>
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>You must be at least 13 years old to use this Service</li>
                <li>One person or legal entity may maintain no more than one free account</li>
              </ul>

              <h4>Account Responsibilities</h4>
              <ul>
                <li>You are responsible for all content posted through your account</li>
                <li>You are responsible for all activity that occurs under your account</li>
                <li>You must not use the Service for any illegal or unauthorized purpose</li>
                <li>You must not violate any laws in your jurisdiction when using the Service</li>
              </ul>
            </CardContent>
          </Card>

          {/* Social Media Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-orange-500" />
                Social Media Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>OAuth Authorization</h4>
              <p>
                When you connect your social media accounts (X/Twitter, LinkedIn) to Postify, you grant us permission to:
              </p>
              <ul>
                <li>Access your public profile information</li>
                <li>Post content on your behalf</li>
                <li>Read your posts and engagement metrics</li>
                <li>Access follower and connection data for analytics</li>
              </ul>

              <h4>Content Posting</h4>
              <ul>
                <li>You retain full ownership of all content you create and post</li>
                <li>You are solely responsible for the content posted through our Service</li>
                <li>Content must comply with the terms of service of the respective social media platforms</li>
                <li>We reserve the right to refuse service for content that violates platform policies</li>
              </ul>

              <h4>Data Access and Usage</h4>
              <ul>
                <li>We access your social media data solely to provide our services</li>
                <li>We do not sell, rent, or share your social media data with third parties</li>
                <li>Analytics data is used to provide insights and improve our services</li>
                <li>You can revoke access permissions at any time through your social media account settings</li>
              </ul>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Acceptable Use Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Prohibited Activities</h4>
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>Post spam, unsolicited messages, or repetitive content</li>
                <li>Engage in harassment, abuse, or hate speech</li>
                <li>Share false, misleading, or deceptive information</li>
                <li>Violate intellectual property rights</li>
                <li>Attempt to gain unauthorized access to other accounts or systems</li>
                <li>Use automated tools to artificially inflate engagement metrics</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>

              <h4>Content Guidelines</h4>
              <ul>
                <li>Content must be original or properly attributed</li>
                <li>No adult content, violence, or illegal activities</li>
                <li>Respect privacy and confidentiality of others</li>
                <li>Follow community guidelines of connected social media platforms</li>
              </ul>
            </CardContent>
          </Card>

          {/* Service Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Service Availability and Modifications</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Service Availability</h4>
              <ul>
                <li>We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service</li>
                <li>Scheduled maintenance will be announced in advance when possible</li>
                <li>We are not liable for service interruptions beyond our control</li>
              </ul>

              <h4>Service Modifications</h4>
              <ul>
                <li>We may modify, suspend, or discontinue any part of the Service at any time</li>
                <li>We will provide reasonable notice for significant changes</li>
                <li>Continued use of the Service constitutes acceptance of modifications</li>
              </ul>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Subscription Plans</h4>
              <ul>
                <li>Free plan includes basic features with usage limitations</li>
                <li>Premium plans are billed monthly or annually in advance</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>Prices may change with 30 days notice to existing subscribers</li>
              </ul>

              <h4>Cancellation</h4>
              <ul>
                <li>You may cancel your subscription at any time</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
                <li>No refunds for partial months or unused features</li>
                <li>Account data may be deleted after cancellation</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, POSTIFY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p>
                Our total liability to you for any claims arising from or relating to these Terms or the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Termination by You</h4>
              <ul>
                <li>You may terminate your account at any time through account settings</li>
                <li>Upon termination, your right to use the Service ceases immediately</li>
                <li>We may retain certain information as required by law or for legitimate business purposes</li>
              </ul>

              <h4>Termination by Us</h4>
              <ul>
                <li>We may terminate or suspend your account for violation of these Terms</li>
                <li>We may terminate accounts that remain inactive for extended periods</li>
                <li>We will provide reasonable notice except in cases of serious violations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <ul>
                <li>Email: legal@postify.app</li>
                <li>Address: [Your Business Address]</li>
                <li>Phone: [Your Contact Number]</li>
              </ul>
              <p>
                These Terms of Service are effective as of January 2025 and will remain in effect except with respect to any changes in their provisions in the future, which will be in effect immediately after being posted on this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}