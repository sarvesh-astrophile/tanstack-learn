# Coolify Deployment Guide for TanStack Learn Server

This guide will help you deploy the TanStack Learn server application to Coolify, a self-hostable PaaS platform.

## Prerequisites

- A Coolify instance running and accessible
- Docker and Docker Compose installed on your system
- Git repository with your TanStack Learn project

## Quick Start

1. **Create a new project in Coolify**
   - Go to your Coolify dashboard
   - Click "New Project"
   - Select "Git Repository"
   - Enter your repository URL
   - Choose the branch you want to deploy (usually `main` or `master`)

2. **Configure Environment Variables**
   - In Coolify, go to your project settings
   - Add the following environment variables:

   ```bash
   # Database Configuration
   DATABASE_URL=file:/app/data/production.db

   # Authentication Configuration
   BETTER_AUTH_SECRET=your-secure-random-secret-key-here
   BETTER_AUTH_URL=https://your-coolify-domain.com

   # AI Configuration
   GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key-here

   # CORS Configuration
   CORS_ORIGIN=https://your-frontend-domain.com
   ```

3. **Deploy**
   - Click "Deploy" in Coolify
   - Wait for the build to complete
   - Your server should be running on port 3000

## Detailed Setup

### 1. Repository Structure

Ensure your repository has the following files:

```
your-repo/
├── Dockerfile.server          # Multi-stage Docker build
├── docker-compose.yml         # Coolify service configuration
├── .env.production.example    # Environment variables template
└── apps/server/               # Server application code
    ├── package.json           # Dependencies and scripts
    ├── src/                   # Source code
    └── drizzle.config.ts      # Database configuration
```

### 2. Environment Variables Setup

#### Required Variables

- **DATABASE_URL**: Database connection string (SQLite file path for simplicity)
- **BETTER_AUTH_SECRET**: Secure random string for authentication
- **BETTER_AUTH_URL**: Your server's public URL
- **GOOGLE_GENERATIVE_AI_API_KEY**: Google AI API key for AI features
- **CORS_ORIGIN**: Frontend domain for CORS policy

#### Generating Secure Secrets

```bash
# Generate a secure random secret for BETTER_AUTH_SECRET
openssl rand -base64 32
```

### 3. Database Setup

The Docker setup uses SQLite with a persistent volume. The database will be automatically created on first run.

To run database migrations after deployment:

1. Access your server via Coolify's terminal
2. Run the database scripts:

```bash
# Push schema changes
bun run db:push

# Generate migrations (if needed)
bun run db:generate

# Run migrations (if using migration files)
bun run db:migrate
```

### 4. Domain Configuration

1. **Server Domain**: Point your API domain to your Coolify server
2. **Frontend Domain**: Configure CORS_ORIGIN to match your frontend domain
3. **SSL**: Coolify automatically handles SSL certificates

### 5. Service Configuration

The `docker-compose.yml` includes:

- **Multi-stage build** for optimized image size
- **Health checks** for monitoring
- **Persistent volumes** for database storage
- **Non-root user** for security
- **Environment variable** configuration

### 6. Monitoring and Logs

- **Health Checks**: The service includes health checks that Coolify monitors
- **Logs**: Access logs through Coolify's dashboard
- **Metrics**: Coolify provides basic metrics and monitoring

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are properly installed
   - Ensure `bun.lock` is committed to your repository
   - Verify the Dockerfile syntax

2. **Database Connection Issues**
   - Check that the database volume is properly mounted
   - Verify the DATABASE_URL environment variable
   - Run database migrations if needed

3. **Authentication Issues**
   - Verify BETTER_AUTH_SECRET is set and secure
   - Check BETTER_AUTH_URL matches your domain
   - Ensure CORS_ORIGIN is correctly configured

4. **AI Features Not Working**
   - Verify GOOGLE_GENERATIVE_AI_API_KEY is set
   - Check Google AI Studio quotas and billing

### Useful Commands

Access your server via Coolify terminal:

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f server

# Restart service
docker-compose restart server

# Run database commands
bun run db:push
bun run db:studio
bun run db:generate
```

### Database Management

For database management, you can:

1. **Use Drizzle Studio** (if available in your environment)
2. **Access the SQLite file** directly via the mounted volume
3. **Run migrations** using the provided scripts

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to your repository
2. **Secrets**: Use Coolify's secret management for sensitive data
3. **Database**: The SQLite database is stored in a persistent volume
4. **HTTPS**: Always use HTTPS in production
5. **CORS**: Configure CORS properly to prevent unauthorized access

## Scaling and Performance

For production workloads:

1. **Consider upgrading** to a cloud database (PostgreSQL, MySQL) instead of SQLite
2. **Monitor resource usage** through Coolify's dashboard
3. **Set up backups** for your database volume
4. **Configure rate limiting** if needed
5. **Use a CDN** for static assets (if applicable)

## Support

- **Coolify Documentation**: https://coolify.io/docs
- **TanStack Learn Issues**: Check your repository's issue tracker
- **Community**: Join the Coolify Discord for community support

## Next Steps

After successful deployment:

1. Test your API endpoints
2. Verify authentication works
3. Test AI features
4. Set up monitoring and alerting
5. Configure backups
6. Set up your frontend to connect to this API