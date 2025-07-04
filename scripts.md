
# Available Scripts Documentation

This document provides detailed information about all available npm scripts in the Kru English project.

## 📋 Development Scripts

### `npm run dev`
**Purpose**: Starts the development server with hot module replacement

**Functionality**:
- Launches Vite development server
- Enables hot reloading for instant updates
- Provides source maps for debugging
- Serves the application on `http://localhost:8080`

**Usage Example**:
```bash
npm run dev
```

**Expected Output**:
```
  VITE v4.4.5  ready in 342 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**Common Use Cases**:
- Daily development work
- Testing component changes
- Debugging application issues
- Live preview during development

**Required Environment Variables**:
- `VITE_PUBLIC_SUPABASE_URL`
- `VITE_PUBLIC_SUPABASE_ANON_KEY`

---

### `npm run build`
**Purpose**: Creates optimized production build

**Functionality**:
- Compiles TypeScript to JavaScript
- Bundles and minifies code
- Optimizes assets and images
- Generates static files in `dist/` directory
- Tree-shakes unused code
- Creates source maps for debugging

**Usage Example**:
```bash
npm run build
```

**Expected Output**:
```
vite v4.4.5 building for production...
✓ 245 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-d526a0c5.css   8.15 kB │ gzip:  2.42 kB
dist/assets/index-4f7d8fb1.js  142.84 kB │ gzip: 46.13 kB
✓ built in 1.24s
```

**Common Use Cases**:
- Preparing for production deployment
- Performance testing
- Bundle size analysis
- Pre-deployment verification

**Required Environment Variables**:
- All production environment variables
- `VITE_PUBLIC_SUPABASE_URL`
- `VITE_PUBLIC_SUPABASE_ANON_KEY`

---

### `npm run preview`
**Purpose**: Serves the production build locally for testing

**Functionality**:
- Serves the built application from `dist/` folder
- Simulates production environment
- Useful for testing before deployment
- Runs on `http://localhost:4173` by default

**Usage Example**:
```bash
npm run build && npm run preview
```

**Expected Output**:
```
  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
```

**Common Use Cases**:
- Testing production build locally
- Verifying build optimization
- Final testing before deployment
- Performance benchmarking

**Prerequisites**:
- Must run `npm run build` first
- Requires production environment variables

---

## 🔍 Code Quality Scripts

### `npm run lint`
**Purpose**: Runs ESLint to check code quality and style

**Functionality**:
- Checks JavaScript/TypeScript files for errors
- Enforces coding standards
- Identifies potential bugs
- Ensures consistent code style

**Usage Example**:
```bash
npm run lint
```

**Expected Output** (when no issues):
```
✨ All files passed linting!
```

**Expected Output** (with issues):
```
src/components/Example.tsx
  15:1  error  'useState' is defined but never used  @typescript-eslint/no-unused-vars
  23:5  warning  React Hook useEffect has a missing dependency  react-hooks/exhaustive-deps

✖ 2 problems (1 error, 1 warning)
```

**Common Use Cases**:
- Pre-commit code validation
- Maintaining code quality
- Identifying potential bugs
- Enforcing team coding standards

---

### `npm run lint:fix`
**Purpose**: Automatically fixes linting issues where possible

**Functionality**:
- Runs ESLint with `--fix` flag
- Automatically corrects fixable issues
- Formats code according to rules
- Reports unfixable issues

**Usage Example**:
```bash
npm run lint:fix
```

**Common Use Cases**:
- Quick code formatting
- Automated code cleanup
- Pre-commit preparation
- Bulk fixing of style issues

---

## 🏗️ Type Checking Scripts

### `npm run type-check`
**Purpose**: Runs TypeScript compiler to check for type errors

**Functionality**:
- Validates TypeScript types
- Checks for type mismatches
- Ensures type safety
- No code generation (--noEmit)

**Usage Example**:
```bash
npm run type-check
```

**Expected Output** (success):
```
✅ Type checking completed successfully
```

**Expected Output** (with errors):
```
src/components/Profile.tsx:16:30 - error TS2304: Cannot find name 'supabase'.

16   const { data } = await supabase.functions.invoke('customer-portal');
                              ~~~~~~~~

Found 1 error in src/components/Profile.tsx:16
```

**Common Use Cases**:
- Pre-deployment validation
- Continuous integration checks
- Development debugging
- Type safety verification

---

## 🧪 Testing Scripts

### `npm run test`
**Purpose**: Runs the test suite

**Functionality**:
- Executes unit tests
- Runs component tests
- Generates test coverage reports
- Validates application functionality

**Usage Example**:
```bash
npm run test
```

**Expected Output**:
```
 PASS  src/components/__tests__/Button.test.tsx
 PASS  src/hooks/__tests__/useAuth.test.tsx
 PASS  src/utils/__tests__/helpers.test.tsx

Test Suites: 3 passed, 3 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        2.847 s
```

**Common Use Cases**:
- Continuous integration
- Pre-deployment verification
- Development testing
- Regression testing

---

### `npm run test:watch`
**Purpose**: Runs tests in watch mode for development

**Functionality**:
- Watches for file changes
- Re-runs affected tests automatically
- Provides interactive test runner
- Useful during development

**Usage Example**:
```bash
npm run test:watch
```

**Common Use Cases**:
- Test-driven development
- Real-time testing during development
- Debugging failing tests
- Interactive test development

---

## 🚀 Deployment Scripts

### `npm run deploy`
**Purpose**: Builds and deploys the application

**Functionality**:
- Runs build process
- Deploys to configured platform
- Updates live application
- Handles deployment pipeline

**Usage Example**:
```bash
npm run deploy
```

**Prerequisites**:
- Production environment variables configured
- Deployment platform authenticated
- All tests passing

**Common Use Cases**:
- Production deployments
- Staging deployments
- Automated deployment pipeline
- Release management

---

## 🛠️ Utility Scripts

### `npm run clean`
**Purpose**: Cleans build artifacts and temporary files

**Functionality**:
- Removes `dist/` directory
- Clears build cache
- Removes temporary files
- Prepares for fresh build

**Usage Example**:
```bash
npm run clean
```

**Common Use Cases**:
- Troubleshooting build issues
- Fresh build preparation
- Disk space cleanup
- Build environment reset

---

### `npm run generate-types`
**Purpose**: Generates TypeScript types from Supabase schema

**Functionality**:
- Connects to Supabase project
- Extracts database schema
- Generates TypeScript interfaces
- Updates `src/integrations/supabase/types.ts`

**Usage Example**:
```bash
npm run generate-types
```

**Prerequisites**:
- Supabase CLI installed
- Project configured with Supabase
- Database schema finalized

**Common Use Cases**:
- After database schema changes
- Setting up new environments
- Type safety maintenance
- Development environment sync

---

## 🔄 CI/CD Scripts

### `npm run ci`
**Purpose**: Runs full CI pipeline locally

**Functionality**:
- Installs dependencies
- Runs type checking
- Executes linting
- Runs test suite
- Creates production build

**Usage Example**:
```bash
npm run ci
```

**Expected Output**:
```
📦 Installing dependencies...
✅ Dependencies installed

🔍 Type checking...
✅ Type checking passed

🧹 Linting code...
✅ Linting passed

🧪 Running tests...
✅ All tests passed

🏗️ Building application...
✅ Build completed successfully
```

**Common Use Cases**:
- Pre-commit validation
- Local CI simulation
- Release preparation
- Quality assurance

---

## 📊 Performance Scripts

### `npm run analyze`
**Purpose**: Analyzes bundle size and composition

**Functionality**:
- Generates bundle analysis report
- Identifies large dependencies
- Shows code splitting effectiveness
- Provides optimization insights

**Usage Example**:
```bash
npm run analyze
```

**Common Use Cases**:
- Performance optimization
- Bundle size monitoring
- Dependency analysis
- Build optimization

---

## 🔧 Development Utilities

### `npm run format`
**Purpose**: Formats code using Prettier

**Functionality**:
- Formats all source files
- Applies consistent styling
- Handles multiple file types
- Integrates with editor configs

**Usage Example**:
```bash
npm run format
```

**Common Use Cases**:
- Code formatting
- Pre-commit preparation
- Team consistency
- Automated styling

---

## Environment Variables Reference

### Development
```env
VITE_PUBLIC_SUPABASE_URL=http://localhost:54321
VITE_PUBLIC_SUPABASE_ANON_KEY=your_local_anon_key
```

### Production
```env
VITE_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
VITE_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

## Script Combinations

### Full Development Workflow
```bash
npm run clean
npm install
npm run generate-types
npm run dev
```

### Pre-deployment Checklist
```bash
npm run ci
npm run build
npm run preview
```

### Code Quality Check
```bash
npm run lint
npm run type-check
npm run test
npm run format
```

---

**Note**: Always ensure environment variables are properly configured before running any scripts that interact with external services.
