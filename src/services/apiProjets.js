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
    // Vérifier que la réponse contient bien un tableau de projets
    if (Array.isArray(response.data)) {
      return { success: true, projects: response.data };
    } else {
      return { success: false, error: 'Les projets ne sont pas sous forme de tableau.' };
    }
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

// Fonction pour uploader une image via l'API
export const uploaderImage = async (file) => {
  // Vérification de la taille du fichier (par exemple, 5 Mo max)
  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: 'Le fichier est trop grand. Taille maximale: 5 Mo' };
  }

  // Vérification du type de fichier (ici, une image)
  if (!file.type.startsWith('image/')) {
    return { success: false, error: 'Le fichier doit être une image.' };
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(UPLOAD_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    // Renvoie l'URL et le nom du fichier téléchargé
    return { success: true, imageUrl: response.data.fileUrl, imageName: response.data.fileName };
  } catch (error) {
    return handleError(error);
  }
};