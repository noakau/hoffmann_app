import React  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { priorityColors, priorityLabels, statusColors, statusLabels} from "./colors.js";
import { useNavigate } from 'react-router';


function DisplayTask({ task }) {
  const navigate = useNavigate();

  const handleEditTask = (task) => {
    navigate('/update', { state: { task } });
  };

  if (task && Object.keys(task).length !== 0) {
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">Détails de la Tâche</h2>
        <div className="card p-3">
          <p><strong>#:</strong> {task.id}</p>
          <p><strong>Titre:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>

          <div className="mb-3">
            <strong>Priorité:</strong>
            <p className={priorityColors[task.priority]}>
              {priorityLabels[task.priority - 1]}
            </p>
          </div>

          <div className="mb-3">
            <strong>Statut:</strong>
            <p className={statusColors[task.status]}>
              {statusLabels[task.status - 1]}
            </p>
          </div>

          <p><strong>Date de début:</strong> {task.date_start}</p>
          <p><strong>Date de fin:</strong> {task.date_end}</p>
          <button className='btn btn-secondary float-right' onClick={() => handleEditTask(task)}>Edit Task</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">Détails de la Tâche</h2>
        <div className="card p-3">
          <p>Click on a task to see it here.</p>
        </div>
      </div>
    );
  }
};

export default DisplayTask;
