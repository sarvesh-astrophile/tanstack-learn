# Database Setup and Management

This document explains how to run database operations like `drizzle-kit push` in the production Docker environment.

## Problem

The original `Dockerfile.server` was optimized for production and only included runtime dependencies. This meant that development tools like `drizzle-kit` were not available in the production container.

## Solution

We've created a multi-stage Docker setup that provides both production and development images:

- **Production stage**: Lean image for running the application
- **Development stage**: Includes all dependencies including `drizzle-kit` for database operations

## How to Use

### Option 1: Using the Database Tools Script (Recommended)

We've created a convenient script that handles all database operations:

```bash
# Push schema changes to database
./db-tools.sh push

# Open Drizzle Studio
./db-tools.sh studio

# Generate migration files
./db-tools.sh generate

# Run migrations
./db-tools.sh migrate

# Show help
./db-tools.sh help
```

### Option 2: Manual Docker Commands

If you prefer to run commands manually:

```bash
# Build the development container
docker-compose -f docker-compose.server.yml up --build server-dev

# Stop the container after building
docker-compose -f docker-compose.server.yml stop server-dev

# Run database operations
docker-compose -f docker-compose.server.yml run --rm server-dev sh -c "cd /app && bun db:push"
```

### Option 3: Using Docker Compose Service

You can also start the development service and run commands interactively:

```bash
# Start the development service
docker-compose -f docker-compose.server.yml up server-dev

# Then in another terminal, execute commands
docker-compose -f docker-compose.server.yml exec server-dev bun db:push
```

## Environment Variables

Make sure your environment variables are set up properly:

```bash
export DATABASE_URL="file:/app/data/local.db"
export BETTER_AUTH_SECRET="your-secret"
export BETTER_AUTH_URL="http://localhost:3000"
export GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"
export CORS_ORIGIN="http://localhost:3000"
```

## Docker Compose Services

- **server**: Production container (lean, no dev tools)
- **server-dev**: Development container with all tools for database operations

## Production vs Development

- **Production container**: Use `docker-compose -f docker-compose.server.yml up server`
- **Development container**: Use the script or manual commands above for database operations

## Troubleshooting

If you encounter issues:

1. **Ensure Docker is running**: `docker info`
2. **Check if containers exist**: `docker ps -a`
3. **Rebuild if needed**: `docker-compose -f docker-compose.server.yml build --no-cache server-dev`
4. **Check logs**: `docker-compose -f docker-compose.server.yml logs server-dev`

## Architecture

The setup uses Docker multi-stage builds:

1. **Builder stage**: Compiles the application and installs dependencies
2. **Development stage**: Includes all source files and dev dependencies for database operations
3. **Production stage**: Only includes the built application (no dev tools)

This approach keeps the production image lean while providing the tools needed for database operations.
