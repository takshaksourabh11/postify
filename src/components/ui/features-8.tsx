import { Card, CardContent } from './card.tsx'
import { FileText, BarChart3, Users, Lightbulb, Calendar, Repeat } from 'lucide-react'

export function Features() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-3xl lg:max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            All-in-One Toolkit for X Success
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to grow your social media presence with AI-powered automation
          </p>
        </div>

        <div className="relative">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Customized AI Templates & Instant Replies */}
            <Card className="relative col-span-1 md:col-span-2 lg:col-span-1 flex overflow-hidden">
              <CardContent className="relative p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <FileText className="h-8 w-8 text-orange-500" />
                  </div>
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    AI
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Customized AI Templates & Instant Replies
                  </h3>
                  <p className="text-gray-600">
                    Save time with customizable, profile-specific AI post templates and one-click quick replies.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Analytics Dashboard */}
            <Card className="relative col-span-1 overflow-hidden">
              <CardContent className="relative p-8 flex flex-col justify-between h-full">
                <div className="flex justify-end mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center mb-6">
                  <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-16" viewBox="0 0 100 60" fill="none">
                      <rect x="10" y="40" width="8" height="15" fill="#e5e7eb" />
                      <rect x="25" y="30" width="8" height="25" fill="#e5e7eb" />
                      <rect x="40" y="20" width="8" height="35" fill="#f97316" />
                      <rect x="55" y="35" width="8" height="20" fill="#e5e7eb" />
                      <rect x="70" y="25" width="8" height="30" fill="#e5e7eb" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Advanced Analytics Dashboard
                  </h3>
                  <p className="text-sm text-gray-600">
                    Monitor your X and LinkedIn performance in real time—track engagement, uncover trends, and spot growth opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Multi-Profile Management */}
            <Card className="relative col-span-1 overflow-hidden">
              <CardContent className="relative p-8 flex flex-col justify-between h-full">
                <div className="flex justify-start mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Users className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-orange-300 rounded-full"></div>
                    <div className="w-8 h-8 bg-orange-300 rounded-full"></div>
                    <div className="w-8 h-8 bg-orange-200 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Multi-Profile Management
                  </h3>
                  <p className="text-sm text-gray-600">
                    Effortlessly manage multiple Twitter and LinkedIn accounts—switch between them seamlessly and stay organized.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI-powered Post Ideas & Rewrites */}
            <Card className="relative col-span-1 md:col-span-2 lg:col-span-1 overflow-hidden">
              <CardContent className="relative p-8 flex flex-col justify-between h-full">
                <div className="flex justify-end mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                    <Lightbulb className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center mb-6">
                  <div className="w-32 h-20 bg-gray-100 rounded-lg flex flex-col justify-center p-3">
                    <div className="h-2 bg-gray-300 rounded mb-2"></div>
                    <div className="h-2 bg-orange-500 rounded mb-2"></div>
                    <div className="h-2 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    AI-powered Post Ideas & Rewrites
                  </h3>
                  <p className="text-sm text-gray-600">
                    Generate content suggestions, fresh tweet ideas, and profile-aligned post rewrites in seconds.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Smart Social Media Scheduler */}
            <Card className="relative col-span-1 overflow-hidden">
              <CardContent className="relative p-8 flex flex-col justify-between h-full">
                <div className="flex justify-start mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">Scheduled</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Published</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Draft</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Smart Social Media Scheduler
                  </h3>
                  <p className="text-sm text-gray-600">
                    Plan, schedule, and publish compelling content using a creator-focused scheduling tool.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Automated Engagement Boosters */}
            <Card className="relative col-span-1 overflow-hidden">
              <CardContent className="relative p-8 flex flex-col justify-between h-full">
                <div className="flex justify-end mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                    <Repeat className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <Repeat className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">+</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Automated Engagement Boosters
                  </h3>
                  <p className="text-sm text-gray-600">
                    Amplify your reach with auto-retweets and intelligent AI-generated reply messages.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}