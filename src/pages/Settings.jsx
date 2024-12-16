import React, { useState, useEffect } from 'react';
import { getClientInfo, updateClient } from '../services/apiClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importer le hook d'authentification
import Message from '../components/Message'; // Importer le composant Message

const Settings = () => {
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); // État pour le message de succès

  const token = localStorage.getItem('token');
  const { updateUser } = useAuth(); // Importer updateUser pour mettre à jour le contexte

  useEffect(() => {
    if (!token) {
      setError('Utilisateur non authentifié');
      setLoading(false);
      return;
    }

    const fetchClientInfo = async () => {
      try {
        const data = await getClientInfo(token);
        setClientData(data);
        setLoading(false);
      } catch (error) {
        setError('Erreur lors de la récupération des informations');
        setLoading(false);
      }
    };

    fetchClientInfo();
  }, [token]);

  const handleChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!clientData.email.includes('@')) {
      setError('Veuillez entrer un email valide.');
      return false;
    }
    if (clientData.phone && !/^\d+$/.test(clientData.phone)) {
      setError('Le numéro de téléphone ne doit contenir que des chiffres.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Réinitialiser les messages avant chaque soumission
    setError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;
    
    setSubmitting(true);
    try {
      await updateClient(clientData, token); // Met à jour les données côté API
      updateUser(clientData); // Met à jour les données utilisateur dans le contexte
      setSuccessMessage('Informations mises à jour avec succès'); // Message de succès
    } catch (error) {
      setError('Erreur lors de la mise à jour des informations');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="container my-5">
      <h2>Paramètres</h2>
      
      {/* Afficher le message de succès ou d'erreur */}
      {successMessage && <Message type="success" message={successMessage} />}
      {error && <Message type="danger" message={error} />}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={clientData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={clientData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Téléphone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            value={clientData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  );
};

export default Settings;