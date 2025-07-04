
# Project File Structure Explanation

## Root Directory
```
├── README.md 🟢 - Main project documentation and setup guide
├── package.json 🟢 - Project dependencies, scripts, and metadata
├── package-lock.json 🟡 - Locked dependency versions for reproducible builds
├── vite.config.ts 🟢 - Vite build tool configuration for React/TypeScript
├── tailwind.config.ts 🟢 - Tailwind CSS styling framework configuration
├── tsconfig.json 🟢 - TypeScript compiler configuration
├── tsconfig.app.json 🟡 - TypeScript config for application code
├── tsconfig.node.json 🟡 - TypeScript config for Node.js environment
├── postcss.config.js 🟡 - PostCSS configuration for CSS processing
├── components.json 🟡 - Shadcn/ui component library configuration
├── eslint.config.js 🟡 - ESLint linting rules configuration
├── bun.lockb 🔴 - Bun package manager lock file
└── .gitignore 🟡 - Git ignore patterns for excluded files
```

## Source Directory (`src/`)
```
src/
├── main.tsx 🟢 - Application entry point, renders root component
├── App.tsx 🟢 - Root application component with routing and providers
├── App.css 🔴 - Legacy CSS styles (mostly unused due to Tailwind)
├── index.css 🟢 - Global styles, Tailwind imports, and custom CSS classes
├── vite-env.d.ts 🟡 - Vite environment type definitions
```

### Pages (`src/pages/`)
```
pages/
├── Index.tsx 🟢 - Main landing page with tab navigation system
└── NotFound.tsx 🟡 - 404 error page for unmatched routes
```

### Components Directory (`src/components/`)

#### Layout Components (`src/components/layout/`)
```
layout/
├── Header.tsx 🟢 - Navigation header with authentication and language toggle
└── Footer.tsx 🟡 - Site footer with links and branding
```

#### Page Components (`src/components/pages/`)
```
pages/
├── Dashboard.tsx 🟢 - Main dashboard with course overview and progress
├── Courses.tsx 🟢 - Course listing and filtering interface
├── Live.tsx 🟢 - Live session scheduling and management
├── Pricing.tsx 🟢 - Subscription packages and payment integration
├── Profile.tsx 🟢 - User profile and subscription management
└── Success.tsx 🟡 - Payment success confirmation page
```

#### Live Session Components (`src/components/live/`)
```
live/
├── DateFilter.tsx 🟡 - Date filtering for live sessions
├── EmptyState.tsx 🟡 - Empty state when no sessions available
├── LiveBanner.tsx 🟡 - Banner for currently live sessions
├── LiveSessionCard.tsx 🟡 - Individual live session display card
└── WeeklySchedule.tsx 🟡 - Weekly schedule overview component
```

#### Authentication Components (`src/components/auth/`)
```
auth/
└── AuthModal.tsx 🟢 - Login/signup modal with form validation
```

#### UI Components (`src/components/ui/`)
```
ui/
├── button.tsx 🟢 - Reusable button component (shadcn/ui)
├── card.tsx 🟢 - Card container component (shadcn/ui)
├── badge.tsx 🟡 - Badge/tag component (shadcn/ui)
├── input.tsx 🟡 - Form input component (shadcn/ui)
├── dialog.tsx 🟡 - Modal dialog component (shadcn/ui)
├── toast.tsx 🟡 - Toast notification component (shadcn/ui)
├── toaster.tsx 🟡 - Toast container component (shadcn/ui)
├── use-toast.ts 🟡 - Toast hook for notifications
└── [30+ other shadcn/ui components] 🟡 - Comprehensive UI component library
```

### Hooks Directory (`src/hooks/`)
```
hooks/
├── useAuth.tsx 🟢 - Authentication state management and Supabase integration
├── useLanguage.tsx 🟢 - Language switching (Thai/English) context
├── use-toast.ts 🟡 - Toast notification management hook
└── use-mobile.tsx 🟡 - Mobile device detection hook
```

### Data Directory (`src/data/`)
```
data/
└── liveSessions.ts 🟡 - Mock data for live session demonstrations
```

### Integrations (`src/integrations/`)
```
integrations/
└── supabase/
    ├── client.ts 🟢 - Supabase client configuration and initialization
    └── types.ts 🟢 - Generated TypeScript types from Supabase schema
```

### Utilities (`src/lib/`)
```
lib/
└── utils.ts 🟡 - Utility functions for class names and common operations
```

## Supabase Directory (`supabase/`)
```
supabase/
├── config.toml 🟢 - Supabase project configuration
└── functions/
    ├── check-subscription/
    │   └── index.ts 🟢 - Edge function to verify user subscription status
    ├── create-checkout/
    │   └── index.ts 🟢 - Edge function for Stripe payment processing
    └── customer-portal/
        └── index.ts 🟢 - Edge function for Stripe customer portal access
```

## Public Directory (`public/`)
```
public/
├── favicon.ico 🟡 - Website favicon
├── placeholder.svg 🔴 - Default placeholder image
├── robots.txt 🔴 - Search engine crawling instructions
└── lovable-uploads/ 🟡 - User-uploaded images and assets
```

## Environment Configuration
```
.env 🟢 - Environment variables for Supabase configuration
```

## Key Dependencies and Relationships

### High Importance Files (🟢)
- **Core Application**: `main.tsx` → `App.tsx` → `Index.tsx`
- **Authentication Flow**: `useAuth.tsx` ↔ `AuthModal.tsx` ↔ Supabase functions
- **Payment System**: `Pricing.tsx` → Stripe edge functions → `Profile.tsx`
- **Database**: `supabase/client.ts` ↔ `types.ts` ↔ all components
- **Styling**: `tailwind.config.ts` → `index.css` → all components

### Medium Importance Files (🟡)
- **Configuration Files**: Build and development environment setup
- **UI Components**: Reusable interface elements from shadcn/ui
- **Utility Components**: Date filters, empty states, banners

### Low Importance Files (🔴)
- **Legacy/Generated**: Lock files, placeholder content, unused assets

## Component Dependency Tree
```
App.tsx
├── AuthProvider (useAuth.tsx)
├── LanguageProvider (useLanguage.tsx)
├── Header.tsx
│   ├── AuthModal.tsx
│   └── Language toggle
├── Index.tsx (main routing)
│   ├── Dashboard.tsx
│   ├── Courses.tsx
│   ├── Live.tsx
│   │   ├── LiveSessionCard.tsx
│   │   ├── DateFilter.tsx
│   │   └── WeeklySchedule.tsx
│   ├── Pricing.tsx → Stripe integration
│   └── Profile.tsx → Subscription management
└── Footer.tsx
```
