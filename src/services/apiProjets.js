// src/services/apiProjet.js

import axios from "axios";

const API_BASE_URL = "https://back-end-api-gfl0.onrender.com/api/projects";

// Centralized error handling
const handleError = (error) => {
  if (error.response) {
    console.error("Erreur serveur :", error.response.data);
    return { success: false, error: error.response.data.message || 'Erreur serveur' };
  } else if (error.request) {
    console.error("Erreur réseau :", error.request);
    return { success: false, error: 'Erreur réseau : Impossible de joindre le serveur.' };
  } else {
    console.error("Erreur inconnue :", error.message);
    return { success: false, error: error.message || 'Erreur inconnue' };
  }
};

// Fetch all projects
export const obtenirTousLesProjets = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Fetch a project by ID
export const obtenirProjetParId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Create a new project
export const creerProjet = async (projectData) => {
  try {
    const response = await axios.post(API_BASE_URL, projectData);
    return { success: true, project: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Update an existing project
export const mettreAJourProjet = async (id, projetData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, projetData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Delete a project
export const supprimerProjet = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    // Si la suppression réussit, on renvoie true
    if (response.status === 200) {
      return { success: true };
    }

    // Si ce n'est pas un code 200, on renvoie false
    return { success: false, message: 'Échec de la suppression' };
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    return { success: false, message: 'Erreur réseau ou serveur' };
  }
};
