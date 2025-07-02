import { Card, CardContent } from '@/components/ui/card'
import { FileText, BarChart3, Users, Brain, Calendar, Repeat } from 'lucide-react'

export function Features() {
    return (
        <section id="features" className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="relative">
                    {/* Header */}
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-2">Key Features</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                All-in-One Toolkit for X/LinkedIn Success
                            </h2>
                        </div>
                        <button className="hidden md:flex items-center text-orange-500 hover:text-orange-600 font-medium">
                            View All
                            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Modern Grid Layout */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {/* Card 1: Customized AI Templates - Large Card (spans 2 columns on lg) */}
                        <Card className="lg:col-span-2 overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-0 h-full">
                                <div className="grid md:grid-cols-2 h-full min-h-[280px]">
                                    {/* Text Content - Left Half */}
                                    <div className="p-8 flex flex-col justify-center">
                                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                                            <FileText className="h-6 w-6 text-orange-500" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            Customized AI Templates & Instant Replies
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Save time with customizable, profile-specific AI post templates and one-click quick replies.
                                        </p>
                                    </div>
                                    
                                    {/* Visual Content - Right Half */}
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 flex items-center justify-center relative">
                                        <div className="relative">
                                            {/* AI Badge */}
                                            <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                AI
                                            </div>
                                            {/* Template Preview */}
                                            <div className="bg-white rounded-lg p-4 shadow-sm max-w-[200px]">
                                                <div className="space-y-2">
                                                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                                                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                                    <div className="h-2 bg-orange-300 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 2: Advanced Analytics - Tall Card */}
                        <Card className="overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-0 h-full">
                                <div className="flex flex-col h-full min-h-[280px]">
                                    {/* Visual Content - Top Half */}
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex-1 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                                <BarChart3 className="h-6 w-6 text-blue-500" />
                                            </div>
                                            {/* Mini Chart */}
                                            <div className="flex items-end space-x-1 justify-center">
                                                <div className="w-2 h-8 bg-gray-300 rounded"></div>
                                                <div className="w-2 h-12 bg-gray-300 rounded"></div>
                                                <div className="w-2 h-6 bg-gray-300 rounded"></div>
                                                <div className="w-2 h-16 bg-orange-500 rounded"></div>
                                                <div className="w-2 h-10 bg-gray-300 rounded"></div>
                                                <div className="w-2 h-4 bg-gray-300 rounded"></div>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-500">$890.93</div>
                                        </div>
                                    </div>
                                    
                                    {/* Text Content - Bottom Half */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                            Advanced Analytics Dashboard
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Monitor your X and LinkedIn performance in real time—track engagement, uncover trends, and spot growth opportunities.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 3: Multi-Profile Management - Standard Card */}
                        <Card className="overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-0 h-full">
                                <div className="grid grid-rows-2 h-full min-h-[280px]">
                                    {/* Visual Content - Top Half */}
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 flex items-center justify-center">
                                        <div className="relative">
                                            {/* Profile Circles */}
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                                    <Users className="h-4 w-4 text-white" />
                                                </div>
                                                <div className="w-6 h-6 bg-orange-300 rounded-full"></div>
                                                <div className="w-6 h-6 bg-orange-200 rounded-full"></div>
                                                <div className="w-6 h-6 bg-orange-100 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Text Content - Bottom Half */}
                                    <div className="p-6 flex flex-col justify-center">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                            Multi-Profile Management
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Effortlessly manage multiple Twitter and LinkedIn accounts—switch between them seamlessly and stay organized.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 4: AI-powered Post Ideas - Standard Card */}
                        <Card className="overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-0 h-full">
                                <div className="grid grid-rows-2 h-full min-h-[280px]">
                                    {/* Visual Content - Top Half */}
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 flex items-center justify-center">
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                                <Brain className="h-6 w-6 text-green-500" />
                                            </div>
                                            {/* Content Lines */}
                                            <div className="space-y-2">
                                                <div className="h-1 bg-gray-300 rounded w-16"></div>
                                                <div className="h-1 bg-gray-300 rounded w-12"></div>
                                                <div className="h-1 bg-green-400 rounded w-14"></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Text Content - Bottom Half */}
                                    <div className="p-6 flex flex-col justify-center">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                            AI-powered Post Ideas & Rewrites
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Generate content suggestions, fresh tweet ideas, and profile-aligned post rewrites in seconds.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 5: Smart Social Media Scheduler - Wide Card (spans 2 columns) */}
                        <Card className="lg:col-span-2 overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-0 h-full">
                                <div className="grid md:grid-cols-2 h-full min-h-[280px]">
                                    {/* Text Content - Left Half */}
                                    <div className="p-8 flex flex-col justify-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                            <Calendar className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            Smart Social Media Scheduler
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Plan, schedule, and publish compelling content using a creator-focused scheduling tool.
                                        </p>
                                    </div>
                                    
                                    {/* Visual Content - Right Half */}
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-8 flex items-center justify-center relative">
                                        <div className="relative">
                                            {/* Schedule Status Indicators */}
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                    <span className="text-xs text-orange-600 font-medium">Scheduled</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-xs text-green-600 font-medium">Published</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <span className="text-xs text-blue-600 font-medium">Draft</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 6: Automated Engagement Boosters - Standard Card */}
                        <Card className="overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-0 h-full">
                                <div className="grid grid-rows-2 h-full min-h-[280px]">
                                    {/* Visual Content - Top Half */}
                                    <div className="bg-gradient-to-br from-red-50 to-pink-100 p-6 flex items-center justify-center">
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                                <Repeat className="h-6 w-6 text-red-500" />
                                            </div>
                                            {/* Boost Indicator */}
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">+</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Text Content - Bottom Half */}
                                    <div className="p-6 flex flex-col justify-center">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
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
            </div>
        </section>
    )
}