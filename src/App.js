import './App.css';
import { useState, useEffect } from 'react';

import TaskList from './TaskList';
import DisplayTask from './DisplayTask';

import { get_all_tasks } from "./api";



function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);


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

  



  return (
    <div className="App">
       <TaskList tasks={tasks} printTask={printTask} triggerRefresh={refreshTasks}></TaskList>
       <DisplayTask task={task} printTask={printTask} triggerRefresh={refreshTasks}></DisplayTask>
    </div>
  );
}

export default App;
