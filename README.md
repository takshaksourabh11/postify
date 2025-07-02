# Postify Authentication System

A complete user authentication system with social media login for X (Twitter) and LinkedIn, built with Next.js, NextAuth.js, and modern security practices.

## 🚀 Features

### ✨ **Authentication**
- **OAuth2.0 Social Login** - Twitter/X and LinkedIn integration
- **Secure Session Management** - JWT-based stateless sessions
- **Permission-based Access** - Granular permission system
- **Modern UI/UX** - Beautiful modal-based authentication flow

### 🔒 **Security**
- **Industry Standards** - OAuth2.0 compliance
- **Encrypted Sessions** - Secure JWT tokens
- **CSRF Protection** - Built-in security measures
- **Data Privacy** - No password storage, OAuth-only

### 📊 **Database Integration**
- **User Management** - Complete user lifecycle
- **Account Linking** - Multiple OAuth providers per user
- **Session Tracking** - Secure session management
- **Data Relationships** - Posts, analytics, and user preferences

## 🛠️ Installation & Setup

### 1. **Install Dependencies**
```bash
npm install next-auth jose bcryptjs jsonwebtoken
npm install @types/bcryptjs @types/jsonwebtoken
```

### 2. **Environment Configuration**
Create `.env.local` file with your OAuth credentials:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# Twitter OAuth2.0 Credentials
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret

# LinkedIn OAuth2.0 Credentials
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

# Database URL
DATABASE_URL=postgresql://username:password@localhost:5432/postify
```

### 3. **OAuth Provider Setup**

#### **Twitter/X Setup:**
1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app or use existing one
3. Enable OAuth2.0 with PKCE
4. Add callback URL: `http://localhost:3000/api/auth/callback/twitter`
5. Copy Client ID and Client Secret

#### **LinkedIn Setup:**
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Create a new app
3. Add "Sign In with LinkedIn" product
4. Add callback URL: `http://localhost:3000/api/auth/callback/linkedin`
5. Copy Client ID and Client Secret

### 4. **Database Setup**
Use the provided SQL schema in `lib/database.ts` to create your database tables:

```sql
-- Run the SQL_SCHEMA from lib/database.ts
-- This creates users, accounts, sessions, and posts tables
```

## 📁 **File Structure**

```
├── components/ui/
│   └── auth-modal.tsx          # Authentication modal component
├── lib/
│   ├── auth.ts                 # NextAuth.js configuration
│   └── database.ts             # Database operations and schema
├── app/api/auth/
│   ├── [...nextauth]/route.ts  # NextAuth.js API routes
│   └── user/route.ts           # User management API
├── hooks/
│   └── use-auth.ts             # Authentication hook
├── middleware.ts               # Route protection middleware
└── .env.local                  # Environment variables
```

## 🎯 **Usage Examples**

### **Basic Authentication**
```tsx
import { AuthModal } from '@/components/ui/auth-modal';
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signup' });

  return (
    <div>
      {isAuthenticated ? (
        <div>Welcome, {user?.name}!</div>
      ) : (
        <Button onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}>
          Sign Up
        </Button>
      )}
      
      <AuthModal 
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: 'signup' })}
        mode={authModal.mode}
      />
    </div>
  );
}
```

### **Protected Routes**
```tsx
// middleware.ts automatically protects routes
// Add routes to config.matcher to require authentication

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/premium/:path*',
    '/api/protected/:path*'
  ]
};
```

### **API Usage**
```tsx
// Get current user
const response = await fetch('/api/auth/user');
const { user } = await response.json();

// Update user preferences
await fetch('/api/auth/user', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    preferences: { theme: 'dark', notifications: true }
  })
});
```

## 🔐 **Security Features**

### **OAuth2.0 Compliance**
- ✅ PKCE (Proof Key for Code Exchange)
- ✅ State parameter validation
- ✅ Secure redirect handling
- ✅ Token refresh management

### **Session Security**
- ✅ JWT with secure signing
- ✅ HttpOnly cookies
- ✅ CSRF protection
- ✅ Session expiration

### **Data Protection**
- ✅ No password storage
- ✅ Encrypted access tokens
- ✅ Secure database operations
- ✅ Input validation

## 📊 **Database Schema**

### **Users Table**
```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  image TEXT,
  plan_type ENUM('free', 'premium') DEFAULT 'free',
  preferences JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Accounts Table (OAuth)**
```sql
CREATE TABLE accounts (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🚀 **Deployment**

### **Environment Variables**
Set these in your production environment:
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - Strong random secret
- OAuth credentials for each provider
- Database connection string

### **OAuth Callback URLs**
Update your OAuth apps with production URLs:
- Twitter: `https://yourdomain.com/api/auth/callback/twitter`
- LinkedIn: `https://yourdomain.com/api/auth/callback/linkedin`

## 🔧 **Customization**

### **Adding New Providers**
```tsx
// In lib/auth.ts
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    // ... existing providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
```

### **Custom Permission System**
```tsx
// In hooks/use-auth.ts
const hasPermission = useCallback((permission: string) => {
  const userRoles = session?.user?.roles || [];
  return userRoles.includes(permission);
}, [session]);
```

## 📈 **Analytics & Monitoring**

The system includes built-in event tracking:
- User sign-in/sign-out events
- Authentication errors
- Session management
- API usage metrics

## 🆘 **Troubleshooting**

### **Common Issues**

1. **OAuth Redirect Mismatch**
   - Ensure callback URLs match exactly in OAuth app settings
   - Check NEXTAUTH_URL environment variable

2. **Session Not Persisting**
   - Verify NEXTAUTH_SECRET is set
   - Check cookie settings in production

3. **Database Connection**
   - Verify DATABASE_URL format
   - Ensure database tables exist

### **Debug Mode**
Enable debug logging in development:
```tsx
// In lib/auth.ts
export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  // ... other options
};
```

## 📚 **API Reference**

### **Authentication Endpoints**
- `GET /api/auth/signin` - Sign in page
- `POST /api/auth/signin/:provider` - Initiate OAuth flow
- `GET /api/auth/callback/:provider` - OAuth callback
- `POST /api/auth/signout` - Sign out

### **User Management**
- `GET /api/auth/user` - Get current user
- `PUT /api/auth/user` - Update user
- `DELETE /api/auth/user` - Delete account

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using Next.js, NextAuth.js, and modern web standards.**