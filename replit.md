# Employee Attendance System (HRMS)

## Overview

This is a web-based Employee Attendance System with Human Resource Management System (HRMS) capabilities. The platform serves two distinct user roles: **Admin (HR/Management)** and **Employee**. The system handles core HR functions including employee management, attendance tracking, leave management, payroll processing, department organization, and company announcements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React and TypeScript using Vite as the build tool. Key architectural decisions:

- **Component Library**: Uses shadcn/ui components built on Radix UI primitives, providing accessible and customizable UI elements
- **Styling**: Tailwind CSS with CSS variables for theming, supporting both light and dark modes
- **State Management**: TanStack Query (React Query) for server state management with custom hooks wrapping API calls
- **Routing**: Wouter for lightweight client-side routing with protected route wrappers
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Charts**: Recharts for dashboard analytics visualization

The frontend follows a feature-based structure with pages in `client/src/pages/`, reusable components in `client/src/components/`, and custom hooks in `client/src/hooks/`.

### Backend Architecture

The backend uses Express.js with TypeScript in a modular structure:

- **API Design**: RESTful APIs with route definitions shared between frontend and backend via `shared/routes.ts`
- **Authentication**: Session-based authentication using Passport.js with local strategy, bcrypt for password hashing
- **Session Storage**: Memory store for sessions (suitable for development; consider Redis for production)
- **Database Access**: Storage layer pattern abstracting database operations through `server/storage.ts`

### Data Storage

- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Definition**: Centralized in `shared/schema.ts` with Drizzle-Zod integration for automatic validation schema generation
- **Migrations**: Managed through Drizzle Kit with migrations output to `/migrations` directory

Core entities include: Users, Employees, Departments, Attendance, Leaves, Payroll, and Announcements.

### Authentication & Authorization

- **Role-Based Access Control (RBAC)**: Two roles only - Admin and Employee
- **Protected Routes**: Frontend routes wrapped with authentication checks, admin-only routes have additional role verification
- **Session Management**: Express-session with configurable cookie settings

### Build System

- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Custom build script using esbuild for server bundling and Vite for client bundling
- **Output**: Bundled to `/dist` directory with server as CommonJS and client assets in `/dist/public`

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **Drizzle ORM**: Database toolkit for TypeScript with PostgreSQL dialect

### Authentication
- **Passport.js**: Authentication middleware with local strategy
- **bcryptjs**: Password hashing
- **express-session**: Session management with memory store

### Frontend Libraries
- **Radix UI**: Headless UI component primitives
- **TanStack Query**: Server state management
- **Recharts**: Charting library for analytics
- **date-fns**: Date manipulation utilities
- **Zod**: Schema validation

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server-side bundling
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first CSS framework