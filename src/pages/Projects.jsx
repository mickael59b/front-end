import React, { useEffect, useState } from 'react';
import { obtenirTousLesProjets } from '../services/apiProjets'; // Assurez-vous que cette fonction existe
import { Link } from 'react-router-dom'; // Pour les liens vers les détails des projets

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filterProjectsByCategory = (category) => {
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const response = await obtenirTousLesProjets();
      if (response.success && Array.isArray(response.projects)) {
        setProjects(response.projects);
        setFilteredProjects(response.projects);
      } else {
        console.error('Erreur de récupération des projets:', response.error);
      }
      setLoading(false);
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://back-end-api-gfl0.onrender.com/api/projects/categories');
        if (response.ok) {
          const categoriesData = await response.json();
          setCategories(['All', ...categoriesData]);
        }
      } catch (error) {
        console.error('Erreur de récupération des catégories:', error);
      }
    };

    fetchProjects();
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Chargement des projets...</div>;
  }

  return (
    <section id="projets" className="py-5">
      <div className="container">
        <h1>Nos Projets</h1>

        {/* Filtre par catégorie avec un style inspiré */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-7 portfolio-info">
            <h3>Explorez nos Projets</h3>
            <p>Découvrez une variété de projets adaptés à différentes catégories</p>
          </div>
          <div className="col-lg-5 text-center text-lg-end">
            <ul className="portfolio-filters isotope-filters">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={category === selectedCategory ? 'filter-active' : ''}
                  onClick={() => {
                    setSelectedCategory(category);
                    filterProjectsByCategory(category);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Liste des projets */}
        <div className="row">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div className="col-md-4" key={project._id}>
                <div className="card">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="card-img-top"
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">{project.description}</p>
                    <Link to={`/projects/${project._id}`} className="btn btn-primary">
                      Voir les détails
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Aucun projet trouvé.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;