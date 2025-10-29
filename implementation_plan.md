# Implementation Plan

## Overview
Convert the existing Vite + Express.js full-stack webapp to Next.js Pages Router for optimized Vercel deployment. The conversion involves migrating from a client-server architecture to Next.js monolithic application with API routes, transitioning from Wouter routing to Next.js Pages Router, and integrating NextAuth.js authentication alongside Vercel Postgres for the database layer.

The primary goal is to deploy on Vercel with improved performance, SEO capabilities, and simplified deployment process while maintaining all existing functionality including multi-role authentication (admin, teacher, student, parent), attendance management, user management, and institute settings.

## Types
No major schema changes required. The existing Drizzle ORM schema will be maintained with the addition of NextAuth.js required fields for session management.

## Files
### New Files Created
- `pages/index.tsx` - Landing page with role selector and navigation
- `pages/signin.tsx` - Authentication page using NextAuth.js
- `pages/signup.tsx` - User registration page
- `pages/_app.tsx` - Root app component with providers (Theme, QueryClient, Session)
- `pages/admin/dashboard.tsx` - Admin dashboard
- `pages/admin/classes/all.tsx` - Class management page
- `pages/admin/classes/new.tsx` - Add new classes page
- `pages/admin/students/all.tsx` - Student management page
- `pages/admin/subjects/assign.tsx` - Subject assignment page
- `pages/admin/subjects/classes.tsx` - Classes with subjects page
- `pages/teacher/dashboard.tsx` - Teacher dashboard
- `pages/student/dashboard.tsx` - Student dashboard
- `pages/parent/dashboard.tsx` - Parent dashboard
- `pages/api/auth/[...nextauth].ts` - NextAuth.js API route
- `pages/api/auth/signup.ts` - Registration API
- `pages/api/auth/verify.ts` - User verification API
- `pages/api/attendance/index.ts` - Attendance API routes
- `pages/api/attendance/mark.ts` - Mark attendance API
- `pages/api/attendance/class/[class]/[section].ts` - Class attendance API
- `pages/api/attendance/student/[id].ts` - Student attendance API
- `pages/api/users/index.ts` - User management API
- `pages/api/students/class/[class]/[section].ts` - Students by class API
- `pages/api/institute/current.ts` - Institute management API
- `lib/db.ts` - Database connection configuration for Vercel Postgres
- `lib/auth.ts` - Authentication utilities
- `components/AuthGuard.tsx` - Component wrapper for protected routes
- `components/RoleGuard.tsx` - Component wrapper for role-based access

### Existing Files Modified
- `shared/schema.ts` - Will remain unchanged
- `client/src/components/` - All components need to be moved to `components/` at root level
- Move all existing components from `client/src/components/` to root `components/` directory
- Move all existing UI components from `client/src/components/ui/` to `components/ui/`
- Move all hooks from `client/src/hooks/` to `hooks/`
- Move all utilities from `client/src/lib/` to `lib/`
- Move all pages from `client/src/pages/` to root `pages/` directory

### Files Deleted
- `client/index.html` - Replaced by Next.js page structure
- `server/index.ts` - Server functionality moves to API routes
- `server/routes.ts` - Routes migrated to API routes
- `server/storage.ts` - Database logic moves to lib/db.ts
- `server/middleware.ts` - Authentication middleware through NextAuth.js
- `vite.config.ts` - Replaced by Next.js configuration
- `vercel.json` - Next.js has built-in Vercel optimization
- `client/src/App.tsx` - Replaced by _app.tsx
- `client/src/main.tsx` - Replaced by Next.js entry point
- `server/vite.ts` - No longer needed
- `server/auth.test.js` - Tests will be adapted for Next.js

## Functions
### New Functions
- `getServerSideProps` functions for each protected page to handle authentication and role checking
- API route handlers for attendance, user management, and institute settings
- NextAuth.js configuration object with credentials provider
- Database adapters for Vercel Postgres integration
- Authentication middleware functions for API route protection
- Role-based access control utilities

### Modified Functions
- All existing React components will be converted from JSX/TSX files to be compatible with Next.js Pages Router
- Component imports and paths will be updated to reflect new file structure
- Event handlers will be adapted to work without Wouter's useLocation
- API fetch functions will be updated to call internal API routes instead of external API endpoints

### Removed Functions
- Express server setup and middleware functions
- Passport.js authentication strategies and configuration
- Vite development server configuration
- Static file serving middleware

## Classes
### New Classes
- `AuthGuardWrapper` - Higher-order component for authentication
- `RoleProvider` - Context provider for user roles
- `SessionAdapter` - Adapter for NextAuth.js session integration

### Modified Classes
- All existing React components remain structurally the same but will be updated for Next.js compatibility
- Portals (AdminPortal, TeacherPortal, etc.) will be converted from single-page to multi-page layouts
- Dashboard components will be split across multiple pages instead of single components

### Removed Classes
- Express application instance and related middleware classes
- Passport.js strategy instances

## Dependencies
### New Dependencies Added
- `next` - React framework core
- `next-auth` - Authentication library
- `@next-auth/prisma-adapter` - Database adapter for NextAuth.js
- `@vercel/postgres` - Vercel Postgres client
- `@vercel/analytics` - Analytics tracking
- `@vercel/speed-insights` - Performance monitoring
- `@types/node` and `@types/react` - TypeScript definitions (if not already present)

### Modified Dependencies
- `@tanstack/react-query` - Remains, but integration may need updates
- `react` and `react-dom` - Version should be compatible with Next.js
- `typescript` - Ensure compatibility with Next.js

### Removed Dependencies
- `express` - Server functionality handled by Next.js
- `passport` and `passport-local` - Replaced by NextAuth.js
- `express-session` and `connect-pg-simple` - Session management through NextAuth.js
- `@vitejs/plugin-react` and `vite` - Replaced by Next.js build system
- `wouter` - Replaced by Next.js built-in routing

## Testing
### Testing Approach
Convert existing Jest tests to work with Next.js and adapt to new file structure. Focus on API route testing and React component testing. Real-time features (WebSocket) testing will be deferred if functionality is temporarily removed.

### Test Files Requirements
- Unit tests for API routes will be in `test/` directory
- Component tests remain similar but may need jest setup adjustments
- Integration tests for user flows will need updates for Pages Router navigation
- Authentication tests will need to be rewritten for NextAuth.js

### Existing Test Modifications
- Update import paths to reflect new file structure
- Replace Express server test mocks with Next.js API route mocks
- Update component tests that use Wouter routing to use Next.js router testing utilities
- Authentication test mocks need significant updates for NextAuth.js

## Implementation Order
1. **Project Setup**: Initialize Next.js project structure and move shared schema
2. **Dependencies**: Update package.json with new dependencies, remove obsolete packages
3. **Database**: Migrate to Vercel Postgres configuration
4. **Authentication**: Implement NextAuth.js setup and configuration
5. **Layout Components**: Move and adapt core layout components (sidebar, navigation)
6. **Public Pages**: Convert landing and authentication pages first
7. **Protected Pages**: Implement dashboard pages with role-based protection
8. **Admin Pages**: Convert all admin functionality (classes, students, subjects)
9. **API Routes**: Migrate Express routes to Next.js API routes
10. **Testing**: Update and run tests for new architecture
11. **Build Optimization**: Configure Next.js build settings and Vercel deployment
