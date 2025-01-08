import React from "react";
import { useState, useEffect } from 'react'
import { edit_task } from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { priorityColors, priorityLabels, statusColors, statusLabels} from "./colors.js";


function TaskList(props) {
  const [tasks, setTasks] = useState([]);
  
  


  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks])

  const handlePriorityChange = (id, newPriority) => {
    edit_task({ id, priority: newPriority }); 
    props.triggerRefresh();
  };

  const handleStatusChange = (id, newStatus) => {
    edit_task({ id, status: newStatus });
    props.triggerRefresh();
  };

  function printTask(id) {
    // console.log("should trigger parent to change DisplayTask component")
    const task = tasks.find(x => x.id === id)
    props.printTask(task)
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Liste des Tâches</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Priorité</th>
            <th>Statut</th>
            <th>Date de début</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id} onClick={(e) => printTask(task.id)} className="cursor-pointer">
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <select
                  className="form-select"
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(task.id, parseInt(e.target.value))}
                >
                  {priorityLabels.map((label, idx) => (
                    <option key={idx + 1} value={idx + 1} className={priorityColors[idx+1]}>{label}</option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  className="form-select"
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, parseInt(e.target.value))}
                >
                  {statusLabels.map((label, idx) => (
                    <option key={idx + 1} value={idx + 1} className={statusColors[idx+1]}>{label}</option>
                  ))}
                </select>
              </td>
              <td>{task.date_start}</td>
              <td>{task.date_end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
