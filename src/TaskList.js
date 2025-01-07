import React from "react";
//import tasksData from "./tasks.json";
import 'bootstrap/dist/css/bootstrap.min.css';
const tasksData = require("./tasks.json"); 
const TaskList = () => {
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
        return "Inconnue";
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
        return "Inconnu";
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
          {tasksData.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{getPriorityLabel(task.priority)}</td>
              <td>{getStatusLabel(task.status)}</td>
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
