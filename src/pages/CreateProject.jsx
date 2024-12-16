import React, { useState } from 'react';
import { creerProjet } from '../services/apiProjets'; // Assurez-vous que le chemin vers le fichier API est correct

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    title: '',
    category: '',
    description: '',
    shortDescription: '',
    skills: '',
    projectLink: '',
    image: null,
    startDate: '',
    endDate: '',
    priority: ''
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectData({
        ...projectData,
        image: file
      });
      setImagePreview(URL.createObjectURL(file)); // Prévisualisation de l'image
    }
  };

  // Fonction pour uploader l'image via l'API
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile); // Ajouter l'image à la FormData

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        return data.imageUrl; // Retourne l'URL de l'image uploadée
      } else {
        throw new Error('Erreur lors de l\'upload de l\'image');
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload de l\'image :', error);
      throw new Error('Upload échoué : ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = projectData.image;

    // Upload de l'image si elle existe
    if (projectData.image) {
      try {
        imageUrl = await uploadImage(projectData.image); // Obtenir l'URL de l'image uploadée via l'API
      } catch (error) {
        alert('Erreur lors de l\'upload de l\'image');
        return;
      }
    }

    const response = await creerProjet({
      ...projectData,
      imageUrl: imageUrl,  // Inclure l'URL de l'image dans le projet
    });

    if (response.success) {
      alert('Projet créé avec succès !');
      setProjectData({
        title: '',
        category: '',
        description: '',
        shortDescription: '',
        skills: '',
        projectLink: '',
        image: null,
        startDate: '',
        endDate: '',
        priority: ''
      });
      setImagePreview(null);  // Réinitialiser l'aperçu de l'image
    } else {
      alert('Erreur lors de la création du projet : ' + response.error);
    }
  };

  return (
    <section id="create_projet">
      <div className="container mt-5">
        <h2 className="text-center mb-4">Créer un Nouveau Projet</h2>

        <form onSubmit={handleSubmit} className="row align-items-start">
          {/* Section de téléchargement de l'image et prévisualisation */}
          <div className="col-md-4 mb-4">
            <div className="d-flex flex-column align-items-center justify-content-center bg-light p-4 rounded shadow-sm">
              <div className="avatar avatar-xxl rounded-circle border border-dashed mb-3">
                <i className="fas fa-image text-primary fs-1"></i>
              </div>
              <h5 className="mb-2">Télécharger le Logo du Projet</h5>
              <p className="fs-6 text-muted mb-3">L'image doit être inférieure à 4 Mo</p>
              <div className="d-flex align-items-center">
                <label htmlFor="file-upload" className="btn btn-primary me-2">
                  <i className="fas fa-upload me-2"></i> Télécharger
                </label>
                <input
                  type="file"
                  id="file-upload"
                  className="d-none"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>

              {/* Card de prévisualisation */}
              <div className="mt-4">
                <h6>Prévisualisation du Projet :</h6>
                <div className="card">
                  <div className="card-body">
                    {imagePreview && (
                      <div className="text-center mb-3">
                        <img
                          src={imagePreview}
                          alt="Aperçu"
                          className="img-fluid rounded"
                          style={{ maxWidth: '200px' }}
                        />
                      </div>
                    )}
                    <h5 className="card-title">{projectData.title || 'Nom du Projet'}</h5>
                    <p className="card-text">
                      <strong>Description courte :</strong> {projectData.shortDescription || 'Aucune description'}
                    </p>
                    <p className="card-text">
                      <strong>Compétences développées :</strong> {projectData.skills || 'Aucune compétence listée'}
                    </p>
                    <p className="card-text">
                      <strong>Lien vers le projet :</strong> <a href={projectData.projectLink || '#'} target="_blank" rel="noopener noreferrer">{projectData.projectLink || 'Aucun lien'}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire à droite */}
          <div className="col-md-8">
            <div className="row">
              {/* Nom du projet */}
              <div className="col-md-12 mb-3">
                <label className="form-label">Nom du Projet</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={projectData.title}
                  onChange={handleChange}
                  placeholder="Nom du projet"
                  required
                />
              </div>

              {/* Catégorie */}
              <div className="col-md-12 mb-3">
                <label className="form-label">Catégorie</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={projectData.category}
                  onChange={handleChange}
                  placeholder="Catégorie"
                  required
                />
              </div>

              {/* Description */}
              <div className="col-md-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={projectData.description}
                  onChange={handleChange}
                  placeholder="Description détaillée"
                  required
                />
              </div>

              {/* Description courte de la réalisation */}
              <div className="col-md-12 mb-3">
                <label className="form-label">Description Courte de la Réalisation</label>
                <textarea
                  className="form-control"
                  name="shortDescription"
                  value={projectData.shortDescription}
                  onChange={handleChange}
                  placeholder="Décrivez brièvement votre réalisation"
                  required
                />
              </div>

              {/* Compétences développées */}
              <div className="col-md-12 mb-3">
                <label className="form-label">Compétences Développées</label>
                <textarea
                  className="form-control"
                  name="skills"
                  value={projectData.skills}
                  onChange={handleChange}
                  placeholder="Liste des compétences développées"
                  required
                />
              </div>

              {/* Lien vers le code ou le site */}
              <div className="col-md-12 mb-3">
                <label className="form-label">Lien vers le Code ou le Site</label>
                <input
                  type="url"
                  className="form-control"
                  name="projectLink"
                  value={projectData.projectLink}
                  onChange={handleChange}
                  placeholder="URL du projet sur GitHub ou un autre site"
                  required
                />
              </div>

              {/* Date de début */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Date de début</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={projectData.startDate}
                  onChange={handleChange}
                />
              </div>

              {/* Date de fin */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Date de fin</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={projectData.endDate}
                  onChange={handleChange}
                />
              </div>

              {/* Priorité */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Priorité</label>
                <select
                  className="form-select"
                  name="priority"
                  value={projectData.priority}
                  onChange={handleChange}
                >
                  <option value="">Sélectionner une priorité</option>
                  <option value="high">Haute</option>
                  <option value="medium">Moyenne</option>
                  <option value="low">Basse</option>
                </select>
              </div>

              {/* Bouton de soumission */}
              <div className="col-md-6 d-flex justify-content-end">
                <button type="submit" className="btn btn-success">
                  <i className="fas fa-check-circle me-2"></i> Créer le Projet
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateProject;
