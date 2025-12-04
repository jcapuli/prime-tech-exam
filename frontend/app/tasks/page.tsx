'use client'

import { useState, useEffect } from 'react'
import { Container, Table, Button, Modal, Form, Alert, Badge } from 'react-bootstrap'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'

interface Task {
  id: number
  title: string
  description: string
  status: string
  due_date: string
  created_at: string
  updated_at: string
}

export default function TasksPage() {
  const { isAuthenticated, token } = useAuth()
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    due_date: '',
  })

  useEffect(() => {
    if (!isAuthenticated) {
      const currentPath = window.location.pathname
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
    } else {
      fetchTasks()
    }
  }, [isAuthenticated, router])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingTask 
        ? `http://localhost:3001/v1/api/tasks/${editingTask.id}`
        : 'http://localhost:3001/v1/api/tasks'
      
      const method = editingTask ? 'PATCH' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save task')
      }

      setShowModal(false)
      setEditingTask(null)
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        due_date: '',
      })
      fetchTasks()
    } catch (err) {
      setError('Failed to save task. Please try again.')
      console.error(err)
    }
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date ? task.due_date.split('T')[0] : '',
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:3001/v1/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete task')
      }

      fetchTasks()
    } catch (err) {
      setError('Failed to delete task. Please try again.')
      console.error(err)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingTask(null)
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      due_date: '',
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge bg="success">Completed</Badge>
      case 'in_progress':
        return <Badge bg="warning" text="dark">In Progress</Badge>
      default:
        return <Badge bg="secondary">Pending</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Tasks</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Add New Task
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : tasks.length === 0 ? (
        <Alert variant="info">
          No tasks found. Create your first task!
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description || '-'}</td>
                <td>{getStatusBadge(task.status)}</td>
                <td>{formatDate(task.due_date)}</td>
                <td>{formatDate(task.created_at)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? 'Edit Task' : 'Create New Task'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({...formData, due_date: e.target.value})}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}
