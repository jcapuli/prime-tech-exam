# Full-Stack Boilerplate Project

A complete boilerplate project with Docker, Next.js frontend, NestJS backend, and PostgreSQL database.

## Features

### Frontend
- **Next.js 14** with App Router
- **Bootstrap 5** integration with React Bootstrap
- **JWT Authentication** with cookie-based token storage
- **Responsive Design** with Tailwind CSS
- **Sample Pages**: Login, Dashboard, Home

### Backend
- **NestJS** framework with TypeScript
- **PostgreSQL** database with TypeORM
- **JWT Authentication** with Passport.js
- **Input Validation** with class-validator
- **RESTful API** with proper error handling

### DevOps
- **Docker** containers for all services
- **Docker Compose** orchestration
- **Health checks** and auto-restart
- **Volume persistence** for database
- **Network isolation** between services

## Project Structure

```
├── frontend/              # Next.js application
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── public/           # Static assets
│   └── Dockerfile        # Frontend container
├── backend/              # NestJS application
│   ├── src/
│   │   ├── auth/         # Authentication module
│   │   ├── users/        # Users module
│   │   └── common/       # Shared utilities
│   └── Dockerfile        # Backend container
├── docker-compose.yaml   # Service orchestration
├── .env.example          # Environment variables template
└── README.md             # This file
```

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)

### Using Docker Compose (Recommended)

1. **Clone and setup**
   ```bash
   cp .env.example .env
   ```

2. **Start all services**
   ```bash
   docker-compose up
   ```

3. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api
   - PostgreSQL: localhost:5432

### Manual Development Setup

#### Backend
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Protected user profile
- `GET /api/auth/health` - Health check

### Default Credentials
- Email: `admin@example.com`
- Password: `password123`

## Database Access

PostgreSQL is accessible from outside the container:
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `boilerplate_db`
- **Username**: `admin`
- **Password**: `admin123`

You can connect using any PostgreSQL client:
```bash
psql -h localhost -p 5432 -U admin -d boilerplate_db
```

## Environment Variables

Copy `.env.example` to `.env` and modify as needed:

```bash
cp .env.example .env
```

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests (when configured)
cd frontend
npm test
```

### Building for Production
```bash
# Build all containers
docker-compose build

# Run in production mode
docker-compose -f docker-compose.prod.yaml up
```

## Docker Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose build

# Remove volumes (clears database)
docker-compose down -v
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 3001, and 5432 are available
2. **Database connection**: Wait for PostgreSQL to fully start (health check in compose)
3. **Docker permissions**: Ensure Docker daemon is running
4. **Node modules**: If changing package.json, rebuild containers

### Health Checks
- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api/auth/health
- Database: `docker-compose exec postgres pg_isready -U admin`

## License

MIT
# prime-tech-exam
