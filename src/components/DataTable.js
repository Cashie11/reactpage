/**
 * DataTable Component - Fixed Version
 * A clean implementation of the data table with all features
 */
import React, { useState, useEffect } from 'react';
import './DataTable.css';

// Sample data
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', active: true },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', active: false },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', active: true },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', active: false }
];

const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    active: false
  });

  // Load data
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(initialUsers);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle search
  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  // Handle edit mode
  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active
    });
  };

  // Handle form changes
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Save changes
  const handleSave = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...editFormData } : user
    ));
    setEditingId(null);
  };

  // Delete user
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) || 
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  // Loading state
  if (loading) {
    return <div className="loading" data-testid="loading">Loading users...</div>;
  }

  return (
    <section 
      className="data-table-section" 
      data-testid="data-table"
      aria-label="User Management Table"
    >
      <h2>User Management</h2>
      
      {/* Search Input */}
      <div className="search-container">
        <label>
          Search:
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            data-testid="search-input"
            placeholder="Search users..."
            className="search-input"
          />
        </label>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr 
                  key={user.id} 
                  data-testid={`user-row-${user.id}`}
                  className={editingId === user.id ? 'editing' : ''}
                >
                  <td>{user.id}</td>
                  <td>
                    {editingId === user.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        data-testid="edit-name"
                        className="form-input"
                        required
                      />
                    ) : (
                      <span>{user.name}</span>
                    )}
                  </td>
                  <td>
                    {editingId === user.id ? (
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditChange}
                        data-testid="edit-email"
                        className="form-input"
                        required
                      />
                    ) : (
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    )}
                  </td>
                  <td>
                    {editingId === user.id ? (
                      <select 
                        name="role" 
                        value={editFormData.role}
                        onChange={handleEditChange}
                        data-testid="edit-role"
                        className="form-select"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                        <option value="User">User</option>
                      </select>
                    ) : (
                      <span className={`role-badge ${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingId === user.id ? (
                      <div className="status-toggle-container">
                        <label className="status-toggle">
                          <input
                            type="checkbox"
                            name="active"
                            checked={editFormData.active}
                            onChange={handleEditChange}
                            data-testid="edit-status"
                          />
                          <span className="slider round"></span>
                        </label>
                        <span className="status-text">
                          {editFormData.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    ) : (
                      <span className={`status ${user.active ? 'active' : 'inactive'}`}>
                        {user.active ? 'Active' : 'Inactive'}
                      </span>
                    )}
                  </td>
                  <td className="actions">
                    <div className="button-group">
                      {editingId === user.id ? (
                        <>
                          <button 
                            onClick={() => handleSave(user.id)}
                            data-testid={`save-${user.id}`}
                            className="save-btn"
                          >
                            Save
                          </button>
                          <button 
                            onClick={() => setEditingId(null)}
                            data-testid={`cancel-${user.id}`}
                            className="cancel-btn"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleEdit(user)}
                            data-testid={`edit-${user.id}`}
                            className="edit-btn"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)}
                            data-testid={`delete-${user.id}`}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" data-testid="no-results">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DataTable;
