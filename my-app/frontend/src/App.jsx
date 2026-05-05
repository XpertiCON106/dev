import { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ userId: '', name: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/users`)
      const data = await response.json()
      setUsers(data.users)
      setError('')
    } catch (err) {
      setError('Failed to fetch users')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.userId.trim() || !formData.name.trim()) {
      setError('Both fields are required')
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.detail || 'Failed to add user')
        return
      }

      // Success - add user to list and close modal
      setUsers(prev => [...prev, formData])
      setFormData({ userId: '', name: '' })
      setShowModal(false)
    } catch (err) {
      setError('Error adding user: ' + err.message)
      console.error(err)
    }
  }

  const handleOpenModal = () => {
    setFormData({ userId: '', name: '' })
    setError('')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({ userId: '', name: '' })
    setError('')
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>User Registry</h1>
        <button className="add-user-btn" onClick={handleOpenModal}>
          + Add User
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="no-users">No users yet. Click "Add User" to create one.</p>
      ) : (
        <div className="users-list">
          {users.map(user => (
            <div key={user.userId} className="user-card">
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-id">ID: {user.userId}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New User</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>

            <form onSubmit={handleAddUser} className="modal-form">
              <div className="form-group">
                <label htmlFor="userId">User ID:</label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  placeholder="Enter user ID"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter user name"
                  required
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <div className="modal-actions">
                <button type="submit" className="submit-btn">Add User</button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
