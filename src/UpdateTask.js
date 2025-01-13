import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { parseJwt, edit_task, delete_task, get_all_users } from "./api";
import { priorityLabels, statusLabels } from './colors';

const UpdateTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [task, setTask] = useState(location.state?.task || {
    id: '',
    title: '',
    description: '',
    priority: '',
    status: '',
    date_start: '',
    date_end: '',
    users: []
  });
  const [is_admin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [assignedUser, setAssignedUser] = useState('');

  useEffect(() => {
    let token = localStorage.getItem('token', null);
    if (token === null) {
      setIsAdmin(false);
      window.href.location = '/';
    } else {
      const data = parseJwt(token);
      setIsAdmin(data.isAdmin);
    }
    get_all_users().then(data => setUsers(data));
  }, []);

  const handleUserChange = (e) => {
    setAssignedUser(e.target.value);
  };

  const handleAddUser = (newuser) => {
    if (task.users.length === 0) {
      task.users = [newuser];
    } else {
      task.users.map(user => {
        if (user.id === newuser.id) {
          return;
        } else {
          setTask(prevTask => ({
            ...prevTask,
            users: [...prevTask.users, newuser]
          }));
        }
      })
    }
    setAssignedUser('');
  };

  const handleDelete = () => {
    delete_task(task.id);
    navigate("/tasks");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    edit_task(task);
    navigate("/tasks");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="form-control"
            required
          >
            {priorityLabels.map((label, index) => (
              <option key={index} value={index + 1}>{label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="form-control"
            required
          >
            {statusLabels.map((label, index) => (
              <option key={index} value={index + 1}>{label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="date_start"
            value={task.date_start}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="date_end"
            value={task.date_end}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Search User</label>
          <input
            type="text"
            value={assignedUser}
            onChange={handleUserChange}
            className="form-control"
            placeholder="Search for a user..."
          />
          {assignedUser && (
            <div className="user-suggestions">
              {users
                .filter(user =>
                  user.username.toLowerCase().includes(assignedUser.toLowerCase())
                )
                .map(user => (
                  <div
                    key={user.id}
                    className="user-suggestion"
                    onClick={() => handleAddUser(user)}
                  >
                    {user.username}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="assigned-users">
          <div>
            {task.users.map(user => {
              return (
                <div key={user.id} className="btn btn-secondary m-2">
                  {user.username}
                </div>
              );
            })}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">Update Task</button>
        {is_admin && (
          <button
            type="button"
            className="btn btn-danger mt-3 ms-3"
            onClick={handleDelete}
          >
            Delete Task
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdateTask;
