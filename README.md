
# Kru English - Online English Learning Platform

A comprehensive online English learning platform designed specifically for Thai learners, featuring live sessions, structured courses, and subscription-based access.

## 🌟 Features

- **Multi-language Support**: Thai and English interface
- **Live Learning Sessions**: Real-time classes with professional teachers
- **Course Management**: Structured learning paths for different skill levels
- **Subscription System**: Flexible pricing with Stripe integration
- **User Authentication**: Secure login/signup with Supabase
- **Real-time Updates**: Live subscription status and notifications
- **Mobile Responsive**: Optimized for all device sizes

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Authentication**: Supabase Auth
- **Payments**: Stripe API
- **Deployment**: Lovable Platform

## 📖 Documentation

This project includes comprehensive documentation to help you understand and contribute:

- **[📁 File Structure Guide](./filesExplainer.md)** - Detailed explanation of every file and directory
- **[🏛️ System Architecture](./architecture.svg)** - Visual diagram of application architecture
- **[⚙️ Available Scripts](./scripts.md)** - Complete guide to all npm scripts and their usage
- **[📂 Structure Recommendations](./structure-recommendations.md)** - Best practices and improvement suggestions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Required Accounts

- **Supabase Account**: For backend services
- **Stripe Account**: For payment processing
- **Lovable Account**: For deployment (optional)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-git-url>
cd kru-english
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_PUBLIC_SUPABASE_URL=your_supabase_project_url
VITE_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Start Development

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🔧 Full Installation Guide

For detailed setup instructions, including Supabase configuration, database schema, and Stripe integration, see the complete installation section below.

<details>
<summary>📖 Click to expand full installation guide</summary>

### Supabase Setup

#### Database Configuration

1. Create a new Supabase project
2. Run the following SQL to set up the database schema:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  profile_picture TEXT,
  role user_role DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscribers table for subscription management
CREATE TABLE public.subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  user_id UUID,
  stripe_customer_id TEXT,
  subscribed BOOLEAN DEFAULT FALSE,
  subscription_tier TEXT,
  subscription_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own subscription" ON subscribers FOR SELECT USING (user_id = auth.uid() OR email = auth.email());
```

#### Edge Functions Setup

Deploy the edge functions:

```bash
# Navigate to supabase directory
cd supabase

# Deploy functions
supabase functions deploy check-subscription
supabase functions deploy create-checkout
supabase functions deploy customer-portal
```

#### Required Secrets

Set up the following secrets in your Supabase dashboard:

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Stripe Configuration

1. Create a Stripe account and get your API keys
2. Set up products in Stripe with the following pricing (in Thai Baht):
   - **General Package**: ฿390/month
   - **CEFR Package**: ฿590/month  
   - **Combo Package**: ฿1,500/month
3. Configure webhooks to point to your Supabase edge functions

</details>

## 🛠️ Development

### Available Scripts

| Script | Purpose | Documentation |
|--------|---------|---------------|
| `npm run dev` | Start development server | [See scripts.md](./scripts.md#npm-run-dev) |
| `npm run build` | Build for production | [See scripts.md](./scripts.md#npm-run-build) |
| `npm run preview` | Preview production build | [See scripts.md](./scripts.md#npm-run-preview) |
| `npm run lint` | Check code quality | [See scripts.md](./scripts.md#npm-run-lint) |
| `npm run type-check` | Validate TypeScript | [See scripts.md](./scripts.md#npm-run-type-check) |

For complete script documentation, see **[scripts.md](./scripts.md)**

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── live/           # Live session components
│   ├── pages/          # Page components
│   └── ui/             # Reusable UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── data/               # Static data and mock data
├── lib/                # Utility functions
└── pages/              # Main page components
```

For detailed file explanations, see **[filesExplainer.md](./filesExplainer.md)**

## 🔐 Authentication Flow

1. User clicks login/signup
2. AuthModal component handles form submission
3. Supabase Auth processes authentication
4. useAuth hook manages auth state globally
5. Protected routes check authentication status
6. User profile created automatically via database trigger

## 💳 Payment Flow

1. User selects subscription package
2. create-checkout edge function creates Stripe session
3. User completes payment on Stripe
4. Webhook updates subscription status
5. check-subscription function verifies current status
6. UI updates to reflect subscription state

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Check code coverage
npm run test:coverage
```

## 🌐 Deployment

### Deploy to Lovable

1. Connect your GitHub repository to Lovable
2. Configure environment variables in Lovable dashboard
3. Deploy directly from the Lovable interface

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting service

## 🤝 Contributing

We welcome contributions! Please see our contribution guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

### Code Style

- Use TypeScript for all new code
- Follow React hooks patterns
- Use Tailwind CSS for styling
- Write descriptive commit messages
- Add proper error handling

### Development Workflow

```bash
# Full development setup
npm run clean
npm install
npm run generate-types
npm run dev

# Pre-commit checks
npm run lint
npm run type-check
npm run test
```

## 📞 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the [documentation files](./filesExplainer.md)
- Review the [architecture diagram](./architecture.svg)
- Consult the [scripts documentation](./scripts.md)

## 🔧 Maintenance

For information about maintaining and improving the project structure, see **[structure-recommendations.md](./structure-recommendations.md)**

## 📄 License

This project is proprietary software. All rights reserved.

## 🙏 Acknowledgments

- **Supabase** for backend infrastructure
- **Stripe** for payment processing
- **shadcn/ui** for component library
- **Tailwind CSS** for styling framework
- **Lovable** for development platform

---

**Built with ❤️ for Thai English learners**

### 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
