import React, { useState } from 'react';
import { priorityLabels, statusLabels } from './colors';
import { add_task } from "./api"
import { useNavigate } from 'react-router';

const CreateTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
    date_start: '',
    date_end: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add_task(task)
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={task.title} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={task.description} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={task.priority} onChange={handleChange} className="form-control" required>
            <option value="">Select Priority</option>
            {priorityLabels.map((label, index) => (
              <option key={index} value={index + 1}>{label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={task.status} onChange={handleChange} className="form-control" required>
            <option value="">Select Status</option>
            {statusLabels.map((label, index) => (
              <option key={index} value={index + 1}>{label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" name="date_start" value={task.date_start} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="date" name="date_end" value={task.date_end} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
