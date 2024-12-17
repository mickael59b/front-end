import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";  // Pour créer un lien vers la page des détails d'un projet
import { obtenirTousLesProjets } from "../services/apiproject";  // Import de la fonction pour obtenir les projets
import "../assets/css/projets.css";  // Assurez-vous d'inclure votre CSS pour la mise en forme

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("*");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(9);

  // Récupérer les projets et les catégories
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const response = await obtenirTousLesProjets();  // Appel de l'API pour obtenir les projets
      if (response.success) {
        setProjects(response.projects);
        // Extraire les catégories des projets
        const uniqueCategories = [...new Set(response.projects.map(p => p.category))];
        setCategories(uniqueCategories);
      } else {
        console.error(response.error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, [activeFilter, currentPage]);

  const filteredProjects = useMemo(() => {
    return activeFilter === "*" ? projects : projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Réinitialiser la page à 1 lors du changement de filtre
  };

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
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div className="col-md-4" key={project._id}>
                <div className="project-item">
                  <img src={project.imageUrl || "default-image.jpg"} alt={project.title} className="img-fluid" />
                  <h5>{project.title}</h5>
                  <p>{project.description}</p>
                  <span className="category">{project.category}</span>
                  <Link to={`/projects/${project._id}`} className="btn btn-primary">
                    Voir les détails
                  </Link>
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
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <button className="page-link">Précédent</button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                <button className="page-link">{index + 1}</button>
              </li>
            ))}
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
