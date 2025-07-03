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
    detectSessionInUrl: true,
    flowType: 'pkce'
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
  last_updated: string | null
}

// X (Twitter) API Configuration
export const X_API_CONFIG = {
  apiKey: 'OwepxdbZkTdxijYC4uwlBNfvg',
  apiSecret: 'DJfRSjDfjlNlGQAuQo8Cq9Vsr9CPLRzExHX3Wz6CABTsYeeCiV',
  bearerToken: 'AAAAAAAAAAAAAAAAAAAAAMeL2wEAAAAAKulUNXu4jzLtOeuNsaSyaCSPQcM%3DYHwqx3UJ6cwjUt90n5ODn8bfsiWEH79ExkI3MpzGlRlAZPxXuO',
  accessToken: '1472966333528625155-GevJ1CZnwCiQQvrlqdkJZezlXDYN4h',
  accessTokenSecret: 'TSO3jrbIvV9zor3yh6t2dglNzBs0xhRU9eMfnTGrpJT7y',
  clientId: 'UkZZSEJEWDdOYWluMnZ1Y1Bja206MTpjaQ',
  clientSecret: 'kAsXjNr_Tf9vSjR7R_CagzJ-nmczdCd3X4dsQCEwlePFt2v1am',
  callbackUrl: 'https://kqjgrolqbwgavnhzkfdc.supabase.co/auth/v1/callback'
}

// Database operations with enhanced error handling and retry logic
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
    const maxRetries = 3
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempting to upsert user (attempt ${attempt}/${maxRetries}):`, userData.id)

        // Validate required fields
        if (!userData.id || !userData.email || !userData.name) {
          throw new Error('Missing required user data: id, email, or name')
        }

        // Clean and validate data
        const cleanEmail = userData.email.toLowerCase().trim()
        const cleanName = userData.name.trim()

        if (!cleanEmail || !cleanName) {
          throw new Error('Email and name cannot be empty')
        }

        // Get current user preferences if they exist
        let existingPreferences = null
        try {
          const { data: existingUser } = await supabase
            .from('users')
            .select('preferences')
            .eq('id', userData.id)
            .single()
          
          if (existingUser) {
            existingPreferences = existingUser.preferences
          }
        } catch (error) {
          // User doesn't exist yet, which is fine
          console.log('User does not exist yet, will create new profile')
        }

        const userRecord = {
          id: userData.id,
          email: cleanEmail,
          name: cleanName,
          avatar_url: userData.avatar_url || null,
          updated_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          // Only set default preferences if user doesn't exist
          ...(existingPreferences ? {} : {
            preferences: {
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
              language: navigator.language?.split('-')[0] || 'en',
              email_notifications: true,
              push_notifications: true,
              auto_scheduling: false,
              default_post_time: '09:00'
            }
          })
        }

        console.log('Upserting user record:', userRecord)

        const { data, error } = await supabase
          .from('users')
          .upsert(userRecord, {
            onConflict: 'id',
            ignoreDuplicates: false
          })
          .select()
          .single()

        if (error) {
          console.error(`Upsert error (attempt ${attempt}):`, error)
          lastError = new Error(`Database error: ${error.message}`)
          
          // Don't retry on certain errors
          if (error.code === 'PGRST116' || error.message.includes('JWT') || error.message.includes('permission')) {
            throw lastError
          }
          
          if (attempt === maxRetries) {
            throw lastError
          }
          
          // Wait before retry with exponential backoff
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)))
          continue
        }

        if (!data) {
          lastError = new Error('No data returned from upsert operation')
          if (attempt === maxRetries) {
            throw lastError
          }
          continue
        }

        console.log('User upserted successfully:', data.id)
        return data

      } catch (error) {
        console.error(`Error in upsertUser attempt ${attempt}:`, error)
        lastError = error instanceof Error ? error : new Error('Unknown error')
        
        if (attempt === maxRetries) {
          throw lastError
        }
        
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)))
      }
    }

    throw lastError || new Error('Failed to upsert user after all retries')
  }

  /**
   * Get user by ID with retry logic
   */
  static async getUserById(userId: string): Promise<User | null> {
    const maxRetries = 3
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Fetching user by ID (attempt ${attempt}/${maxRetries}):`, userId)

        if (!userId) {
          throw new Error('User ID is required')
        }

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) {
          console.error(`Get user error (attempt ${attempt}):`, error)
          
          // If user not found, don't retry
          if (error.code === 'PGRST116') {
            console.log('User not found in database:', userId)
            return null
          }
          
          lastError = new Error(`Database error: ${error.message}`)
          
          if (attempt === maxRetries) {
            throw lastError
          }
          
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)))
          continue
        }

        console.log('User fetched successfully:', data?.id)
        return data

      } catch (error) {
        console.error(`Error in getUserById attempt ${attempt}:`, error)
        lastError = error instanceof Error ? error : new Error('Unknown error')
        
        if (attempt === maxRetries) {
          throw lastError
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)))
      }
    }

    throw lastError || new Error('Failed to get user after all retries')
  }

  /**
   * Update user preferences
   */
  static async updateUserPreferences(
    userId: string, 
    preferences: Partial<UserPreferences>
  ): Promise<User | null> {
    try {
      console.log('Updating user preferences:', userId, preferences)

      if (!userId) {
        throw new Error('User ID is required')
      }

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
        throw new Error(`Failed to update preferences: ${error.message}`)
      }

      console.log('Preferences updated successfully')
      return data

    } catch (error) {
      console.error('Error in updateUserPreferences:', error)
      throw error
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
      console.log('Creating new post:', postData)

      if (!postData.user_id || !postData.content || !postData.platform) {
        throw new Error('Missing required post data')
      }

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
            last_updated: null
          }
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating post:', error)
        throw new Error(`Failed to create post: ${error.message}`)
      }

      console.log('Post created successfully:', data.id)
      return data

    } catch (error) {
      console.error('Error in createPost:', error)
      throw error
    }
  }

  /**
   * Get user's posts with pagination
   */
  static async getUserPosts(
    userId: string, 
    limit: number = 50, 
    offset: number = 0
  ): Promise<Post[]> {
    try {
      console.log('Fetching user posts:', userId, { limit, offset })

      if (!userId) {
        throw new Error('User ID is required')
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Error getting posts:', error)
        throw new Error(`Failed to get posts: ${error.message}`)
      }

      console.log(`Fetched ${data?.length || 0} posts for user`)
      return data || []

    } catch (error) {
      console.error('Error in getUserPosts:', error)
      return []
    }
  }

  /**
   * Update post engagement data
   */
  static async updatePostEngagement(
    postId: string,
    engagement: Partial<PostEngagement>
  ): Promise<Post | null> {
    try {
      console.log('Updating post engagement:', postId, engagement)

      if (!postId) {
        throw new Error('Post ID is required')
      }

      const { data, error } = await supabase
        .from('posts')
        .update({
          engagement: {
            ...engagement,
            last_updated: new Date().toISOString()
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', postId)
        .select()
        .single()

      if (error) {
        console.error('Error updating engagement:', error)
        throw new Error(`Failed to update engagement: ${error.message}`)
      }

      console.log('Engagement updated successfully')
      return data

    } catch (error) {
      console.error('Error in updatePostEngagement:', error)
      throw error
    }
  }
}