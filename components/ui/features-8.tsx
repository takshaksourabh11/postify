import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users, FileText, BarChart3, UserPlus, Calendar, Repeat, Brain } from 'lucide-react'

export function Features() {
    return (
        <section className="bg-[#F5F5F5] py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-left mb-12">
                    <p className="text-lg text-gray-600 mb-2 font-medium">Key Features</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        All-in-One Toolkit for X/LinkedIn Success
                    </h2>
                    <div className="flex justify-end">
                        <a href="#" className="text-orange-500 hover:text-orange-600 font-medium flex items-center">
                            View All →
                        </a>
                    </div>
                </div>
                
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Customized AI Templates Card */}
                        <Card className="relative col-span-1 flex overflow-hidden bg-white border-0 shadow-lg">
                            <CardContent className="relative p-6 flex flex-col justify-between h-full min-h-[280px]">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                                        <FileText className="h-6 w-6 text-orange-500" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Customized AI Templates & Instant Replies</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">Save time with customizable, profile-specific AI post templates and one-click quick replies.</p>
                                </div>
                                {/* AI Visual Element */}
                                <div className="absolute top-4 right-4">
                                    <div className="w-16 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">AI</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Advanced Analytics Dashboard Card */}
                        <Card className="relative col-span-1 overflow-hidden bg-white border-0 shadow-lg">
                            <CardContent className="p-6 flex flex-col justify-between h-full min-h-[280px]">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                                        <BarChart3 className="h-6 w-6 text-orange-500" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Analytics Dashboard</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">Monitor your X and LinkedIn performance in real time—track engagement, uncover trends, and spot growth opportunities.</p>
                                </div>
                                {/* Analytics Chart Visual */}
                                <div className="absolute top-4 right-4 w-20 h-12">
                                    <div className="flex items-end space-x-1 h-full">
                                        <div className="w-2 bg-gray-300 h-1/3 rounded-sm"></div>
                                        <div className="w-2 bg-gray-300 h-1/2 rounded-sm"></div>
                                        <div className="w-2 bg-orange-500 h-full rounded-sm"></div>
                                        <div className="w-2 bg-gray-300 h-2/3 rounded-sm"></div>
                                        <div className="w-2 bg-gray-300 h-1/4 rounded-sm"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Multi-Profile Management Card */}
                        <Card className="relative col-span-1 overflow-hidden bg-white border-0 shadow-lg">
                            <CardContent className="p-6 flex flex-col justify-between h-full min-h-[280px]">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                                        <UserPlus className="h-6 w-6 text-orange-500" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Profile Management</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">Effortlessly manage multiple Twitter and LinkedIn accounts—switch between them seamlessly and stay organized.</p>
                                </div>
                                {/* Profile Management Visual */}
                                <div className="absolute top-4 right-4">
                                    <div className="relative w-16 h-16">
                                        <div className="absolute inset-0 w-8 h-8 bg-orange-500 rounded-full"></div>
                                        <div className="absolute top-0 right-0 w-6 h-6 bg-orange-300 rounded-full"></div>
                                        <div className="absolute bottom-0 left-0 w-6 h-6 bg-orange-300 rounded-full"></div>
                                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-orange-300 rounded-full"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI-powered Post Ideas & Rewrites Card */}
                        <Card className="relative col-span-1 overflow-hidden bg-white border-0 shadow-lg">
                            <CardContent className="p-6 flex flex-col justify-between h-full min-h-[280px]">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                                        <Brain className="h-6 w-6 text-orange-500" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-powered Post Ideas & Rewrites</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">Generate content suggestions, fresh tweet ideas, and profile-aligned post rewrites in seconds.</p>
                                </div>
                                {/* Content Lines Visual */}
                                <div className="absolute top-4 right-4 space-y-2">
                                    <div className="w-16 h-1 bg-gray-300 rounded"></div>
                                    <div className="w-12 h-1 bg-orange-500 rounded"></div>
                                    <div className="w-14 h-1 bg-gray-300 rounded"></div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Smart Social Media Scheduler Card */}
                        <Card className="relative col-span-1 overflow-hidden bg-white border-0 shadow-lg">
                            <CardContent className="p-6 flex flex-col justify-between h-full min-h-[280px]">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                                        <Calendar className="h-6 w-6 text-orange-500" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Social Media Scheduler</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">Plan, schedule, and publish compelling content using a creator-focused scheduling tool.</p>
                                </div>
                                {/* Schedule Status Visual */}
                                <div className="absolute top-4 right-4 space-y-1">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        <span className="text-xs text-orange-500 font-medium">Scheduled</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-xs text-green-500 font-medium">Published</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Automated Engagement Boosters Card */}
                        <Card className="relative col-span-1 overflow-hidden bg-white border-0 shadow-lg">
                            <CardContent className="p-6 flex flex-col justify-between h-full min-h-[280px]">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                                        <Repeat className="h-6 w-6 text-orange-500" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Automated Engagement Boosters</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">Amplify your reach with auto-retweets and intelligent AI-generated reply messages.</p>
                                </div>
                                {/* Engagement Visual */}
                                <div className="absolute top-4 right-4">
                                    <div className="relative">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                            <Repeat className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">+</span>
                                        </div>
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