import React, { useState, useEffect } from "react";
import { edit_task } from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { priorityColors, priorityLabels, statusColors, statusLabels} from "./colors.js";


function DisplayTask({ task, triggerRefresh, printTask }) {
  const [editedTask, setEditedTask] = useState(task);


  useEffect(() => {
    setEditedTask(task); // Update state when the task changes
  }, [task]);

  const handlePriorityChange = (newPriority) => {
    const updatedTask = { ...editedTask, priority: newPriority };
    setEditedTask(updatedTask);
    edit_task({ id: editedTask.id, priority: newPriority });
    triggerRefresh();
  };

  const handleStatusChange = (newStatus) => {
    const updatedTask = { ...editedTask, status: newStatus };
    setEditedTask(updatedTask);
    edit_task({ id: editedTask.id, status: newStatus });
    triggerRefresh();
  };

  if (editedTask && Object.keys(editedTask).length !== 0) {
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">Détails de la Tâche</h2>
        <div className="card p-3">
          <p><strong>#:</strong> {editedTask.id}</p>
          <p><strong>Titre:</strong> {editedTask.title}</p>
          <p><strong>Description:</strong> {editedTask.description}</p>

          <div className="mb-3">
            <strong>Priorité:</strong>
            <p className={priorityColors[editedTask.priority]}>
              {priorityLabels[editedTask.priority - 1]}
            </p>
          </div>

          <div className="mb-3">
            <strong>Statut:</strong>
            <p className={statusColors[editedTask.status]}>
              {statusLabels[editedTask.status - 1]}
            </p>
          </div>

          <p><strong>Date de début:</strong> {editedTask.date_start}</p>
          <p><strong>Date de fin:</strong> {editedTask.date_end}</p>
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
