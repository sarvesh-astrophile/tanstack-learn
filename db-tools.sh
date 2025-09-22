#!/bin/bash

# Database Tools Script for TanStack Learn
# This script provides easy access to database operations in Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
}

# Function to ensure development container exists
ensure_dev_container() {
    if ! docker ps -a --format 'table {{.Names}}' | grep -q "tanstack-learn-server-dev"; then
        print_status "Building development container..."
        docker-compose -f docker-compose.server.yml up --build server-dev
        # Stop the container after building to avoid it running in background
        docker-compose -f docker-compose.server.yml stop server-dev
    fi
}

# Main function to run database commands
run_db_command() {
    local command="$1"
    check_docker
    ensure_dev_container

    print_status "Running: $command"
    docker-compose -f docker-compose.server.yml run --rm server-dev sh -c "cd /app && $command"
}

# Show help
show_help() {
    echo "TanStack Learn Database Tools"
    echo ""
    echo "Usage: $0 <command>"
    echo ""
    echo "Commands:"
    echo "  push      - Push schema changes to database"
    echo "  studio    - Open Drizzle Studio for database management"
    echo "  generate  - Generate migration files"
    echo "  migrate   - Run database migrations"
    echo "  help      - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 push        # Push schema to database"
    echo "  $0 studio      # Open database studio"
    echo ""
}

# Parse command line arguments
case "${1:-help}" in
    "push")
        run_db_command "bun db:push"
        ;;
    "studio")
        run_db_command "bun db:studio"
        ;;
    "generate")
        run_db_command "bun db:generate"
        ;;
    "migrate")
        run_db_command "bun db:migrate"
        ;;
    "help"|*)
        show_help
        ;;
esac
