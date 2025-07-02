/**
 * Database schema and operations for user management
 * This example uses a generic interface that can be adapted to any database
 */

/**
 * User model interface
 * Represents the user table structure
 */
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date | null;
  
  // Subscription and plan information
  planType: 'free' | 'premium';
  subscriptionId?: string | null;
  subscriptionStatus?: 'active' | 'canceled' | 'past_due' | null;
  
  // User preferences
  preferences: UserPreferences;
  
  // Related data
  accounts: Account[];
  sessions: Session[];
  posts: Post[];
}

/**
 * Account model interface
 * Stores OAuth provider information
 */
export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Session model interface
 * Tracks user sessions
 */
export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User preferences interface
 * Stores user-specific settings
 */
export interface UserPreferences {
  timezone: string;
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  autoScheduling: boolean;
  defaultPostTime: string;
}

/**
 * Post model interface
 * Stores user's social media posts
 */
export interface Post {
  id: string;
  userId: string;
  content: string;
  platform: 'twitter' | 'linkedin';
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledAt?: Date | null;
  publishedAt?: Date | null;
  engagement: PostEngagement;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Post engagement interface
 * Tracks post performance metrics
 */
export interface PostEngagement {
  likes: number;
  shares: number;
  comments: number;
  impressions: number;
  clicks: number;
  lastUpdated: Date;
}

/**
 * Database operations class
 * Provides methods for user and account management
 */
export class DatabaseOperations {
  /**
   * Create a new user account
   */
  static async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      // Example implementation - replace with your database logic
      const user: User = {
        id: generateId(),
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // In production, save to database
      // await db.user.create({ data: user });
      
      console.log('Created user:', user);
      return user;
      
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }
  
  /**
   * Find user by email
   */
  static async findUserByEmail(email: string): Promise<User | null> {
    try {
      // Example implementation - replace with your database logic
      // return await db.user.findUnique({
      //   where: { email },
      //   include: { accounts: true, sessions: true }
      // });
      
      console.log('Finding user by email:', email);
      return null; // Placeholder
      
    } catch (error) {
      console.error('Error finding user:', error);
      throw new Error('Failed to find user');
    }
  }
  
  /**
   * Update user information
   */
  static async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    try {
      // Example implementation - replace with your database logic
      const updatedUser: User = {
        ...updates,
        id: userId,
        updatedAt: new Date(),
      } as User;
      
      // In production, update in database
      // await db.user.update({
      //   where: { id: userId },
      //   data: { ...updates, updatedAt: new Date() }
      // });
      
      console.log('Updated user:', updatedUser);
      return updatedUser;
      
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }
  
  /**
   * Create or update OAuth account
   */
  static async upsertAccount(accountData: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>): Promise<Account> {
    try {
      // Example implementation - replace with your database logic
      const account: Account = {
        id: generateId(),
        ...accountData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // In production, upsert in database
      // await db.account.upsert({
      //   where: {
      //     provider_providerAccountId: {
      //       provider: accountData.provider,
      //       providerAccountId: accountData.providerAccountId,
      //     },
      //   },
      //   update: {
      //     access_token: accountData.access_token,
      //     refresh_token: accountData.refresh_token,
      //     expires_at: accountData.expires_at,
      //     updatedAt: new Date(),
      //   },
      //   create: account,
      // });
      
      console.log('Upserted account:', account);
      return account;
      
    } catch (error) {
      console.error('Error upserting account:', error);
      throw new Error('Failed to upsert account');
    }
  }
  
  /**
   * Delete user account and all related data
   */
  static async deleteUser(userId: string): Promise<void> {
    try {
      // Example implementation - replace with your database logic
      // await db.$transaction([
      //   db.post.deleteMany({ where: { userId } }),
      //   db.session.deleteMany({ where: { userId } }),
      //   db.account.deleteMany({ where: { userId } }),
      //   db.user.delete({ where: { id: userId } }),
      // ]);
      
      console.log('Deleted user:', userId);
      
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }
}

/**
 * Generate unique ID
 * Replace with your preferred ID generation method
 */
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * SQL Schema for PostgreSQL/MySQL
 * Use this as a reference for creating your database tables
 */
export const SQL_SCHEMA = `
-- Users table
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  image TEXT,
  email_verified TIMESTAMP,
  plan_type ENUM('free', 'premium') DEFAULT 'free',
  subscription_id VARCHAR(255),
  subscription_status ENUM('active', 'canceled', 'past_due'),
  preferences JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_subscription (subscription_id)
);

-- Accounts table (OAuth providers)
CREATE TABLE accounts (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type VARCHAR(255),
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_provider_account (provider, provider_account_id),
  INDEX idx_user_id (user_id)
);

-- Sessions table
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  expires TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_session_token (session_token),
  INDEX idx_user_id (user_id)
);

-- Posts table
CREATE TABLE posts (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  platform ENUM('twitter', 'linkedin') NOT NULL,
  status ENUM('draft', 'scheduled', 'published', 'failed') DEFAULT 'draft',
  scheduled_at TIMESTAMP,
  published_at TIMESTAMP,
  engagement JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_scheduled_at (scheduled_at)
);
`;