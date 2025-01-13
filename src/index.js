import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';


import App from './App';
import CreateTask from './CreateTask';
import UpdateTask from './UpdateTask';
import LoginPage from './LoginPage'; 
import CreateUser from './CreateUser'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path ="/tasks" element={<App />} />
        
        <Route path="/update" element={<UpdateTask />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/create_user" element={<CreateUser />} />

    
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
