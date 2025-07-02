import { Card, CardContent } from '@/components/ui/card'
import { FileText, BarChart3, Users, Lightbulb, Calendar, Repeat } from 'lucide-react'

export function Features() {
  return (
    <section id="features" className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-lg text-gray-600 mb-4 font-medium">
            Key Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            All-in-One Toolkit for X Success
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Customized AI Templates - Large Card */}
          <Card className="lg:col-span-2 bg-white border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Customized AI Templates & Instant Replies
                </h3>
                <p className="text-gray-600">
                  Save time with customizable, profile-specific AI post templates and one-click quick replies.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center relative">
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">AI</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-300 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-200 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Analytics - Medium Card */}
          <Card className="bg-white border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Advanced Analytics Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Monitor your X and LinkedIn performance in real time—track engagement, uncover trends, and spot growth opportunities.
              </p>
              <div className="flex items-center justify-center">
                <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-end justify-center space-x-1 p-2">
                  <div className="w-2 h-4 bg-gray-300 rounded"></div>
                  <div className="w-2 h-6 bg-gray-300 rounded"></div>
                  <div className="w-2 h-8 bg-orange-500 rounded"></div>
                  <div className="w-2 h-5 bg-gray-300 rounded"></div>
                  <div className="w-2 h-7 bg-gray-300 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Profile Management */}
          <Card className="bg-white border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Multi-Profile Management
              </h3>
              <p className="text-gray-600 mb-6">
                Effortlessly manage multiple Twitter and LinkedIn accounts—switch between them seamlessly and stay organized.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                <div className="w-8 h-8 bg-orange-300 rounded-full"></div>
                <div className="w-8 h-8 bg-orange-200 rounded-full"></div>
                <div className="w-8 h-8 bg-orange-100 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          {/* AI-powered Post Ideas - Large Card */}
          <Card className="lg:col-span-2 bg-white border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Lightbulb className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  AI-powered Post Ideas & Rewrites
                </h3>
                <p className="text-gray-600">
                  Generate content suggestions, fresh tweet ideas, and profile-aligned post rewrites in seconds.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-32 h-24 bg-green-50 rounded-lg flex items-center justify-center relative">
                  <div className="w-6 h-6 bg-green-500 rounded-full absolute top-2 left-2"></div>
                  <div className="w-4 h-1 bg-gray-300 rounded absolute top-4 left-10"></div>
                  <div className="w-8 h-1 bg-gray-300 rounded absolute top-6 left-10"></div>
                  <div className="w-6 h-1 bg-gray-300 rounded absolute top-8 left-10"></div>
                  <Lightbulb className="h-8 w-8 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Scheduler */}
          <Card className="bg-white border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Smart Social Media Scheduler
              </h3>
              <p className="text-gray-600 mb-6">
                Plan, schedule, and publish compelling content using a creator-focused scheduling tool.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs">Scheduled</div>
                <div className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">Published</div>
              </div>
            </CardContent>
          </Card>

          {/* Automated Engagement Boosters */}
          <Card className="bg-white border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Repeat className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Automated Engagement Boosters
              </h3>
              <p className="text-gray-600 mb-6">
                Amplify your reach with auto-retweets and intelligent AI-generated reply messages.
              </p>
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <Repeat className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Browser Support - Large Card */}
          <Card className="lg:col-span-2 bg-white border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="h-6 w-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Multi-Browser Support
                </h3>
                <p className="text-gray-600">
                  Seamlessly access and manage your Twitter workflow across all major browsers, ensuring smooth performance and full compatibility everywhere.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">F</span>
                  </div>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">E</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}