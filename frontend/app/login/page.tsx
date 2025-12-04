'use client'

import { useState, useEffect } from 'react'
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState('/dashboard')
  const { login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Get redirect parameter from URL on client side
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get('redirect')
    if (redirect) {
      setRedirectUrl(redirect)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Call backend API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Use actual user data from backend
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
        }
        login(data.access_token, userData)
        router.push(redirectUrl)
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} lg={4}>
          <Card className="card-shadow">
            <Card.Header className="bg-primary text-white text-center">
              <h2 className="h4 mb-0">Login</h2>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100" 
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
              
              <div className="mt-3 text-center">
                <small className="text-muted">
                  Demo credentials: admin@example.com / password123
                </small>
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              <small>
                Don't have an account?{' '}
                <a href="/register" className="text-primary">Register here</a>
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
