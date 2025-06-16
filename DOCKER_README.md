# Perfect Circle - Docker Setup

This project is containerized using Docker and Docker Compose for easy development and deployment.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### Development Mode (with hot reloading)

1. **Clone and navigate to the project:**
   ```bash
   git clone <your-repo-url>
   cd PerfectCircle
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your actual values.

3. **Start development environment:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

4. **Access the application:**
   - Application: http://localhost:3000
   - Database: localhost:5432

### Production Mode

1. **Build and start production containers:**
   ```bash
   docker-compose up --build -d
   ```

2. **Access the application:**
   - Application: http://localhost:3000

## Available Commands

### Development
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Start in background
docker-compose -f docker-compose.dev.yml up -d

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Production
```bash
# Start production environment
docker-compose up -d

# Stop production environment
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build
```

### Database Operations

```bash
# Access PostgreSQL database
docker exec -it perfectcircle-db-dev psql -U perfectcircle_user -d perfectcircle

# Run database migrations (if you have them)
docker-compose -f docker-compose.dev.yml exec app npm run migrate

# Reset database (removes all data!)
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up --build
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `BREVO_*`: Email service configuration
- `CLOUDINARY_*`: Image upload service configuration

## Project Structure

```
├── Dockerfile                 # Production Docker image
├── docker-compose.yml         # Production Docker Compose
├── docker-compose.dev.yml     # Development Docker Compose
├── .dockerignore             # Docker ignore file
├── schema.sql                # Database schema
├── seed.sql                  # Database seed data
└── src/                      # Next.js application source
```

## Troubleshooting

### Port Already in Use
If port 3000 or 5432 is already in use, modify the port mappings in the docker-compose files.

### Database Connection Issues
1. Ensure the database container is healthy: `docker-compose ps`
2. Check database logs: `docker-compose logs db`
3. Verify environment variables in `.env`

### Application Won't Start
1. Check application logs: `docker-compose logs app`
2. Ensure all environment variables are set
3. Try rebuilding: `docker-compose up --build`

### Reset Everything
```bash
# Stop all containers and remove volumes
docker-compose -f docker-compose.dev.yml down -v
docker system prune -f

# Start fresh
docker-compose -f docker-compose.dev.yml up --build
```

## Deployment

For production deployment, you can:

1. **Use the production docker-compose.yml on a VPS**
2. **Deploy to cloud platforms that support Docker:**
   - Railway
   - DigitalOcean App Platform
   - AWS ECS
   - Google Cloud Run

3. **Build and push to a container registry:**
   ```bash
   docker build -t your-registry/perfectcircle .
   docker push your-registry/perfectcircle
   ``` 