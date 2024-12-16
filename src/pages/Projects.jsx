import React, { useState, useEffect, useMemo } from "react";
import { obtenirTousLesProjets } from "../services/apiProjets"; // Importation de la fonction pour récupérer les projets
import "../assets/css/projets.css"; // CSS pour la mise en forme

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("*");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Page courante
  const [projectsPerPage] = useState(9); // Nombre de projets par page

  // Récupérer les projets et les catégories
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await obtenirTousLesProjets();
        console.log("Projets récupérés :", projectsData); // Vérification des données
        setProjects(projectsData.projects); // Accédez à la clé `projects`
        
        // Extraction des catégories uniques
        const uniqueCategories = [
          ...new Set(
            projectsData.projects
              .map((project) => project.category)
              .filter((category) => category) // Ignore les catégories nulles
          ),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error.message);
        setProjects([]); // Gère les erreurs proprement
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filtrage des projets
  const filteredProjects = useMemo(() => {
    return activeFilter === "*"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  // Calcul des projets à afficher pour la page courante
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Gestion des filtres
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Réinitialiser à la première page lors d'un changement de filtre
  };

  // Gestion du changement de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 projects-info">
            <h3>Mes Projets</h3>
            <p>Découvrez les projets sur lesquels j'ai travaillé dans différentes catégories.</p>
          </div>
          <div className="col-lg-5 text-center text-lg-end">
            <ul className="projects-filters isotope-filters list-inline" data-aos="fade-up" data-aos-delay="100">
              <li
                onClick={() => handleFilterChange("*")}
                className={`list-inline-item ${activeFilter === "*" ? "filter-active" : ""}`}
              >
                Tous
              </li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => handleFilterChange(category)}
                  className={`list-inline-item ${activeFilter === category ? "filter-active" : ""}`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
          {loading ? (
            <p className="loading">Chargement des projets...</p>
          ) : currentProjects.length > 0 ? (
            currentProjects.map((project, index) => (
              <div className="col-md-4" key={index}>
                <div className="project-item">
                  <img src={project.image} alt={project.name} className="img-fluid" />
                  <h5>{project.name}</h5>
                  <p>{project.description}</p>
                  <span className="category">{project.category}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-projects">Aucun projet trouvé pour cette catégorie.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <ul className="pagination-list list-inline">
            {/* Page précédente */}
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <button className="page-link">Précédent</button>
            </li>

            {/* Numéros de page */}
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                <button className="page-link">{index + 1}</button>
              </li>
            ))}

            {/* Page suivante */}
            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <button className="page-link">Suivant</button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Projects;
