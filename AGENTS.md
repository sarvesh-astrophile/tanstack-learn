# TanStack Learn Project Memory

## Project Overview

**TanStack Learn** is a modern full-stack web application built with TypeScript, demonstrating best practices for React development using the TanStack ecosystem. The project showcases a complete todo application with authentication, real-time updates, and AI integration.

### Key Technologies & Architecture

- **Frontend**: React 19.1.0 with TanStack Router, TanStack Query, TanStack Form
- **Backend**: Hono.js server with tRPC for type-safe API communication
- **Database**: SQLite with Drizzle ORM (Turso dialect)
- **Authentication**: Better Auth with email/password authentication
- **AI Integration**: Google Gemini 1.5 Flash for AI features
- **Styling**: Tailwind CSS 4.x with Radix UI components
- **Build Tools**: Vite, Turbo (monorepo), Bun package manager
- **Deployment**: Cloudflare Workers (web app), Bun runtime (server)

## Project Structure

```
tanstack-learn/
├── apps/
│   ├── landing/          # Landing page (empty)
│   ├── server/           # Backend API server
│   └── web/              # Frontend React application
├── guides/               # Documentation (empty)
├── package.json          # Root package configuration
├── turbo.json           # Turborepo configuration
├── biome.json           # Code formatting/linting
├── tsconfig.json        # TypeScript configuration
└── bun.lock            # Bun lockfile
```

## Backend Server (`apps/server/`)

### Core Architecture

- **Framework**: Hono.js for lightweight, fast HTTP server
- **API Layer**: tRPC for end-to-end type safety
- **Database**: Drizzle ORM with SQLite (Turso)
- **Authentication**: Better Auth with secure session management
- **AI**: Google Gemini integration for streaming text responses

### Key Files & Functionality

#### `src/index.ts` - Main Server Entry Point

- Sets up Hono app with CORS, logging middleware
- Configures tRPC server at `/trpc/*` endpoint
- Implements Better Auth at `/api/auth/*` endpoint
- Provides AI streaming endpoint at `/ai` using Google Gemini
- Health check endpoint at `/`

#### Database Schema (`src/db/schema/`)

- **`auth.ts`**: User authentication tables (user, session, account, verification)
- **`todo.ts`**: Simple todo table with id, text, completed fields

#### Authentication (`src/lib/auth.ts`)

- Better Auth configuration with Drizzle adapter
- Email/password authentication enabled
- Secure cookie settings (httpOnly, secure, sameSite: none)
- Trusted origins configuration

#### tRPC Routers (`src/routers/`)

- **`index.ts`**: Main app router with health check and protected data endpoints
- **`todo.ts`**: CRUD operations for todos (getAll, create, toggle, delete)

#### Environment Configuration (`src/env.ts`)

- Type-safe environment variables using @t3-oss/env-core
- Required: DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, GOOGLE_GENERATIVE_AI_API_KEY, CORS_ORIGIN

### Database Configuration

- **Drizzle Kit**: Database migrations and schema management
- **Turso**: SQLite-compatible database for production
- **Local Development**: Uses local.db file

## Frontend Web App (`apps/web/`)

### Core Architecture

- **Framework**: React 19.1.0 with TanStack Start
- **Routing**: TanStack Router with file-based routing
- **State Management**: TanStack Query for server state
- **Forms**: TanStack Form with Zod validation
- **Styling**: Tailwind CSS 4.x with Radix UI components
- **Build**: Vite with Cloudflare Workers target

### Key Features & Components

#### Routing (`src/routes/`)

- **`index.tsx`**: Homepage with ASCII art title and API status check
- **`todos.tsx`**: Full-featured todo management interface
- **`login.tsx`**: Authentication page with sign-in/sign-up forms
- **`dashboard.tsx`**: Protected dashboard route
- **`ai.tsx`**: AI chat interface
- **`__root.tsx`**: Root layout with header and navigation

#### Authentication Components

- **`sign-in-form.tsx`**: Email/password sign-in with form validation
- **`sign-up-form.tsx`**: User registration with name, email, password
- **`user-menu.tsx`**: User dropdown menu with sign-out functionality

#### UI Components (`src/components/ui/`)

- Complete set of reusable components: Button, Card, Input, Checkbox, Label, etc.
- Built with Radix UI primitives and Tailwind CSS
- Consistent design system with proper accessibility

#### Todo Management (`src/routes/todos.tsx`)

- Real-time todo CRUD operations
- Optimistic updates with TanStack Query
- Form validation with TanStack Form
- Loading states and error handling
- Responsive design with proper UX patterns

### State Management

- **TanStack Query**: Server state management with caching, background updates
- **TanStack Form**: Form state with validation using Zod schemas
- **React State**: Local component state for UI interactions

### API Integration

- **tRPC Client**: Type-safe API calls with automatic TypeScript inference
- **HTTP Batch Link**: Efficient request batching
- **Credentials**: Include cookies for authentication
- **Error Handling**: Global error handling with toast notifications

## Development & Build Configuration

### Package Management

- **Bun**: Fast package manager and runtime
- **Monorepo**: Turborepo for efficient builds and caching
- **Workspaces**: Separate packages for server and web apps

### Code Quality

- **Biome**: Fast linter and formatter (extends ultracite config)
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality rules (via ultracite)

### Build & Deployment

- **Server**: Bun runtime with tsdown compilation
- **Web**: Vite build targeting Cloudflare Workers
- **Database**: Drizzle Kit for migrations and schema management

## Environment Variables

### Server Environment

```bash
DATABASE_URL=              # SQLite database connection string
BETTER_AUTH_SECRET=        # Secret key for authentication
BETTER_AUTH_URL=           # Base URL for auth callbacks
GOOGLE_GENERATIVE_AI_API_KEY=  # Google AI API key
CORS_ORIGIN=               # Allowed CORS origins
```

### Client Environment

```bash
VITE_SERVER_URL=           # Backend server URL
```

## Key Features Implemented

### Authentication System

- Complete user registration and login
- Secure session management with Better Auth
- Protected routes and API endpoints
- Form validation with Zod schemas

### Todo Management

- Full CRUD operations (Create, Read, Update, Delete)
- Real-time updates with optimistic UI
- Form validation and error handling
- Responsive design with loading states

### AI Integration

- Google Gemini 1.5 Flash integration
- Streaming text responses
- Dedicated AI chat interface

### Developer Experience

- Type-safe end-to-end with tRPC
- Hot reloading in development
- Comprehensive error handling
- Modern tooling with Bun and Vite

## Scripts & Commands

### Root Level

- `bun dev`: Start all apps in development mode
- `bun build`: Build all apps
- `bun check`: Run Biome linting and formatting
- `bun check-types`: TypeScript type checking

### Database Operations

- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open Drizzle Studio for database management
- `bun db:generate`: Generate migration files
- `bun db:migrate`: Run database migrations

### Individual Apps

- `bun dev:web`: Start web app only (port 3001)
- `bun dev:server`: Start server only
- `bun dev:marketing`: Start marketing/landing page

## Architecture Patterns

### Type Safety

- End-to-end TypeScript with tRPC
- Zod schemas for runtime validation
- Environment variable validation
- Database schema with Drizzle ORM

### Error Handling

- Global error boundaries
- Toast notifications for user feedback
- Proper HTTP status codes
- Graceful degradation

### Performance

- Request batching with tRPC
- Optimistic updates
- Background refetching
- Efficient caching strategies

### Security

- Secure authentication with Better Auth
- CORS configuration
- Environment variable validation
- SQL injection protection via Drizzle ORM

## Development Workflow

1. **Setup**: Install dependencies with `bun install`
2. **Environment**: Configure environment variables
3. **Database**: Run `bun db:push` to set up database
4. **Development**: Run `bun dev` to start all services
5. **Testing**: Access web app at http://localhost:3001
6. **Database Management**: Use `bun db:studio` for database inspection

## Future Considerations

- The `guides/` directory is empty and could be used for documentation
- The `apps/landing/` directory is empty and could house a marketing site
- AI features are implemented but could be expanded
- Additional authentication providers could be added
- Real-time features could be enhanced with WebSockets

This project serves as an excellent example of modern React development with the TanStack ecosystem, demonstrating best practices for full-stack TypeScript applications.
