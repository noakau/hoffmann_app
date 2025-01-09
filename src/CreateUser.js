import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create_user } from "./api";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom:'',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate("");

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalForm = {
      username: formData.nom + ' ' + formData.prenom,
      email: formData.email,
      password: formData.password,
    }

    try {
      const response = await create_user(finalForm);
      if (response.error) {
        setError(response.error)
      } else {
        alert(response.message);
        navigate("/tasks")
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
    <h3 className="text-center mb-4">Remplissez ce form pour créer un utilisateur !</h3>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nom</label>
        <input
          type="text"
          className="form-control shadow-sm"

          name="nom"
          value={formData.nom}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Prenom</label>
        <input
          type="text"
          className="form-control shadow-sm"

          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control shadow-sm"
          
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mot de passe</label>
        <input
          type="password"
          className="form-control shadow-sm"
          
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="btn btn-dark w-100 shadow-sm"
        style={{ padding: "10px", fontWeight: "bold" }}
      >
        Continuer
      </button>
    </form>
  </div>
</div>
  )
}

  
export default CreateUser;
