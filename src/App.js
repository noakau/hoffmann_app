import './App.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import TaskList from './TaskList';
import DisplayTask from './DisplayTask';

import { get_all_tasks } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);
  const [filters, setFilters] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
    status: "",
    date_start: "",
    date_end: ""
  });
  const [search, setSearch] = useState("");

  const priorityLabels = ["Faible", "Moyenne", "Importante", "Urgente"];
  const statusLabels = ["À faire", "En cours", "Terminé"];

  const refreshTasks = () => {
      get_all_tasks()
      .then((newTasks) => {setTasks([...newTasks]); console.log(tasks)})  
  };

  const printTask = (task) => {
    setTask(task)  
};

// s'execute quand le composant est rendu
  useEffect(() => {
        get_all_tasks()
        .then((tasks) => {setTasks(tasks);})    
    }, [])

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      id: "",
      title: "",
      description: "",
      priority: "",
      status: "",
      date_start: "",
      date_end: ""
    });
    setSearch("");
  };

  const filteredTasks = tasks.filter(task => {
    return Object.keys(filters).every(key => task[key].toString().includes(filters[key])) &&
      (task.title.includes(search) || task.description.includes(search));
  });

  return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <img src={`${process.env.PUBLIC_URL}/hoffmann_ai_logo.jpeg`} alt="Hoffmann" width="50" height="50" className='mx-2' />
            Hoffmann task Management
          </Link>

          <Link className='btn btn-primary float-right' to="/create">Create Task</Link>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 bg-light border-right">
              <h5 className="mt-3">Connected Users</h5>
              {/* Add your connected users component or list here */}
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="mb-3 d-flex align-items-center flex-row">
                  <input
                    type="text"
                    name="id"
                    placeholder="Filter by ID"
                    value={filters.id}
                    onChange={handleFilterChange}
                    className="form-control mb-1 me-1 py-2"
                  />
                  <select
                    name="priority"
                    value={filters.priority}
                    onChange={handleFilterChange}
                    className="form-control mb-1 me-1 py-2"
                  >
                    <option value="">Filter by Priority</option>
                    {priorityLabels.map((label, idx) => (
                      <option key={idx + 1} value={idx + 1}>{label}</option>
                    ))}
                  </select>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="form-control mb-1 me-1 py-2"
                  >
                    <option value="">Filter by Status</option>
                    {statusLabels.map((label, idx) => (
                      <option key={idx + 1} value={idx + 1}>{label}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    name="date_start"
                    placeholder="Filter by Start Date"
                    value={filters.date_start}
                    onChange={handleFilterChange}
                    className="form-control mb-1 me-1 py-2"
                  />
                  <input
                    type="date"
                    name="date_end"
                    placeholder="Filter by End Date"
                    value={filters.date_end}
                    onChange={handleFilterChange}
                    className="form-control mb-1 me-1 py-2"
                  />
                  <input
                  type="text"
                  placeholder="Search in Title or Description"
                  value={search}
                  onChange={handleSearchChange}
                  className="form-control mb-1 me-1 py-2"
                />
                  <button onClick={clearFilters} className="btn btn-secondary mt-2 d-inline-block">Clear Filters</button>
                </div>
                  <div className="col-md-9">
                    <TaskList tasks={filteredTasks} printTask={printTask} triggerRefresh={refreshTasks}></TaskList>
                  </div>
                  <div className="col-md-3">
                    <DisplayTask task={task} printTask={printTask} triggerRefresh={refreshTasks}></DisplayTask>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
