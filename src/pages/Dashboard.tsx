import { useAuth } from '../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Calendar,
  Settings,
  LogOut,
  Plus,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Bug,
  Twitter,
  Linkedin,
  Clock,
  Target,
  Zap,
  Edit3,
  Send,
  MoreHorizontal,
  Filter,
  Download,
  Bell,
  Search,
  ChevronDown,
  Activity,
  Globe,
  Sparkles
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { DatabaseOperations } from '../lib/supabase'

interface DashboardStats {
  totalPosts: number
  totalEngagement: number
  totalReach: number
  totalShares: number
  weeklyGrowth: {
    posts: number
    engagement: number
    reach: number
    shares: number
  }
}

interface RecentPost {
  id: string
  platform: 'twitter' | 'linkedin'
  content: string
  engagement: {
    likes: number
    shares: number
    comments: number
  }
  publishedAt: string
  status: 'published' | 'scheduled' | 'draft'
}

export default function Dashboard() {
  const { user, userProfile, signOut, debugAuthSystem } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalEngagement: 0,
    totalReach: 0,
    totalShares: 0,
    weeklyGrowth: {
      posts: 0,
      engagement: 0,
      reach: 0,
      shares: 0
    }
  })
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'analytics' | 'schedule'>('overview')

  useEffect(() => {
    loadDashboardData()
  }, [user])

  const loadDashboardData = async () => {
    if (!user) return

    try {
      setLoading(true)
      
      // Load user posts
      const posts = await DatabaseOperations.getUserPosts(user.id, 50, 0)
      
      // Calculate stats from posts
      const totalPosts = posts.length
      const totalEngagement = posts.reduce((sum, post) => 
        sum + post.engagement.likes + post.engagement.shares + post.engagement.comments, 0
      )
      const totalReach = posts.reduce((sum, post) => sum + post.engagement.impressions, 0)
      const totalShares = posts.reduce((sum, post) => sum + post.engagement.shares, 0)

      // Mock weekly growth data (in a real app, this would be calculated from historical data)
      const weeklyGrowth = {
        posts: 12,
        engagement: 8,
        reach: 15,
        shares: 23
      }

      setStats({
        totalPosts,
        totalEngagement,
        totalReach,
        totalShares,
        weeklyGrowth
      })

      // Format recent posts
      const formattedPosts: RecentPost[] = posts.slice(0, 5).map(post => ({
        id: post.id,
        platform: post.platform,
        content: post.content,
        engagement: {
          likes: post.engagement.likes,
          shares: post.engagement.shares,
          comments: post.engagement.comments
        },
        publishedAt: post.published_at || post.created_at,
        status: post.status as 'published' | 'scheduled' | 'draft'
      }))

      setRecentPosts(formattedPosts)

    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const handleDebugAuth = () => {
    debugAuthSystem()
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-4 w-4" />
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'bg-black text-white'
      case 'linkedin':
        return 'bg-[#0077B5] text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 text-orange-500">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                </svg>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Postify</h1>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="hidden md:flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'posts', label: 'Posts', icon: MessageSquare },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'schedule', label: 'Schedule', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <img 
                  src={userProfile?.avatar_url || user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.name || user?.user_metadata?.name || 'User')}&background=f97316&color=fff`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-700">
                    {userProfile?.name || user?.user_metadata?.name || 'User'}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {userProfile?.plan_type || 'Free'}
                  </Badge>
                </div>
              </div>
              
              {/* Debug Button (Development Only) */}
              {import.meta.env.DEV && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleDebugAuth}
                  title="Debug Authentication System"
                >
                  <Bug className="h-4 w-4" />
                </Button>
              )}
              
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {userProfile?.name?.split(' ')[0] || user?.user_metadata?.name?.split(' ')[0] || 'there'}! 👋
              </h2>
              <p className="text-gray-600">
                Here's what's happening with your social media presence today.
              </p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        {user && (
          <div className="mb-8">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-green-800">
                      {user.app_metadata?.provider === 'twitter' ? 'X (Twitter)' : 'Social Media'} Account Connected
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {user.app_metadata?.provider || 'Connected'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600">
                    Connected: {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your account is connected and ready for content management.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalPosts)}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{stats.weeklyGrowth.posts}% from last week
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Engagement</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalEngagement)}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{stats.weeklyGrowth.engagement}% from last week
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reach</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalReach)}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{stats.weeklyGrowth.reach}% from last week
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Shares</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalShares)}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{stats.weeklyGrowth.shares}% from last week
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Share2 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Posts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Recent Posts
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {recentPosts.length > 0 ? (
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getPlatformColor(post.platform)}`}>
                        {getPlatformIcon(post.platform)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getStatusColor(post.status)}>
                              {post.status}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-900 mb-2 line-clamp-2">{post.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {post.engagement.likes}
                          </span>
                          <span className="flex items-center">
                            <Share2 className="h-3 w-3 mr-1" />
                            {post.engagement.shares}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {post.engagement.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-500 mb-4">Start creating content to see your posts here</p>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Post
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions & Insights */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Content
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Accounts
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Content Ideas
                </Button>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Best posting time</span>
                    <span className="text-sm font-medium">9:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Top performing platform</span>
                    <div className="flex items-center space-x-1">
                      <Twitter className="h-3 w-3" />
                      <span className="text-sm font-medium">X (Twitter)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Engagement rate</span>
                    <span className="text-sm font-medium text-green-600">+12.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Follower growth</span>
                    <span className="text-sm font-medium text-green-600">+8.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Upcoming Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <Twitter className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Today, 2:00 PM</p>
                      <p className="text-sm font-medium truncate">Weekly productivity tips...</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-[#0077B5] rounded-full flex items-center justify-center">
                      <Linkedin className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Tomorrow, 9:00 AM</p>
                      <p className="text-sm font-medium truncate">Industry insights article...</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Scheduled
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analytics Chart Placeholder */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Performance Overview
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  Last 30 days
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Analytics Chart</p>
                <p className="text-sm text-gray-500">Your performance data will appear here once you start posting</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}