# TanStack Learn

A modern full-stack web application built with TypeScript, demonstrating best practices for React development using the TanStack ecosystem. This project showcases a complete todo application with authentication, real-time updates, and AI integration.

## 🚀 Features

- **Authentication**: Complete user registration and login with Better Auth
- **Todo Management**: Full CRUD operations with real-time updates
- **AI Integration**: Google Gemini 1.5 Flash for AI-powered features
- **Type Safety**: End-to-end TypeScript with tRPC
- **Modern UI**: Tailwind CSS with Radix UI components
- **Real-time Updates**: Optimistic UI with TanStack Query

## 🛠️ Tech Stack

### Frontend

- **React 19.1.0** with TanStack Start
- **TanStack Router** for file-based routing
- **TanStack Query** for server state management
- **TanStack Form** with Zod validation
- **Tailwind CSS 3.4.17** with Radix UI components

### Backend

- **Hono.js** for lightweight HTTP server
- **tRPC** for type-safe API communication
- **Drizzle ORM** with SQLite (Turso dialect)
- **Better Auth** for secure authentication
- **Google Gemini 1.5 Flash** for AI features

### Development & Deployment

- **Bun** package manager and runtime
- **Turborepo** for monorepo management
- **Docker** for production deployment
- **Cloudflare Workers** for web app deployment

## 📁 Project Structure

```
tanstack-learn/
├── apps/
│   ├── landing/          # Landing page (empty)
│   ├── server/           # Backend API server
│   └── web/              # Frontend React application
├── guides/               # Documentation
│   └── docker-server-guide.md
├── Dockerfile.server     # Production Docker image
├── docker-compose.server.yml
└── package.json          # Root package configuration
```

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed on your system
- Node.js 18+ (if not using Bun)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd tanstack-learn
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   # Server Environment
   DATABASE_URL=file:./local.db
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-key
   CORS_ORIGIN=http://localhost:3001

   # Client Environment
   VITE_SERVER_URL=http://localhost:3000
   ```

4. **Set up the database**

   ```bash
   bun db:push
   ```

5. **Start the development server**

   ```bash
   bun dev
   ```

6. **Open your browser**
   - Web app: http://localhost:3001
   - Server: http://localhost:3000

## 📚 Available Scripts

### Development

```bash
bun dev              # Start all apps in development mode
bun dev:web          # Start web app only (port 3001)
bun dev:server       # Start server only
bun dev:marketing    # Start marketing/landing page
```

### Build & Quality

```bash
bun build            # Build all apps
bun check            # Run Biome linting and formatting
bun check-types      # TypeScript type checking
```

### Database

```bash
bun db:push          # Push schema changes to database
bun db:studio        # Open Drizzle Studio for database management
bun db:generate      # Generate migration files
bun db:migrate       # Run database migrations
```

## 🐳 Docker Deployment

### Production Deployment

1. **Configure environment variables**

   ```bash
   cp .env.production.example .env
   # Edit .env with your production values
   ```

2. **Build and deploy**

   ```bash
   docker-compose -f docker-compose.server.yml up --build -d
   ```

3. **Monitor logs**

   ```bash
   docker-compose -f docker-compose.server.yml logs -f
   ```

4. **Stop the server**
   ```bash
   docker-compose -f docker-compose.server.yml down
   ```

For detailed Docker deployment instructions, see [guides/docker-server-guide.md](guides/docker-server-guide.md).

## 🏗️ Architecture

### Backend (`apps/server/`)

- **Hono.js** server with CORS and logging middleware
- **tRPC** API at `/trpc/*` endpoint
- **Better Auth** at `/api/auth/*` endpoint
- **AI streaming** at `/ai` endpoint
- **Health check** at `/` endpoint

### Frontend (`apps/web/`)

- **TanStack Start** with file-based routing
- **Protected routes** with authentication
- **Real-time todo management**
- **AI chat interface**
- **Responsive design** with modern UI components

### Database

- **SQLite** with Drizzle ORM
- **Turso** for production (SQLite-compatible)
- **Migrations** with Drizzle Kit

## 🔐 Authentication

The app uses Better Auth for secure authentication:

- Email/password authentication
- Secure session management
- Protected routes and API endpoints
- Form validation with Zod schemas

## 🤖 AI Features

- Google Gemini 1.5 Flash integration
- Streaming text responses
- Dedicated AI chat interface
- Real-time conversation handling

## 🎨 UI Components

Built with a complete design system:

- **Radix UI** primitives for accessibility
- **Tailwind CSS** for styling
- **Consistent components**: Button, Card, Input, Checkbox, Label, etc.
- **Responsive design** with proper UX patterns

## 🔧 Development Workflow

1. **Setup**: Install dependencies with `bun install`
2. **Environment**: Configure environment variables
3. **Database**: Run `bun db:push` to set up database
4. **Development**: Run `bun dev` to start all services
5. **Testing**: Access web app at http://localhost:3001
6. **Database Management**: Use `bun db:studio` for database inspection

## 🚀 Key Features Implemented

### Authentication System

- Complete user registration and login
- Secure session management
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

## 🏆 Best Practices Demonstrated

- **Type Safety**: End-to-end TypeScript with tRPC
- **Error Handling**: Global error boundaries and toast notifications
- **Performance**: Request batching, optimistic updates, and efficient caching
- **Security**: Secure authentication, CORS configuration, and SQL injection protection
- **Code Quality**: Biome linting, TypeScript strict mode, and consistent formatting

## 📖 Learn More

This project serves as an excellent example of modern React development with the TanStack ecosystem, demonstrating best practices for full-stack TypeScript applications.

- [TanStack Documentation](https://tanstack.com/)
- [Hono.js Documentation](https://hono.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Better Auth Documentation](https://www.better-auth.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
