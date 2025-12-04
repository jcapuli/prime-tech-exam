'use client'

import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { useAuth } from './AuthProvider'
import Link from 'next/link'

export default function Navigation() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} href="/">
          Boilerplate App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} href="/">Home</Nav.Link> */}
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} href="/tasks">Tasks</Nav.Link>
                <Nav.Link as={Link} href="/about">About</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} href="/">Login</Nav.Link>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <Navbar.Text className="me-3">
                  Welcome, <strong>{user?.name}</strong>
                </Navbar.Text>
                <Button variant="outline-light" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" onClick={() => window.location.href = '/'} className="me-2">
                  Login
                </Button>
                <Button variant="light" onClick={() => window.location.href = '/register'}>
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
