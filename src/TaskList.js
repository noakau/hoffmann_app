import React from "react";
import { useState, useEffect } from 'react';
import { edit_task, get_all_tasks } from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // s'execute quand le composant est rendu
  useEffect(() => {
      get_all_tasks()
      .then((tasks) => {setTasks(tasks);})    
  }, [])

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


  const handlePriorityChange = (id, newPriority) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    edit_task({ id, priority: newPriority }); 
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    edit_task({ id, status: newStatus });
  };

  // Fonction utilitaire pour convertir la priorité en texte lisible
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return "Faible";
      case 2:
        return "Moyenne";
      case 3:
        return "Importante";
      case 4:
        return "Urgente";
      default:
        return "Error";
    }
  };

  // Fonction utilitaire pour convertir le statut en texte lisible
  const getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return "À faire";
      case 2:
        return "En cours";
      case 3:
        return "Terminé";
      default:
        return "Error";
    }
  };

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
            <tr key={task.id}>
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
