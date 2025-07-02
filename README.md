# Postify - React + Supabase

A modern social media management platform built with React, Vite, and Supabase. Automate your X (Twitter) and LinkedIn content with AI-powered tools.

## 🚀 Features

### ✨ **Authentication**
- **OAuth2.0 Social Login** - Twitter/X and LinkedIn integration
- **Supabase Auth** - Secure, scalable authentication
- **Modern UI/UX** - Beautiful modal-based authentication flow

### 🔒 **Security**
- **Row Level Security (RLS)** - Database-level security
- **OAuth2.0 Standards** - Industry-standard security
- **Encrypted Sessions** - Secure session management

### 📊 **Database Integration**
- **Supabase Database** - PostgreSQL with real-time features
- **User Management** - Complete user lifecycle
- **Post Management** - Content creation and scheduling
- **Analytics Tracking** - Performance metrics

## 🛠️ Installation & Setup

### 1. **Clone and Install**
```bash
git clone <repository-url>
cd postify-react
npm install
```

### 2. **Supabase Setup**

#### Create a Supabase Project
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Wait for the database to be ready

#### Configure Authentication Providers

**Twitter/X Setup:**
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Twitter provider
4. Add your Twitter OAuth credentials:
   - Client ID: `your_twitter_client_id`
   - Client Secret: `your_twitter_client_secret`
5. Add redirect URL: `https://your-project-ref.supabase.co/auth/v1/callback`

**LinkedIn Setup:**
1. In the same Providers section
2. Enable LinkedIn (OIDC) provider
3. Add your LinkedIn OAuth credentials:
   - Client ID: `your_linkedin_client_id`
   - Client Secret: `your_linkedin_client_secret`
4. Add redirect URL: `https://your-project-ref.supabase.co/auth/v1/callback`

#### Run Database Migrations
1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Initialize Supabase in your project:
```bash
supabase init
```

3. Link to your project:
```bash
supabase link --project-ref your-project-ref
```

4. Run migrations:
```bash
supabase db push
```

### 3. **Environment Configuration**
Create `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. **OAuth Provider Setup**

#### **Twitter/X Developer Setup:**
1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app or use existing one
3. Enable OAuth2.0 with PKCE
4. Add callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`
5. Set scopes: `tweet.read users.read follows.read offline.access`

#### **LinkedIn Developer Setup:**
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Create a new app
3. Add "Sign In with LinkedIn using OpenID Connect" product
4. Add callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`
5. Set scopes: `openid profile email`

### 5. **Start Development Server**
```bash
npm run dev
```

## 📁 **Project Structure**

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── auth-modal.tsx  # Authentication modal
│   │   ├── button.tsx      # Button component
│   │   ├── card.tsx        # Card component
│   │   └── ...
│   └── ProtectedRoute.tsx  # Route protection
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── lib/
│   ├── supabase.ts         # Supabase client and operations
│   └── utils.ts            # Utility functions
├── pages/
│   ├── Home.tsx            # Landing page
│   └── Dashboard.tsx       # User dashboard
├── App.tsx                 # Main app component
├── main.tsx               # App entry point
└── index.css              # Global styles

supabase/
└── migrations/
    └── 001_initial_schema.sql  # Database schema
```

## 🎯 **Usage Examples**

### **Authentication**
```tsx
import { useAuth } from './contexts/AuthContext'

function MyComponent() {
  const { user, signInWithProvider, signOut } = useAuth()

  const handleLogin = async () => {
    await signInWithProvider('twitter')
  }

  return (
    <div>
      {user ? (
        <div>Welcome, {user.user_metadata?.name}!</div>
      ) : (
        <button onClick={handleLogin}>Sign in with Twitter</button>
      )}
    </div>
  )
}
```

### **Database Operations**
```tsx
import { DatabaseOperations } from './lib/supabase'

// Create a post
const post = await DatabaseOperations.createPost({
  user_id: user.id,
  content: 'Hello, world!',
  platform: 'twitter',
  status: 'published'
})

// Get user posts
const posts = await DatabaseOperations.getUserPosts(user.id)
```

## 🔐 **Security Features**

### **Row Level Security (RLS)**
- ✅ Users can only access their own data
- ✅ Automatic policy enforcement
- ✅ Database-level security

### **OAuth2.0 Compliance**
- ✅ PKCE (Proof Key for Code Exchange)
- ✅ Secure redirect handling
- ✅ Token refresh management

### **Data Protection**
- ✅ No password storage
- ✅ Encrypted access tokens
- ✅ Secure database operations

## 📊 **Database Schema**

### **Users Table**
```sql
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  avatar_url text,
  plan_type plan_type DEFAULT 'free',
  preferences jsonb,
  created_at timestamptz DEFAULT now()
);
```

### **Posts Table**
```sql
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  content text NOT NULL,
  platform platform_type NOT NULL,
  status post_status DEFAULT 'draft',
  engagement jsonb,
  created_at timestamptz DEFAULT now()
);
```

## 🚀 **Deployment**

### **Build for Production**
```bash
npm run build
```

### **Deploy to Netlify/Vercel**
1. Connect your repository
2. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy!

### **Update OAuth Callback URLs**
Update your OAuth apps with production URLs:
- Twitter: `https://your-project-ref.supabase.co/auth/v1/callback`
- LinkedIn: `https://your-project-ref.supabase.co/auth/v1/callback`

## 🔧 **Customization**

### **Adding New Features**
1. Create new components in `src/components/`
2. Add database operations in `src/lib/supabase.ts`
3. Update database schema with new migrations

### **Styling**
- Uses Tailwind CSS for styling
- Customize theme in `tailwind.config.ts`
- Add custom styles in `src/index.css`

## 📈 **Analytics & Monitoring**

The system includes built-in tracking for:
- User authentication events
- Post creation and engagement
- Platform usage metrics
- Performance analytics

## 🆘 **Troubleshooting**

### **Common Issues**

1. **OAuth Redirect Mismatch**
   - Ensure callback URLs match exactly in OAuth app settings
   - Check Supabase project URL

2. **Database Connection**
   - Verify environment variables
   - Check Supabase project status

3. **Authentication Errors**
   - Verify OAuth credentials
   - Check provider configuration in Supabase

### **Debug Mode**
Enable debug logging:
```tsx
// In src/lib/supabase.ts
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true // Enable in development
  }
})
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using React, Vite, Supabase, and modern web standards.**