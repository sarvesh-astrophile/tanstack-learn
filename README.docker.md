# Docker Setup for TanStack Learn Server

This guide explains how to run the TanStack Learn server with Docker, including database operations using Drizzle Kit.

## Environment Variables

Create a `.env` file based on the example below:

```bash
# Required environment variables
DATABASE_URL=file:/app/data/local.db
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key
CORS_ORIGIN=http://localhost:3001
SERVER_PORT=3000
```

## Running the Server

### Start the server normally:

```bash
docker-compose --env-file .env -f docker-compose.server.yml up
```

### Run Drizzle Database Commands

The Docker setup allows you to run drizzle-kit commands by overriding the default command:

#### Push schema changes:

```bash
DRIZZLE_COMMAND="bun run db:push" docker-compose --env-file .env -f docker-compose.server.yml up
```

#### Open Drizzle Studio:

```bash
DRIZZLE_COMMAND="bun run db:studio" docker-compose --env-file .env -f docker-compose.server.yml up
```

#### Generate migrations:

```bash
DRIZZLE_COMMAND="bun run db:generate" docker-compose --env-file .env -f docker-compose.server.yml up
```

#### Run migrations:

```bash
DRIZZLE_COMMAND="bun run db:migrate" docker-compose --env-file .env -f docker-compose.server.yml up
```

### Alternative: Using docker-compose with command override

You can also create a separate docker-compose override file or use the `--env-file` with environment variable override:

```bash
# Set environment variable and run
export DRIZZLE_COMMAND="bun run db:push"
docker-compose --env-file .env -f docker-compose.server.yml up
```

## Available Drizzle Commands

- `bun run db:push` - Push schema changes to database
- `bun run db:studio` - Open Drizzle Studio for database management
- `bun run db:generate` - Generate migration files
- `bun run db:migrate` - Run database migrations

## Building the Docker Image

To build the Docker image manually:

```bash
docker build -f Dockerfile.server -t tanstack-learn-server .
```

## Database Persistence

The database is persisted in a Docker volume named `server-db`. To reset the database, you can remove the volume:

```bash
docker volume rm tanstack-learn_server-db
```
