# Docker Setup for Shyara Project

This project includes Docker configuration to run the full-stack application in a container.

## Files Created

- `Dockerfile` - Multi-stage build configuration
- `.dockerignore` - Optimizes build context by excluding unnecessary files
- `docker-compose.yml` - Easy container orchestration
- `README-Docker.md` - This documentation

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run the application
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop the application
docker-compose down
```

### Option 2: Using Docker directly

```bash
# Build the image
docker build -t shyara-app .

# Run the container
docker run -p 3000:3000 shyara-app

# Run in detached mode
docker run -d -p 3000:3000 --name shyara-container shyara-app
```

## Accessing the Application

Once the container is running, you can access the application at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api/contact

## Docker Configuration Details

### Multi-Stage Build

The Dockerfile uses a multi-stage build process:

1. **Frontend Builder Stage**: 
   - Uses Node.js 18 Alpine
   - Installs frontend dependencies
   - Builds the React application

2. **Production Stage**:
   - Uses Node.js 18 Alpine
   - Installs backend dependencies
   - Copies the built frontend
   - Runs the Express server

### Security Features

- Runs as non-root user (`nodejs`)
- Uses Alpine Linux for smaller image size
- Includes health checks
- Production-optimized dependencies

### Environment Variables

- `NODE_ENV=production`
- `PORT=3000`

## Development vs Production

This Docker setup is optimized for production. For development, you might want to:

1. Mount volumes for live code changes
2. Use development dependencies
3. Enable hot reloading

Example development docker-compose.yml:

```yaml
version: '3.8'
services:
  shyara-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
      - "3001:3001"  # For frontend dev server
    volumes:
      - ./frontend:/app/frontend
      - ./backend:/app/backend
    environment:
      - NODE_ENV=development
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change the port mapping:
```bash
docker run -p 3001:3000 shyara-app
```

### Build Issues
If you encounter build issues:
1. Ensure all dependencies are properly listed in package.json files
2. Check that the frontend build process completes successfully
3. Verify file paths in the Dockerfile

### Container Won't Start
Check container logs:
```bash
docker logs shyara-container
```

## Image Size Optimization

The current setup uses Alpine Linux and multi-stage builds to minimize the final image size. The image includes:
- Node.js runtime
- Express server
- Built React application
- Production dependencies only
