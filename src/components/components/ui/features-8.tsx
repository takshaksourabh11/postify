import { Card, CardContent } from '@/components/ui/card'
import { FileText, BarChart3, Users, Brain, Calendar, Repeat } from 'lucide-react'

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-16">
          <p className="text-sm font-medium text-gray-600 mb-2 tracking-wide uppercase">
            Key Features
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              All-in-One Toolkit for X/LinkedIn Success
            </h2>
            <button className="hidden md:flex items-center text-orange-500 hover:text-orange-600 font-medium">
              View All
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modern Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* AI Templates - Large Card */}
          <Card className="lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 h-full">
                {/* Text Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                    <FileText className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Customized AI Templates & Instant Replies
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Save time with customizable, profile-specific AI post templates and one-click quick replies.
                  </p>
                </div>
                
                {/* Visual Content */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 flex items-center justify-center relative">
                  <div className="relative">
                    {/* AI Badge */}
                    <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      AI
                    </div>
                    
                    {/* Template Preview */}
                    <div className="bg-white rounded-xl p-4 shadow-lg max-w-xs">
                      <div className="space-y-3">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-orange-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics - Tall Card */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="flex flex-col h-full">
                {/* Visual Content */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex-1 flex items-center justify-center">
                  <div className="text-center">
                    {/* Revenue Display */}
                    <div className="text-2xl font-bold text-gray-900 mb-2">$890.93</div>
                    <div className="text-sm text-gray-500 mb-4">1.8K</div>
                    
                    {/* Mini Bar Chart */}
                    <div className="flex items-end justify-center space-x-1 h-16">
                      {[40, 60, 30, 80, 50, 70, 45].map((height, i) => (
                        <div
                          key={i}
                          className={`w-3 rounded-t ${i === 3 ? 'bg-orange-500' : 'bg-gray-300'}`}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">0.9k</div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="p-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Advanced Analytics Dashboard
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Monitor your X and LinkedIn performance in real time—track engagement, uncover trends, and spot growth opportunities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Profile Management */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-rows-2 h-full">
                {/* Visual Content */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 flex items-center justify-center">
                  <div className="relative">
                    {/* Connected Profile Circles */}
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div className="w-2 h-0.5 bg-orange-300"></div>
                      <div className="w-6 h-6 bg-orange-300 rounded-full"></div>
                      <div className="w-2 h-0.5 bg-orange-300"></div>
                      <div className="w-6 h-6 bg-orange-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="p-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Users className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Multi-Profile Management
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Effortlessly manage multiple Twitter and LinkedIn accounts—switch between them seamlessly and stay organized.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Post Ideas */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-rows-2 h-full">
                {/* Visual Content */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 flex items-center justify-center">
                  <div className="relative">
                    {/* Brain with idea lines */}
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    {/* Idea lines */}
                    <div className="absolute -top-2 -right-2 space-y-1">
                      <div className="w-8 h-0.5 bg-green-300 rounded"></div>
                      <div className="w-6 h-0.5 bg-green-300 rounded"></div>
                      <div className="w-10 h-0.5 bg-green-300 rounded"></div>
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="p-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    AI-powered Post Ideas & Rewrites
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Generate content suggestions, fresh tweet ideas, and profile-aligned post rewrites in seconds.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Scheduler - Large Card */}
          <Card className="lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 h-full">
                {/* Text Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                    <Calendar className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Smart Social Media Scheduler
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Plan, schedule, and publish compelling content using a creator-focused scheduling tool.
                  </p>
                </div>
                
                {/* Visual Content */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 flex items-center justify-center">
                  <div className="space-y-4 w-full max-w-xs">
                    {/* Status Indicators */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Scheduled</span>
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Published</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Draft</span>
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    </div>
                    
                    {/* Calendar Preview */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="grid grid-cols-7 gap-1 text-xs">
                        {Array.from({ length: 21 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded flex items-center justify-center ${
                              i === 10 ? 'bg-orange-500 text-white' : 
                              i === 15 ? 'bg-green-500 text-white' : 
                              'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Boosters */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-rows-2 h-full">
                {/* Visual Content */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 flex items-center justify-center">
                  <div className="relative">
                    {/* Repeat icon with boost indicator */}
                    <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
                      <Repeat className="h-6 w-6 text-white" />
                    </div>
                    {/* Boost indicator */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">↑</span>
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="p-6">
                  <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                    <Repeat className="h-5 w-5 text-pink-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Automated Engagement Boosters
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Amplify your reach with auto-retweets and intelligent AI-generated reply messages.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}