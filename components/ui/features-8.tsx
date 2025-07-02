import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users, FileText, BarChart3, Brain, Calendar, Repeat, Chrome } from 'lucide-react'

export function Features() {
    return (
        <section className="bg-[#F5F5F5] py-16 md:py-32">
            <div className="mx-auto max-w-3xl lg:max-w-7xl px-6">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-lg text-gray-600 mb-2 font-medium">Key Features</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                All-in-One Toolkit for X/LinkedIn Success
                            </h2>
                        </div>
                        <button className="text-orange-500 hover:text-orange-600 font-medium flex items-center">
                            View All 
                            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="relative z-10 grid grid-cols-6 gap-3">
                        {/* Customizable Templates Card */}
                        <Card className="relative col-span-full flex overflow-hidden lg:col-span-2 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <CardContent className="relative m-auto size-fit pt-6">
                                <div className="relative flex h-24 w-56 items-center">
                                    <svg className="text-orange-200 absolute inset-0 size-full" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="mx-auto block w-fit text-5xl font-semibold text-orange-500">AI</span>
                                </div>
                                <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">Customized AI Templates</h2>
                                <p className="text-center text-sm text-gray-600 mt-2">Save time with customizable, profile-specific AI post templates and one-click quick replies.</p>
                            </CardContent>
                        </Card>

                        {/* Advanced Analytics Card */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <CardContent className="pt-6">
                                <div className="relative mx-auto flex aspect-square size-32 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                                    <div className="m-auto h-fit w-24 relative">
                                        {/* Analytics visualization */}
                                        <div className="w-full h-16 relative">
                                            <div className="absolute top-0 left-0 text-xs font-semibold text-gray-900">$890.93</div>
                                            <div className="absolute top-0 right-0 text-xs text-gray-500">1.8K</div>
                                            <div className="absolute bottom-0 right-0 text-xs text-gray-500">0.9k</div>
                                            
                                            {/* Chart bars */}
                                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end space-x-1">
                                                {[12, 20, 15, 25, 18, 22, 20, 28, 15, 18].map((height, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-1.5 rounded-sm ${i === 4 ? 'bg-orange-500' : 'bg-gray-300'}`}
                                                        style={{ height: `${height}px` }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative z-10 mt-6 space-y-2 text-center">
                                    <h2 className="text-lg font-medium transition text-gray-900">Advanced Analytics Dashboard</h2>
                                    <p className="text-sm text-gray-600">Monitor your X and LinkedIn performance in real time—track engagement, uncover trends, and spot growth opportunities.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Multi-Profile Management Card */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <CardContent className="pt-6">
                                <div className="pt-6 lg:px-6">
                                    <div className="w-full h-20 relative flex items-center justify-center">
                                        {/* Profile management visualization */}
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                                                <Users className="h-6 w-6 text-white" />
                                            </div>
                                            {/* Surrounding profile indicators */}
                                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-orange-300 rounded-full"></div>
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-300 rounded-full"></div>
                                            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-300 rounded-full"></div>
                                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-orange-300 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative z-10 mt-8 space-y-2 text-center">
                                    <h2 className="text-lg font-medium transition text-gray-900">Multi-Profile Management</h2>
                                    <p className="text-sm text-gray-600">Effortlessly manage multiple Twitter and LinkedIn accounts—switch between them seamlessly and stay organized.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI-powered Post Ideas Card */}
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <CardContent className="grid pt-6 sm:grid-cols-2">
                                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                    <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                                        <Brain className="m-auto size-5 text-orange-500" strokeWidth={1} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-lg font-medium text-gray-900 transition">AI-powered Post Ideas & Rewrites</h2>
                                        <p className="text-sm text-gray-600">Generate content suggestions, fresh tweet ideas, and profile-aligned post rewrites in seconds.</p>
                                    </div>
                                </div>
                                <div className="rounded-tl-lg relative -mb-6 -mr-6 mt-6 h-fit border-l border-t p-6 py-6 sm:ml-6 bg-gray-50">
                                    <div className="absolute left-3 top-2 flex gap-1">
                                        <span className="block size-2 rounded-full border bg-red-400"></span>
                                        <span className="block size-2 rounded-full border bg-yellow-400"></span>
                                        <span className="block size-2 rounded-full border bg-green-400"></span>
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                                        <div className="h-2 bg-orange-300 rounded w-1/2"></div>
                                        <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                                        <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Smart Scheduler & Engagement Boosters Card */}
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                    <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                                        <Calendar className="m-auto size-6 text-orange-500" strokeWidth={1} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-lg font-medium transition text-gray-900">Smart Social Media Scheduler</h2>
                                        <p className="text-sm text-gray-600">Plan, schedule, and publish compelling content using a creator-focused scheduling tool.</p>
                                    </div>
                                </div>
                                <div className="relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px before:bg-gray-200 sm:-my-6 sm:-mr-6">
                                    <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                                        <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                                            <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm bg-orange-100 text-orange-700">Scheduled</span>
                                            <div className="ring-background size-7 ring-4">
                                                <div className="size-full rounded-full bg-orange-500 flex items-center justify-center">
                                                    <Calendar className="h-3 w-3 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                                            <div className="ring-background size-8 ring-4">
                                                <div className="size-full rounded-full bg-green-500 flex items-center justify-center">
                                                    <Repeat className="h-4 w-4 text-white" />
                                                </div>
                                            </div>
                                            <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm bg-green-100 text-green-700">Auto-Boost</span>
                                        </div>
                                        <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                                            <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm bg-blue-100 text-blue-700">Published</span>
                                            <div className="ring-background size-7 ring-4">
                                                <div className="size-full rounded-full bg-blue-500 flex items-center justify-center">
                                                    <Chrome className="h-3 w-3 text-white" />
                                                </div>
                                            </div>
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