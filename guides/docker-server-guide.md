# Docker Guide for TanStack Learn Server

This guide explains how to run the TanStack Learn server application using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on your system
- Basic understanding of environment variables

## Quick Start

1. **Navigate to the project root:**

   ```bash
   cd /path/to/tanstack-learn
   ```

2. **Set up environment variables:**
   Create a `.env` file in the server directory (`apps/server/.env`) with the following variables:

   ```env
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key
   CORS_ORIGIN=http://localhost:3001
   ```

3. **Start the server:**

   ```bash
   docker-compose -f docker-compose.server.yml up
   ```

4. **Access the server:**
   - API endpoints: http://localhost:3000
   - Health check: http://localhost:3000/
   - tRPC endpoints: http://localhost:3000/trpc/\*
   - Authentication: http://localhost:3000/api/auth/\*

## Docker Compose Configuration

The `docker-compose.server.yml` file includes:

### Service Configuration

- **Image**: Uses the official Bun runtime (`oven/bun:latest`)
- **Working Directory**: `/app/apps/server`
- **Volumes**: Maps the server source code and creates a persistent database volume
- **Environment Variables**: Configures all required environment variables
- **Port Mapping**: Exposes port 3000 for the server
- **Health Check**: Monitors server health every 30 seconds

### Database Setup

- Uses SQLite with a persistent volume (`server-db`)
- Automatically runs database migrations on startup (`bun run db:push`)
- Database file stored at `/app/apps/server/data/local.db` inside the container

### Development Features

- Hot reloading enabled for development
- Source code changes are reflected immediately
- Database persists between container restarts

## Environment Variables

| Variable                       | Description                       | Required | Default                               |
| ------------------------------ | --------------------------------- | -------- | ------------------------------------- |
| `DATABASE_URL`                 | Database connection string        | Yes      | `file:/app/apps/server/data/local.db` |
| `BETTER_AUTH_SECRET`           | Secret key for authentication     | Yes      | -                                     |
| `BETTER_AUTH_URL`              | Base URL for auth callbacks       | Yes      | `http://localhost:3000`               |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key for AI features | Yes      | -                                     |
| `CORS_ORIGIN`                  | Allowed CORS origins              | Yes      | `http://localhost:3001`               |

## Common Commands

### Start the server

```bash
docker-compose -f docker-compose.server.yml up
```

### Start in background

```bash
docker-compose -f docker-compose.server.yml up -d
```

### Stop the server

```bash
docker-compose -f docker-compose.server.yml down
```

### View logs

```bash
docker-compose -f docker-compose.server.yml logs -f
```

### Rebuild and restart

```bash
docker-compose -f docker-compose.server.yml up --build
```

### Access the container

```bash
docker-compose -f docker-compose.server.yml exec server bash
```

## Database Management

### Access Drizzle Studio

```bash
docker-compose -f docker-compose.server.yml exec server bun run db:studio
```

### Run migrations manually

```bash
docker-compose -f docker-compose.server.yml exec server bun run db:push
```

### Generate new migration

```bash
docker-compose -f docker-compose.server.yml exec server bun run db:generate
```

## Troubleshooting

### Port already in use

If port 3000 is already in use, modify the port mapping in `docker-compose.server.yml`:

```yaml
ports:
  - "3001:3000" # Change external port to 3001
```

### Database connection issues

- Ensure the database volume is properly mounted
- Check database file permissions
- Verify the `DATABASE_URL` environment variable

### Environment variable issues

- Make sure all required environment variables are set
- Check that the `.env` file is in the correct location (`apps/server/.env`)
- Verify variable names match exactly

### AI features not working

- Ensure `GOOGLE_GENERATIVE_AI_API_KEY` is set correctly
- Check that the API key has the necessary permissions
- Verify the key is valid and active

## Production Considerations

For production deployment:

1. **Use environment variable files**: Create `.env.production` with production values
2. **Use secrets management**: Consider using Docker secrets or external secret management
3. **Database**: Consider using a managed database service instead of SQLite
4. **Security**: Use HTTPS and proper CORS configuration
5. **Logging**: Configure proper logging and monitoring
6. **Health checks**: Implement proper health check endpoints

## Development Workflow

1. Make changes to the server code
2. The container will automatically reload due to hot reloading
3. Check logs with `docker-compose logs -f`
4. Test API endpoints at http://localhost:3000
5. Use Drizzle Studio for database inspection

## File Structure

```
tanstack-learn/
├── docker-compose.server.yml    # Docker Compose configuration
├── apps/server/                 # Server application
│   ├── src/                     # Source code
│   ├── package.json            # Dependencies
│   ├── .env                    # Environment variables (create this)
│   └── data/                   # Database files (created by Docker)
└── guides/
    └── docker-server-guide.md  # This guide
```
