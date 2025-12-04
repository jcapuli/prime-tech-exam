# Prime Tech Exam - Full Stack Application

## 1. Project Overview

A comprehensive full-stack boilerplate project designed for technical examinations and rapid prototyping. This application features a modern microservices architecture with Docker containerization, providing a complete development environment with authentication, task management, and responsive UI components.

The project demonstrates industry best practices including JWT authentication, RESTful API design, database migrations, and container orchestration. It serves as an excellent starting point for building scalable web applications or as a reference implementation for technical assessments.

## 2. Setup and Installation

### Clone the Repository

```bash
git clone https://github.com/jcapuli/prime-tech-exam.git
cd prime-tech-exam
```

### Quick Start with Docker Compose (Recommended)

1. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Start all services:**
   ```bash
   docker-compose up
   ```

3. **Access the applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api
   - PostgreSQL Database: localhost:5432

### Manual Development Setup

#### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 3. Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS + Bootstrap 5
- **UI Components**: React Bootstrap
- **HTTP Client**: Axios
- **Authentication**: JWT with cookie storage
- **Charts**: Recharts for data visualization

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: Passport.js with JWT strategy
- **Validation**: class-validator + class-transformer
- **Security**: bcryptjs for password hashing
- **API Documentation**: RESTful endpoints

### DevOps & Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Database**: PostgreSQL 15
- **Environment Management**: dotenv
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest (backend)

## 4. API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication Endpoints

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

#### Get Profile (Protected)
```http
GET /auth/profile
Authorization: Bearer <jwt_token>
```

#### Health Check
```http
GET /auth/health
```

### Tasks Endpoints (Protected - Requires JWT)

#### Get All Tasks
```http
GET /tasks
Authorization: Bearer <jwt_token>
```

#### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <jwt_token>
```

#### Create Task
```http
POST /tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "pending"
}
```

#### Update Task
```http
PATCH /tasks/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Task",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <jwt_token>
```

### Default Credentials
- **Email**: `admin@example.com`
- **Password**: `password123`

### Sample API Requests

Using cURL:
```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Get tasks (with JWT token)
curl -X GET http://localhost:3001/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

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
│   │   ├── tasks/        # Tasks CRUD operations
│   │   ├── users/        # User management
│   │   └── typeorm/      # Database entities
│   └── Dockerfile        # Backend container
├── docker-compose.yaml   # Service orchestration
├── .env.example          # Environment variables template
└── README.md             # This file
```

## Database Access

PostgreSQL is accessible from outside the container:
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `boilerplate_db`
- **Username**: `admin`
- **Password**: `admin123`

Connect using any PostgreSQL client:
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
