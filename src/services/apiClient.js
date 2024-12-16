import axios from 'axios';

const API_URL = 'https://back-end-api-gfl0.onrender.com/api/clients';

// Récupérer les informations du client
export const getClientInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/getClientInfo`, {
      headers: {
        Authorization: `Bearer ${token}`, // Envoie le token d'authentification dans l'en-tête
      },
    });

    return response.data; // Retourne les données du client
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch user information');
  }
};

// Mettre à jour les informations du client
export const updateClient = async (clientData, token) => {
  try {
    const response = await axios.put(`${API_URL}/updateClient`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retourne les informations du client mises à jour
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erreur inconnue');
  }
};