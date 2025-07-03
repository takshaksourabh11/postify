import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Privacy() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-orange-500" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                At Postify, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our social media management platform and services.
              </p>
              <p>
                By using our Service, you consent to the data practices described in this policy. If you do not agree with the practices described in this policy, please do not use our Service.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-orange-500" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Personal Information</h4>
              <p>We collect information you provide directly to us, including:</p>
              <ul>
                <li>Account information (name, email address, profile picture)</li>
                <li>Social media account credentials and authorization tokens</li>
                <li>Content you create, schedule, or publish through our Service</li>
                <li>Communication preferences and settings</li>
                <li>Payment information (processed securely by third-party providers)</li>
              </ul>

              <h4>Social Media Data</h4>
              <p>When you connect your social media accounts, we may access:</p>
              <ul>
                <li>Public profile information (name, username, bio, profile picture)</li>
                <li>Posts, comments, and engagement metrics</li>
                <li>Follower/connection counts and growth data</li>
                <li>Account analytics and performance data</li>
                <li>Publishing permissions to post on your behalf</li>
              </ul>

              <h4>Automatically Collected Information</h4>
              <ul>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (features used, time spent, click patterns)</li>
                <li>Log data (access times, pages viewed, errors encountered)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-orange-500" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Service Provision</h4>
              <ul>
                <li>Create and manage your account</li>
                <li>Authenticate your identity and social media accounts</li>
                <li>Post content to your connected social media accounts</li>
                <li>Provide analytics and performance insights</li>
                <li>Schedule and automate content publishing</li>
              </ul>

              <h4>Service Improvement</h4>
              <ul>
                <li>Analyze usage patterns to improve our features</li>
                <li>Develop new features and functionality</li>
                <li>Troubleshoot technical issues and provide support</li>
                <li>Conduct research and analytics</li>
              </ul>

              <h4>Communication</h4>
              <ul>
                <li>Send service-related notifications and updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Notify you of changes to our terms or policies</li>
              </ul>

              <h4>Legal and Security</h4>
              <ul>
                <li>Comply with legal obligations and law enforcement requests</li>
                <li>Protect against fraud, abuse, and security threats</li>
                <li>Enforce our Terms of Service</li>
                <li>Protect the rights and safety of our users</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-orange-500" />
                Information Sharing and Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>We Do Not Sell Your Data</h4>
              <p>
                We do not sell, rent, or trade your personal information to third parties for their commercial purposes.
              </p>

              <h4>Service Providers</h4>
              <p>We may share your information with trusted third-party service providers who assist us in:</p>
              <ul>
                <li>Cloud hosting and data storage</li>
                <li>Payment processing</li>
                <li>Email delivery and communication</li>
                <li>Analytics and performance monitoring</li>
                <li>Customer support services</li>
              </ul>

              <h4>Social Media Platforms</h4>
              <ul>
                <li>Content you choose to publish is shared with the respective social media platforms</li>
                <li>We access your social media data through official APIs with your explicit consent</li>
                <li>Your social media activity through our Service is subject to the platforms' own privacy policies</li>
              </ul>

              <h4>Legal Requirements</h4>
              <p>We may disclose your information if required to do so by law or in response to:</p>
              <ul>
                <li>Valid legal process (subpoenas, court orders)</li>
                <li>Government or law enforcement requests</li>
                <li>Protection of our rights, property, or safety</li>
                <li>Protection of our users or the public</li>
              </ul>

              <h4>Business Transfers</h4>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control.
              </p>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-orange-500" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Security Measures</h4>
              <ul>
                <li>End-to-end encryption for sensitive data transmission</li>
                <li>Secure data storage with encryption at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure OAuth token management</li>
              </ul>

              <h4>Data Retention</h4>
              <ul>
                <li>We retain your data only as long as necessary to provide our services</li>
                <li>Account data is deleted within 30 days of account termination</li>
                <li>Some data may be retained longer for legal or security purposes</li>
                <li>You can request data deletion at any time</li>
              </ul>

              <h4>Incident Response</h4>
              <p>
                In the event of a data breach, we will notify affected users and relevant authorities within 72 hours as required by applicable laws.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights and Choices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-orange-500" />
                Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Access and Control</h4>
              <ul>
                <li>Access and review your personal information</li>
                <li>Update or correct your account information</li>
                <li>Download a copy of your data</li>
                <li>Delete your account and associated data</li>
                <li>Revoke social media account permissions</li>
              </ul>

              <h4>Communication Preferences</h4>
              <ul>
                <li>Opt out of marketing communications</li>
                <li>Manage notification settings</li>
                <li>Choose communication channels</li>
              </ul>

              <h4>GDPR Rights (EU Users)</h4>
              <p>If you are located in the European Union, you have additional rights under GDPR:</p>
              <ul>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
              </ul>

              <h4>CCPA Rights (California Users)</h4>
              <p>California residents have the right to:</p>
              <ul>
                <li>Know what personal information is collected</li>
                <li>Know whether personal information is sold or disclosed</li>
                <li>Say no to the sale of personal information</li>
                <li>Access personal information</li>
                <li>Delete personal information</li>
                <li>Equal service and price, even if you exercise your privacy rights</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Types of Cookies We Use</h4>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for basic functionality and security</li>
                <li><strong>Performance Cookies:</strong> Help us understand how you use our Service</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
              </ul>

              <h4>Managing Cookies</h4>
              <p>
                You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of our Service.
              </p>
            </CardContent>
          </Card>

          {/* International Data Transfers */}
          <Card>
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including:
              </p>
              <ul>
                <li>Standard Contractual Clauses approved by the European Commission</li>
                <li>Adequacy decisions by relevant data protection authorities</li>
                <li>Other legally recognized transfer mechanisms</li>
              </ul>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                For significant changes, we will provide more prominent notice, such as email notification or in-app alerts.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul>
                <li>Email: privacy@postify.app</li>
                <li>Data Protection Officer: dpo@postify.app</li>
                <li>Address: [Your Business Address]</li>
                <li>Phone: [Your Contact Number]</li>
              </ul>
              <p>
                For GDPR-related inquiries, you may also contact your local data protection authority.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}