import axios from 'axios';

const API_BASE_URL = 'https://back-end-api-gfl0.onrender.com/api/projects'; // URL de l'API des projets
const UPLOAD_URL = 'https://back-end-api-gfl0.onrender.com/api/upload'; // URL de l'API d'upload des images

// Fonction pour gérer les erreurs
const handleError = (error) => {
  if (error.response) {
    console.error('Erreur serveur:', error.response.data);
    return { success: false, error: error.response.data.message || 'Erreur serveur' };
  } else if (error.request) {
    console.error('Erreur réseau:', error.request);
    return { success: false, error: 'Erreur réseau : Impossible de joindre le serveur.' };
  } else {
    console.error('Erreur inconnue:', error.message);
    return { success: false, error: error.message || 'Erreur inconnue' };
  }
};

// Récupérer tous les projets
export const obtenirTousLesProjets = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return { success: true, projects: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Récupérer un projet par ID
export const obtenirProjetParId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return { success: true, project: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Créer un projet
export const creerProjet = async (projectData) => {
  try {
    const response = await axios.post(API_BASE_URL, projectData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return { success: true, project: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Mettre à jour un projet
export const mettreAJourProjet = async (id, projectData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, projectData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return { success: true, project: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Supprimer un projet
export const supprimerProjet = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return { success: true, message: 'Projet supprimé avec succès' };
  } catch (error) {
    return handleError(error);
  }
};

// Fonction pour uploader une image via l'API
export const uploaderImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(UPLOAD_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return { success: true, imageUrl: response.data.fileUrl }; // Retourne l'URL de l'image téléchargée
  } catch (error) {
    return handleError(error);
  }
};
