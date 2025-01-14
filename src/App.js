import './App.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TaskList from './TaskList';
import DisplayTask from './DisplayTask';


import { get_all_tasks, parseJwt } from "./api";


let socket;

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);
  const [username, setUsername] = useState("");
  const [filters, setFilters] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
    status: "",
    date_start: "",
    date_end: "",
  });
  const [search, setSearch] = useState("");
  const [is_admin, setis_admin] = useState(false);

  const priorityLabels = ["Faible", "Moyenne", "Importante", "Urgente"];
  const statusLabels = ["À faire", "En cours", "Terminé"];



  const refreshTasks = () => {
    get_all_tasks().then((newTasks) => {
      setTasks([...newTasks]);
      console.log(tasks);
    });
  };

  const printTask = (task) => {
    setTask(task);
  };

  // Exécution lors du rendu du composant
  useEffect(() => {
    get_all_tasks().then((tasks) => {
      setTasks(tasks);
    });
    let token = localStorage.getItem('token', null);
    if (token === null) {
      console.log("user is not even logged in");
      setis_admin(false);
      if (window.location.href != "/") {
        window.location.href = '/';
      }
    } else {
      const data = parseJwt(token);
      setUsername(data.username);
      if (data.isAdmin === true) {
        setis_admin(true);
        console.log("user is an admin")
      } else {
        setis_admin(false);
      console.log("user is not an administrator");
      }
    }

    const domain_name = window.location.hostname;
    socket = new WebSocket(`ws://${domain_name}`);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("New message:", message)
      if (message.type === 'task_added') {
        alert(`New task added: ${message.task[0].title}`);
        get_all_tasks().then(setTasks);
      } else if (message.type === 'task_deleted') {
        alert(`Task deleted: ${message.taskId}`);
        get_all_tasks().then(setTasks);
      } else if (message.type === 'task_updated') {
        alert(`Task updated: ${message.task[0].title}`);
        get_all_tasks().then(setTasks);
      } else {
        alert(`New notification: ${message}`)
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (socket) socket.close();
    };



  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
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
      date_end: "",
    });
    setSearch("");
  };

  const filteredTasks = tasks?.filter((task) => {
    return (
      Object.keys(filters).every((key) =>
        task[key].toString().includes(filters[key])
      ) &&
      (task.title.includes(search) || task.description.includes(search))
    );
  });

  return (
        
            <div className="App">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                  <img src={`${process.env.PUBLIC_URL}/hoffmann_ai_logo.jpeg`} alt='Hoffmann AI logo' width={"50px"} height={"50px"} className='mx-2'/>
                </a>
                <h1 className="text-center">Bonjour {username}</h1>

                  <Link to="/create" className='btn btn-primary mx-4'>CreateTask</Link>
                  {is_admin && <Link to="/create_user" className='btn btn-success'>Create a User</Link>}
              </nav>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
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
                            <option key={idx + 1} value={idx + 1}>
                              {label}
                            </option>
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
                            <option key={idx + 1} value={idx + 1}>
                              {label}
                            </option>
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
                        <button
                          onClick={clearFilters}
                          className="btn btn-secondary mt-2 d-inline-block"
                        >
                          Clear Filters
                        </button>
                      </div>
                      <div className="col-md-9">
                        <TaskList
                          tasks={filteredTasks}
                          printTask={printTask}
                          triggerRefresh={refreshTasks}
                        ></TaskList>
                      </div>
                      <div className="col-md-3">
                        <DisplayTask
                          task={task}
                          printTask={printTask}
                          triggerRefresh={refreshTasks}
                        ></DisplayTask>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
}

export default App;
