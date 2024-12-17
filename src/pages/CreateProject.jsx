import React, { useState } from 'react';
import { creerProjet, uploaderImage } from '../services/apiProjet'; // Importer les fonctions nécessaires

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    title: '',
    category: '',
    description: '',
    shortDescription: '',
    skills: '',
    projectLink: '',
    image: null, // Initialiser l'image comme null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // Ajouter un état pour gérer le chargement

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  // Gérer le changement de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectData({
        ...projectData,
        image: file,
      });
      setImagePreview(URL.createObjectURL(file)); // Afficher un aperçu de l'image
    }
  };

  // Fonction pour envoyer le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Début du chargement

    let imageUrl = '';
    if (projectData.image) {
      // Uploader l'image et récupérer son URL
      const imageResponse = await uploaderImage(projectData.image);
      if (imageResponse.success) {
        imageUrl = imageResponse.imageUrl;
      } else {
        setLoading(false); // Arrêter le chargement en cas d'échec
        return alert('Erreur lors de l\'upload de l\'image : ' + imageResponse.error);
      }
    }

    // Créer un objet avec les données du projet
    const projectPayload = {
      ...projectData,
      image: imageUrl, // Ajouter l'URL de l'image téléchargée
    };

    // Envoyer les données du projet à l'API
    const response = await creerProjet(projectPayload);
    setLoading(false); // Arrêter le chargement

    if (response.success) {
      alert('Projet créé avec succès!');
      setProjectData({
        title: '',
        category: '',
        description: '',
        shortDescription: '',
        skills: '',
        projectLink: '',
        image: null,
      });
      setImagePreview(null); // Réinitialiser l'aperçu de l'image
    } else {
      alert('Erreur lors de la création du projet: ' + response.error);
    }
  };

  return (
    <section>
      <div className="container">
        <h2>Créer un Nouveau Projet</h2>
        <form onSubmit={handleSubmit}>
          {/* Champ pour le titre */}
          <input
            type="text"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            placeholder="Nom du projet"
            required
          />

          {/* Champ pour la catégorie */}
          <input
            type="text"
            name="category"
            value={projectData.category}
            onChange={handleChange}
            placeholder="Catégorie"
            required
          />

          {/* Champ pour la description */}
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
            placeholder="Description détaillée"
            required
          />

          {/* Champ pour la description courte */}
          <textarea
            name="shortDescription"
            value={projectData.shortDescription}
            onChange={handleChange}
            placeholder="Description courte"
            required
          />

          {/* Champ pour les compétences */}
          <textarea
            name="skills"
            value={projectData.skills}
            onChange={handleChange}
            placeholder="Compétences développées"
            required
          />

          {/* Champ pour le lien vers le projet */}
          <input
            type="url"
            name="projectLink"
            value={projectData.projectLink}
            onChange={handleChange}
            placeholder="Lien vers le code ou le site"
            required
          />

          {/* Sélecteur d'image */}
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {imagePreview && <img src={imagePreview} alt="Aperçu" style={{ width: '100px' }} />}

          {/* Bouton de soumission */}
          <button type="submit" disabled={loading}>
            {loading ? 'Chargement...' : 'Créer le Projet'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProject;
