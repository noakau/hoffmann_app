import React, { useState, useEffect } from "react";
import { edit_task } from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';

function DisplayTask({ task, triggerRefresh, printTask }) {
  const [editedTask, setEditedTask] = useState(task);

  const priorityLabels = ["Faible", "Moyenne", "Importante", "Urgente"];
  const statusLabels = ["À faire", "En cours", "Terminé"];
  const priorityColors = {
    1: "text-success", // vert pour low priority
    2: "text-info", // bleu pour medium priority
    3: "text-warning", // jaune pour important
    4: "text-danger" // rouge pour urgent
  };
  const statusColors = {
    1: "text-secondary", // gris pour "À faire"
    2: "text-primary", // bleu pour "En cours"
    3: "text-success" // vert pour "Terminé"
  };

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
            <select
              className="form-select"
              value={editedTask.priority}
              onChange={(e) => handlePriorityChange(parseInt(e.target.value))}
            >
              {priorityLabels.map((label, idx) => (
                <option
                  key={idx + 1}
                  value={idx + 1}
                  className={priorityColors[idx + 1]}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <strong>Statut:</strong>
            <select
              className="form-select"
              value={editedTask.status}
              onChange={(e) => handleStatusChange(parseInt(e.target.value))}
            >
              {statusLabels.map((label, idx) => (
                <option
                  key={idx + 1}
                  value={idx + 1}
                  className={statusColors[idx + 1]}
                >
                  {label}
                </option>
              ))}
            </select>
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
