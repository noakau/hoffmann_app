import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from "./api";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await register(email, password);

    if (user) {
      alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
      navigate('/TaskList'); // Rediriger vers la page de connexion
    } else {
      alert('Erreur lors de la création du compte.');
    }
  };

  return (
    <div>
      <h1>Créer un compte</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
      </form>
    </div>
  );
};

export default RegisterPage;
