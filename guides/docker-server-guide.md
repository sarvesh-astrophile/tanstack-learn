# Docker Production Deployment Guide for TanStack Learn Server

This guide explains how to deploy the TanStack Learn server application using Docker for production environments.

## Prerequisites

- Docker and Docker Compose installed on your system
- Production environment variables configured
- Understanding of containerized deployments

## Architecture

The production deployment uses:
- **Multi-stage Docker build** for optimized image size
- **Compiled Bun binary** for better performance
- **Slim base image** to reduce attack surface
- **Non-root user** for security
- **Persistent database volume** for data persistence
- **Health checks** for monitoring
- **Automatic restarts** for reliability

## Pre-deployment Preparation

Before deploying, ensure your project is ready:

1. **Update dependencies:**
   ```bash
   bun install
   ```

2. **Test the build locally:**
   ```bash
   bun run build
   ```

3. **Commit any lockfile changes:**
   ```bash
   git add bun.lock
   git commit -m "Update dependencies for deployment"
   ```

4. **Push to your repository:**
   ```bash
   git push
   ```

## Quick Start

1. **Navigate to the project root:**
   ```bash
   cd /path/to/tanstack-learn
   ```

2. **Set up environment variables:**
   Create a `.env` file in the project root with your production values:
   ```env
   BETTER_AUTH_SECRET=your-production-secret-key-here
   BETTER_AUTH_URL=https://yourdomain.com
   GOOGLE_GENERATIVE_AI_API_KEY=your-production-ai-api-key
   CORS_ORIGIN=https://yourfrontenddomain.com
   SERVER_PORT=3000  # Optional: defaults to 3000
   ```

3. **Build and start the server:**
   ```bash
   docker-compose -f docker-compose.server.yml up --build -d
   ```

4. **Access the server:**
   - API endpoints: http://localhost:${SERVER_PORT:-3000}
   - Health check: http://localhost:${SERVER_PORT:-3000}/
   - tRPC endpoints: http://localhost:${SERVER_PORT:-3000}/trpc/*
   - Authentication: http://localhost:${SERVER_PORT:-3000}/api/auth/*

## Port Configuration Examples

### Using Default Port (3000)
```env
SERVER_PORT=3000
```
Server accessible at: http://localhost:3000

### Using Custom Port (3001)
```env
SERVER_PORT=3001
```
Server accessible at: http://localhost:3001

### Using Environment Variable
```bash
export SERVER_PORT=3002
docker-compose -f docker-compose.server.yml up --build -d
```
Server accessible at: http://localhost:3002

## Docker Configuration

### Multi-stage Build (Dockerfile.server)

The `Dockerfile.server` uses a multi-stage build process:

1. **Builder Stage**: Installs dependencies and builds the application
2. **Production Stage**: Uses a slim image with only the compiled binary

Key features:
- **Optimized image size**: Only includes necessary runtime files
- **Security**: Runs as non-root user
- **Performance**: Uses compiled binary instead of source code
- **Health monitoring**: Built-in health checks

### Docker Compose Configuration

The `docker-compose.server.yml` includes:

#### Service Configuration
- **Build Context**: Uses custom Dockerfile for production builds
- **Volumes**: Persistent database storage
- **Environment Variables**: Production-ready configuration
- **Port Mapping**: Exposes port 3000 for the server
- **Restart Policy**: Automatically restarts on failure
- **Health Check**: Monitors server health every 30 seconds
- **Networking**: Isolated network for security

#### Database Setup
- Uses SQLite with persistent volume (`server-db`)
- Database file stored at `/app/data/local.db` inside the container
- Data persists between container restarts and deployments

#### Port Configuration
- **Configurable Port**: Server port can be set via `SERVER_PORT` environment variable
- **Default Port**: Uses port 3000 if `SERVER_PORT` is not specified
- **External Mapping**: Maps to the same port externally by default
- **Health Checks**: Automatically adapts to the configured port

## Environment Variables

| Variable                       | Description                       | Required | Default | Example |
| ------------------------------ | --------------------------------- | -------- | ------- | ------- |
| `DATABASE_URL`                 | Database connection string        | Yes      | -       | `file:/app/data/local.db` |
| `BETTER_AUTH_SECRET`           | Secret key for authentication     | Yes      | -       | `prod-secret-key-123` |
| `BETTER_AUTH_URL`              | Base URL for auth callbacks       | Yes      | -       | `https://api.yourdomain.com` |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key for AI features | Yes      | -       | `AIzaSyC...` |
| `CORS_ORIGIN`                  | Allowed CORS origins              | Yes      | -       | `https://yourfrontend.com` |
| `NODE_ENV`                     | Node environment                  | No       | `production` | `production` |
| `SERVER_PORT`                  | Server port number                | No       | `3000`  | `3001` |

## Deployment Commands

### Build and start the server
```bash
docker-compose -f docker-compose.server.yml up --build -d
```

### Stop the server
```bash
docker-compose -f docker-compose.server.yml down
```

### View logs
```bash
docker-compose -f docker-compose.server.yml logs -f
```

### Rebuild without cache
```bash
docker-compose -f docker-compose.server.yml build --no-cache
```

### Update deployment
```bash
docker-compose -f docker-compose.server.yml down
docker-compose -f docker-compose.server.yml pull
docker-compose -f docker-compose.server.yml up --build -d
```

### Check container status
```bash
docker-compose -f docker-compose.server.yml ps
```

### View resource usage
```bash
docker stats tanstack-learn-server
```

## Security Considerations

### Environment Variables
- Never commit secrets to version control
- Use Docker secrets for sensitive data in production
- Rotate secrets regularly
- Use strong, unique passwords

### Container Security
- Non-root user execution
- Minimal attack surface with slim image
- Regular base image updates
- Network isolation

### Database Security
- Database runs inside container
- No external database access required
- Regular backups recommended
- Consider encryption for sensitive data

## Monitoring and Maintenance

### Health Checks
The container includes built-in health checks that monitor:
- Server responsiveness
- API endpoint availability
- Database connectivity

### Logs
Access logs with:
```bash
docker-compose -f docker-compose.server.yml logs -f server
```

### Database Management
For database operations, you can run commands inside the container:
```bash
docker-compose -f docker-compose.server.yml exec server bun run db:studio
```

## Scaling Considerations

### Horizontal Scaling
For high-traffic deployments, consider:
- Load balancer in front of multiple containers
- External database (PostgreSQL, MySQL)
- Redis for session storage
- CDN for static assets

### Vertical Scaling
- Increase container resources in docker-compose.yml
- Use resource limits to prevent resource exhaustion
- Monitor memory and CPU usage

## Troubleshooting

### Container won't start
1. Check environment variables are set correctly
2. Verify all required variables are present
3. Check logs: `docker-compose logs server`
4. Ensure ports are not already in use

### Port conflicts
If port 3000 is already in use:
1. **Set a different port**: Add `SERVER_PORT=3001` to your `.env` file
2. **Check port usage**: `sudo netstat -tulpn | grep :3000`
3. **Stop conflicting service**: `sudo systemctl stop <service-name>`
4. **Use available port**: Choose a port not in use (3001, 3002, etc.)

### Database connection issues
1. Check database volume permissions
2. Verify DATABASE_URL format
3. Ensure sufficient disk space
4. Check container logs for database errors

### Performance issues
1. Monitor resource usage: `docker stats`
2. Check for memory leaks in application logs
3. Consider database optimization
4. Review API response times

### Build failures
1. Clear Docker cache: `docker system prune -a`
2. Check available disk space
3. Verify Docker daemon is running
4. Review build logs for specific errors

### Lockfile issues
If you encounter "lockfile had changes, but lockfile is frozen" errors:
1. Update dependencies locally: `bun install`
2. Commit the updated lockfile to your repository
3. Rebuild the Docker image
4. Or use the development setup instead for local testing

## Production Checklist

- [ ] Environment variables configured
- [ ] Domain names and URLs updated
- [ ] SSL certificates in place
- [ ] Database backups configured
- [ ] Monitoring and alerting set up
- [ ] Load testing completed
- [ ] Security audit performed
- [ ] Documentation updated
- [ ] Dependencies updated and lockfile committed
- [ ] Docker build tested locally before deployment

## File Structure

```
tanstack-learn/
├── Dockerfile.server           # Production Docker image
├── docker-compose.server.yml   # Production deployment config
├── .env                        # Environment variables (create this)
├── apps/server/                # Server application
│   ├── src/                    # Source code
│   ├── package.json           # Dependencies
│   └── dist/                  # Built application (created by Docker)
└── guides/
    └── docker-server-guide.md # This guide
```