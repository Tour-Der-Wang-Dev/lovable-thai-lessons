
# Folder Structure Analysis & Recommendations

## Current Structure Assessment

### ✅ Strengths of Current Structure

1. **Clear Separation of Concerns**
   - Components are well-organized by functionality
   - Hooks are isolated in their own directory
   - Integration code is properly separated

2. **Modern React Patterns**
   - Custom hooks for state management
   - Component composition over inheritance
   - Proper separation of UI and business logic

3. **Scalable Architecture**
   - Page-based routing structure
   - Reusable UI components from shadcn/ui
   - Modular authentication system

### ⚠️ Areas for Improvement

1. **Component Organization**
   - Some components could be better grouped
   - Missing feature-based organization
   - No clear component hierarchy documentation

2. **Type Management**
   - Types are scattered across files
   - No centralized type definitions for domain objects
   - Missing API response types

3. **Utility Organization**
   - Limited utility functions
   - No constants management
   - Missing configuration centralization

## Recommended Structure

```
src/
├── components/
│   ├── common/              # Shared components
│   │   ├── LoadingSpinner/
│   │   ├── ErrorBoundary/
│   │   └── ConfirmDialog/
│   ├── features/            # Feature-specific components
│   │   ├── auth/
│   │   │   ├── AuthModal/
│   │   │   ├── LoginForm/
│   │   │   └── SignupForm/
│   │   ├── courses/
│   │   │   ├── CourseCard/
│   │   │   ├── CourseFilter/
│   │   │   └── CoursePlayer/
│   │   ├── live-sessions/
│   │   │   ├── SessionCard/
│   │   │   ├── SessionSchedule/
│   │   │   └── SessionPlayer/
│   │   ├── payments/
│   │   │   ├── PricingCard/
│   │   │   ├── CheckoutForm/
│   │   │   └── SubscriptionStatus/
│   │   └── profile/
│   │       ├── ProfileForm/
│   │       ├── SubscriptionPanel/
│   │       └── ActivityHistory/
│   ├── layout/              # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── PageLayout/
│   └── ui/                  # Base UI components (shadcn/ui)
├── pages/                   # Page components
├── hooks/                   # Custom React hooks
│   ├── auth/
│   ├── api/
│   └── ui/
├── services/               # API and external service calls
│   ├── api/
│   │   ├── auth.ts
│   │   ├── courses.ts
│   │   ├── payments.ts
│   │   └── subscriptions.ts
│   ├── supabase/
│   └── stripe/
├── types/                  # TypeScript type definitions
│   ├── api.ts
│   ├── auth.ts
│   ├── courses.ts
│   ├── payments.ts
│   └── index.ts
├── utils/                  # Utility functions
│   ├── constants/
│   ├── helpers/
│   ├── formatters/
│   └── validators/
├── config/                 # Configuration files
│   ├── database.ts
│   ├── stripe.ts
│   └── env.ts
├── assets/                 # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
└── lib/                    # External library configurations
```

## Migration Plan

### Phase 1: Type Organization (Week 1)
**Priority**: High
**Estimated Time**: 2-3 hours

#### Actions:
1. Create `src/types/` directory
2. Extract and centralize type definitions:

```typescript
// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'student' | 'teacher' | 'admin';
}

// src/types/courses.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  package_type: 'general' | 'cefr' | 'combo';
}

// src/types/payments.ts
export interface Subscription {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
}
```

3. Update imports across the application

#### Files to Modify:
- All component files using inline types
- Hook files with type definitions
- Service integration files

### Phase 2: Service Layer Creation (Week 2)
**Priority**: High
**Estimated Time**: 4-5 hours

#### Actions:
1. Create `src/services/` directory structure
2. Extract API calls from components:

```typescript
// src/services/api/auth.ts
export const authService = {
  signIn: (email: string, password: string) => supabase.auth.signInWithPassword({ email, password }),
  signUp: (email: string, password: string) => supabase.auth.signUp({ email, password }),
  signOut: () => supabase.auth.signOut(),
  getCurrentUser: () => supabase.auth.getUser(),
};

// src/services/api/subscriptions.ts
export const subscriptionService = {
  checkStatus: () => supabase.functions.invoke('check-subscription'),
  createCheckout: (packageType: string) => supabase.functions.invoke('create-checkout', { body: { package: packageType } }),
  openCustomerPortal: () => supabase.functions.invoke('customer-portal'),
};
```

3. Update hooks to use service layer

#### Benefits:
- Centralized API logic
- Easier testing and mocking
- Better error handling
- Consistent API patterns

### Phase 3: Feature-Based Component Organization (Week 3)
**Priority**: Medium
**Estimated Time**: 6-8 hours

#### Actions:
1. Reorganize components by feature:
   - Move `AuthModal.tsx` to `components/features/auth/`
   - Group live session components under `components/features/live-sessions/`
   - Create payment-specific components under `components/features/payments/`

2. Create feature-specific index files for better imports:

```typescript
// src/components/features/auth/index.ts
export { AuthModal } from './AuthModal';
export { LoginForm } from './LoginForm';
export { SignupForm } from './SignupForm';
```

3. Update import statements throughout the application

#### Benefits:
- Better code organization
- Easier feature development
- Cleaner imports
- Enhanced maintainability

### Phase 4: Utilities and Configuration (Week 4)
**Priority**: Medium
**Estimated Time**: 3-4 hours

#### Actions:
1. Create comprehensive utilities:

```typescript
// src/utils/constants/pricing.ts
export const PACKAGE_PRICES = {
  general: { monthly: 390, yearly: 3900 },
  cefr: { monthly: 590, yearly: 5900 },
  combo: { monthly: 1500, yearly: 15000 }
} as const;

// src/utils/formatters/currency.ts
export const formatThaiCurrency = (amount: number) => 
  new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  }).format(amount);

// src/utils/validators/auth.ts
export const validateEmail = (email: string) => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
```

2. Create configuration management:

```typescript
// src/config/env.ts
export const config = {
  supabase: {
    url: import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    anonKey: import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
  },
  app: {
    name: 'Kru English',
    version: '1.0.0',
  }
} as const;
```

### Phase 5: Enhanced Hook Organization (Week 5)
**Priority**: Low
**Estimated Time**: 2-3 hours

#### Actions:
1. Organize hooks by category:
   - `hooks/auth/` - Authentication-related hooks
   - `hooks/api/` - Data fetching hooks
   - `hooks/ui/` - UI state management hooks

2. Create specialized hooks:

```typescript
// src/hooks/api/useSubscription.ts
export const useSubscription = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['subscription'],
    queryFn: subscriptionService.checkStatus,
  });
  
  return {
    subscription: data,
    isLoading,
    error,
    refreshSubscription: refetch,
  };
};
```

## Implementation Best Practices

### 1. Gradual Migration Strategy
- Implement changes incrementally
- Maintain backward compatibility during transition
- Test thoroughly after each phase
- Update documentation alongside changes

### 2. Import Management
```typescript
// Preferred: Absolute imports with path mapping
import { AuthModal } from '@/components/features/auth';
import { Course } from '@/types/courses';
import { authService } from '@/services/api/auth';

// Avoid: Deep relative imports
import { AuthModal } from '../../../components/features/auth/AuthModal';
```

### 3. File Naming Conventions
- **Components**: PascalCase (`AuthModal.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useSubscription.ts`)
- **Services**: camelCase with descriptive suffix (`authService.ts`)
- **Types**: camelCase with descriptive names (`userTypes.ts`)
- **Utils**: camelCase describing function (`formatCurrency.ts`)

### 4. Index File Strategy
Create index files for clean imports:

```typescript
// src/components/features/auth/index.ts
export { AuthModal } from './AuthModal';
export { useAuth } from './hooks/useAuth';
export { authService } from './services/authService';
```

## Maintenance Guidelines

### 1. Regular Structure Reviews
- Monthly assessment of component organization
- Quarterly review of type definitions
- Semi-annual architecture evaluation

### 2. Documentation Updates
- Update README.md with structure changes
- Maintain component documentation
- Keep API documentation current

### 3. Team Conventions
- Establish coding standards
- Create component templates
- Implement automated linting rules

## Benefits of Recommended Structure

### 1. **Developer Experience**
- Faster navigation and file discovery
- Clearer mental model of application
- Reduced cognitive load

### 2. **Maintainability**
- Easier bug fixes and feature additions
- Better code reusability
- Simplified refactoring

### 3. **Scalability**
- Room for future feature expansion
- Clear patterns for new developers
- Consistent architecture patterns

### 4. **Testing**
- Easier unit test organization
- Better mock management
- Cleaner test file structure

## Conclusion

The current structure provides a solid foundation, but implementing these recommendations will significantly improve long-term maintainability and developer experience. The phased approach ensures minimal disruption while steadily improving the codebase organization.

Focus on high-priority phases first (Types and Services) as they provide the most immediate benefits with relatively low effort. The feature-based organization can be implemented gradually as new features are developed or existing ones are modified.
