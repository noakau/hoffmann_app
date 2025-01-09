import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //Faux login pour navigation
    if (email === "test@example.com" && password === "password123") {
      alert("Connexion réussie !");
      // Stocker un faux token pour simuler l'authentification
      localStorage.setItem("token", "fake-jwt-token");
      navigate("/tasks");
    } else {
      setError("Identifiants incorrects !");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center">Bienvenue !</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark">Se connecter</button>
        </form>
        <p>
        Pas encore de compte ? 
        <Link to="/register">
          <button type="button" className="btn btn-link">Créer un compte</button>
        </Link>
      </p>
        
      </div>
    </div>
  );
};

export default LoginPage;