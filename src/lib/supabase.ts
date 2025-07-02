import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  plan_type: 'free' | 'premium'
  preferences: UserPreferences
  created_at: string
  updated_at: string
  last_login_at?: string
}

export interface UserPreferences {
  timezone: string
  language: string
  email_notifications: boolean
  push_notifications: boolean
  auto_scheduling: boolean
  default_post_time: string
}

export interface Post {
  id: string
  user_id: string
  content: string
  platform: 'twitter' | 'linkedin'
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  scheduled_at?: string
  published_at?: string
  engagement: PostEngagement
  created_at: string
  updated_at: string
}

export interface PostEngagement {
  likes: number
  shares: number
  comments: number
  impressions: number
  clicks: number
  last_updated: string
}

// Database operations
export class DatabaseOperations {
  /**
   * Create or update user profile after authentication
   */
  static async upsertUser(userData: {
    id: string
    email: string
    name: string
    avatar_url?: string
  }): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          avatar_url: userData.avatar_url,
          updated_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          preferences: {
            timezone: 'UTC',
            language: 'en',
            email_notifications: true,
            push_notifications: true,
            auto_scheduling: false,
            default_post_time: '09:00'
          }
        }, {
          onConflict: 'id'
        })
        .select()
        .single()

      if (error) {
        console.error('Error upserting user:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in upsertUser:', error)
      return null
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error getting user:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getUserById:', error)
      return null
    }
  }

  /**
   * Update user preferences
   */
  static async updateUserPreferences(
    userId: string, 
    preferences: Partial<UserPreferences>
  ): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          preferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error updating preferences:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in updateUserPreferences:', error)
      return null
    }
  }

  /**
   * Create a new post
   */
  static async createPost(postData: {
    user_id: string
    content: string
    platform: 'twitter' | 'linkedin'
    status?: 'draft' | 'scheduled' | 'published'
    scheduled_at?: string
  }): Promise<Post | null> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...postData,
          engagement: {
            likes: 0,
            shares: 0,
            comments: 0,
            impressions: 0,
            clicks: 0,
            last_updated: new Date().toISOString()
          }
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating post:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in createPost:', error)
      return null
    }
  }

  /**
   * Get user's posts
   */
  static async getUserPosts(userId: string): Promise<Post[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error getting posts:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getUserPosts:', error)
      return []
    }
  }
}