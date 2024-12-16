import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenirProjetParId } from '../services/apiProjets';
import "../assets/css/projets.css"; // CSS pour la mise en forme

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await obtenirProjetParId(id);
        setProject(projectData);
      } catch (error) {
        console.error('Erreur lors de la récupération du projet:', error);
        setError('Erreur lors de la récupération du projet');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="project-details-section section-padding my-5">
      <div className="container">
        <div className="project-details-wrapper">
          <div className="row g-4 justify-content-between">
            {/* Images du projet */}
            <div className="col-lg-8">
              <div className="project-details-image">
                <img
                  src={project.image}
                  alt={`Image du projet ${project.title}`}
                  className="img-fluid rounded"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="project-details-image">
                <img
                  src={project.secondaryImage || 'https://via.placeholder.com/400'}
                  alt="Image secondaire du projet"
                  className="img-fluid rounded"
                />
              </div>
            </div>

            {/* Contenu du projet */}
            <div className="col-lg-7">
              <div className="project-details-content">
                <h5 className="text-secondary">{project.category}</h5>
                <h2 className="text-primary">
                  {project.title} <br /> Aperçu
                </h2>
                <p className="mt-4 text-muted">{project.description}</p>

                <h4 className="mt-5">Points Clés du Projet</h4>
                <ul className="project-list">
                  {project.highlights?.map((highlight, index) => (
                    <li key={index}>
                      <i className="far fa-check text-success me-2"></i>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Informations du projet */}
            <div className="col-lg-5">
              <div className="project-information p-4 bg-light rounded">
                <h4>Informations du Projet</h4>
                <ul className="list-unstyled">
                  <li>
                    <strong>Client :</strong> <span>{project.client || 'Non spécifié'}</span>
                  </li>
                  <li>
                    <strong>Catégorie :</strong> <span>{project.category}</span>
                  </li>
                  <li>
                    <strong>Date :</strong>{' '}
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </li>
                  <li>
                    <strong>Durée :</strong> <span>{project.duration || 'Non spécifiée'}</span>
                  </li>
                </ul>
                <div className="social-icon d-flex align-items-center mt-4">
                  <h5 className="me-3">Partager :</h5>
                  <div className="icon">
                    <a href="#" className="text-primary me-2">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="text-info me-2">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-danger me-2">
                      <i className="fab fa-pinterest-p"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Images supplémentaires */}
          <div className="project-details-img mt-5">
            <div className="row g-4">
              {project.additionalImages?.map((img, index) => (
                <div className="col-lg-6" key={index}>
                  <div className="thumb">
                    <img src={img} alt={`Image supplémentaire ${index + 1}`} className="img-fluid rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section finale */}
          <h4 className="my-4">Technologies et Compétences</h4>
          <ul className="p-list">
            {project.skills?.map((skill, index) => (
              <li key={index}>
                <i className="far fa-check text-success me-2"></i>
                {skill}
              </li>
            ))}
          </ul>

          <h4 className="mt-5">User Experience (UX) Design</h4>
          <p className="mt-3">
            {project.uxDescription ||
              "Tout au long du projet, une communication et une collaboration efficaces entre les membres de l'équipe sont essentielles pour atteindre les objectifs."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;