import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";  // Importation de Link de React Router
import { obtenirTousLesProjets } from "../services/apiProjets"; 
import "../assets/css/projets.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("*");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(9);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await obtenirTousLesProjets();
        if (projectsData && Array.isArray(projectsData.projects)) {
          setProjects(projectsData.projects);
          const uniqueCategories = [
            ...new Set(
              projectsData.projects
                .map((project) => project.category?.trim())
                .filter((category) => category)
            ),
          ];
          setCategories(uniqueCategories);
        } else {
          console.error("Structure de la réponse incorrecte.");
          setProjects([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error.message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "*") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
                  {/* Lien vers la page des détails du projet */}
                  <Link to={`/projects/${project.id}`} className="btn btn-primary">
                    Voir les détails
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-projects">Aucun projet trouvé pour cette catégorie.</p>
          )}
        </div>

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