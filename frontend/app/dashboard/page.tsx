'use client'

import { Card, Button, Container, Row, Col, Table, ProgressBar, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function DashboardPage() {
  const { isAuthenticated, user, token } = useAuth()
  const router = useRouter()
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      const currentPath = window.location.pathname
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
    } else if (token) {
      fetchTasks()
    }
  }, [isAuthenticated, router, token])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3001/v1/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }
      const data = await response.json()
      setTasks(data)
      setError('')
    } catch (err) {
      setError('Failed to load tasks. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  // Compute status counts
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const pieData = [
    { name: 'Pending', value: statusCounts['pending'] || 0, color: '#6c757d' },
    { name: 'In Progress', value: statusCounts['in_progress'] || 0, color: '#ffc107' },
    { name: 'Completed', value: statusCounts['completed'] || 0, color: '#198754' },
  ]

  const totalTasks = tasks.length

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="h2">Dashboard</h1>
          <p className="text-muted">Welcome back, {user?.name}! Here's your task status overview.</p>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={3}>
              <Card className="card-shadow text-center">
                <Card.Body>
                  <Card.Title>Total Tasks</Card.Title>
                  <h2 className="display-6">{totalTasks}</h2>
                  <Card.Text>
                    <small className="text-muted">All tasks</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="card-shadow text-center">
                <Card.Body>
                  <Card.Title>Pending</Card.Title>
                  <h2 className="display-6" style={{ color: '#6c757d' }}>{statusCounts['pending'] || 0}</h2>
                  <Card.Text>
                    <small className="text-muted">Awaiting action</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="card-shadow text-center">
                <Card.Body>
                  <Card.Title>In Progress</Card.Title>
                  <h2 className="display-6" style={{ color: '#ffc107' }}>{statusCounts['in_progress'] || 0}</h2>
                  <Card.Text>
                    <small className="text-muted">Currently working</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="card-shadow text-center">
                <Card.Body>
                  <Card.Title>Completed</Card.Title>
                  <h2 className="display-6" style={{ color: '#198754' }}>{statusCounts['completed'] || 0}</h2>
                  <Card.Text>
                    <small className="text-muted">Finished tasks</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Card className="card-shadow">
                <Card.Header>
                  <Card.Title>Task Status Distribution</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '400px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Count']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="card-shadow mb-4">
                <Card.Header>
                  <Card.Title>Status Breakdown</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Table striped hover size="sm">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Count</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pieData.map((item) => (
                        <tr key={item.name}>
                          <td>
                            <span
                              className="badge"
                              style={{ backgroundColor: item.color, color: item.name === 'In Progress' ? '#000' : '#fff' }}
                            >
                              {item.name}
                            </span>
                          </td>
                          <td>{item.value}</td>
                          <td>{totalTasks > 0 ? ((item.value / totalTasks) * 100).toFixed(1) + '%' : '0%'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              <Card className="card-shadow">
                <Card.Header>
                  <Card.Title>Quick Actions</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-2">
                    <Button variant="primary" onClick={() => router.push('/tasks')}>
                      View All Tasks
                    </Button>
                    <Button variant="outline-primary" onClick={() => router.push('/tasks?create=true')}>
                      Create New Task
                    </Button>
                    <Button variant="outline-secondary" onClick={fetchTasks}>
                      Refresh Data
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}
