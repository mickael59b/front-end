import React, { useEffect, useState } from 'react';
import { obtenirTousLesProjets } from '../services/apiProjets'; // Assurez-vous que cette fonction existe
import { Link } from 'react-router-dom'; // Pour les liens vers les détails des projets

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);  // Projets de l'API
  const [filteredProjects, setFilteredProjects] = useState([]);  // Projets filtrés
  const [categories, setCategories] = useState([]);  // Catégories pour le filtrage
  const [loading, setLoading] = useState(true);  // Indicateur de chargement
  const [selectedCategory, setSelectedCategory] = useState('All');  // Catégorie sélectionnée pour filtrer

  // Fonction pour filtrer les projets selon la catégorie
  const filterProjectsByCategory = (category) => {
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  useEffect(() => {
    // Récupérer les projets depuis l'API
    const fetchProjects = async () => {
      setLoading(true);
      const response = await obtenirTousLesProjets();
      
      if (response.success && Array.isArray(response.projects)) {
        setProjects(response.projects);
        setFilteredProjects(response.projects);  // Par défaut, afficher tous les projets
      } else {
        console.error('Erreur de récupération des projets:', response.error);
      }
      setLoading(false);
    };

    // Récupérer les catégories disponibles pour filtrer
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

  // Vérifier si les projets sont encore en cours de chargement
  if (loading) {
    return <div>Chargement des projets...</div>;
  }

  return (
    <div className="container">
      <h1>Nos Projets</h1>
      
      {/* Filtre par catégorie */}
      <div className="category-filter">
        <select 
          value={selectedCategory} 
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            filterProjectsByCategory(e.target.value);
          }}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Affichage des projets */}
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
  );
};

export default ProjectsPage;