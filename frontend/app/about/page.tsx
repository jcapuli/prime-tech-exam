'use client'

import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card className="card-shadow">
            <Card.Header className="bg-primary text-white">
              <h1 className="h3 mb-0">Welcome to the Boilerplate Project</h1>
            </Card.Header>
            <Card.Body>
              <Card.Title>Full-Stack Application with Next.js & NestJS</Card.Title>
              <Card.Text>
                This is a complete boilerplate project featuring:
              </Card.Text>
              <ul>
                <li><strong>Frontend:</strong> Next.js with Bootstrap integration</li>
                <li><strong>Backend:</strong> NestJS with PostgreSQL</li>
                <li><strong>Authentication:</strong> JWT-based login system</li>
                <li><strong>Database:</strong> PostgreSQL accessible from outside RDBMS</li>
                <li><strong>Containerization:</strong> Docker & Docker Compose setup</li>
                <li><strong>Validation:</strong> Integrated form validation</li>
              </ul>
              <div className="d-flex gap-3 mt-4">
                <Link href="/login" className="btn btn-primary btn-lg">
                  Go to Login
                </Link>
                <Link href="/dashboard" className="btn btn-outline-primary btn-lg">
                  View Dashboard
                </Link>
                <a href="http://localhost:3001/api" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
                  API Documentation
                </a>
              </div>
            </Card.Body>
            <Card.Footer className="text-muted">
              <small>To get started, run <code>docker-compose up</code> in the project root</small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4}>
          <Card className="card-shadow h-100">
            <Card.Body>
              <Card.Title>Frontend Features</Card.Title>
              <Card.Text>
                - Next.js 14 with App Router<br />
                - Bootstrap 5 components<br />
                - JWT authentication<br />
                - Responsive design<br />
                - TypeScript support
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="card-shadow h-100">
            <Card.Body>
              <Card.Title>Backend Features</Card.Title>
              <Card.Text>
                - NestJS framework<br />
                - PostgreSQL database<br />
                - JWT validation<br />
                - RESTful API<br />
                - Input validation
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="card-shadow h-100">
            <Card.Body>
              <Card.Title>DevOps Features</Card.Title>
              <Card.Text>
                - Docker containers<br />
                - Docker Compose orchestration<br />
                - Health checks<br />
                - Volume persistence<br />
                - Network isolation
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
