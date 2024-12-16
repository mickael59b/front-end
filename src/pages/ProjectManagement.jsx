import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenirTousLesProjets, supprimerProjet } from '../services/apiProjets';

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();

    // Charger les projets depuis l'API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await obtenirTousLesProjets();
                if (response && response.projects) {
                    setProjects(response.projects); // Mettre à jour l'état avec les projets
                } else {
                    setError('Aucun projet trouvé dans la réponse.');
                }
            } catch (error) {
                setError('Erreur lors du chargement des projets');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Filtrage des projets selon leur statut
    const filteredProjects = projects.filter((project) =>
        filter === 'All' ? true : project.status === filter
    );

    // Supprimer un projet
    const handleDelete = async (id) => {
        try {
          const result = await supprimerProjet(id); // Appel à la fonction de suppression
      
          if (result.success) {
            // Si la suppression est réussie, on met à jour l'état des projets
            setProjects((prevProjects) => {
              // Filtrer le projet supprimé de la liste
              const updatedProjects = prevProjects.filter(project => project._id !== id);
              return updatedProjects;
            });
          } else {
            // Si la suppression échoue, afficher un message d'erreur
            setError(result.message); // Afficher le message d'erreur dans l'interface
          }
        } catch (error) {
          // En cas d'erreur inattendue
          setError('Une erreur est survenue pendant la suppression');
        }
    };

    return (
        <div className="container my-5">
            <h1 className="mb-4">Gestion des Projets</h1>

            {/* Affichage des erreurs */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Chargement en cours */}
            {loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            )}

            {/* Filtrage des projets */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/dashboard/projet/new')}
                >
                    <i className="fas fa-plus-circle me-2"></i>Créer un Projet
                </button>
                <select
                    className="form-select w-auto"
                    aria-label="Filtrer les projets"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">Tous</option>
                    <option value="Started">En Cours</option>
                    <option value="Completed">Terminé</option>
                    <option value="Approval">En Attente</option>
                </select>
            </div>

            {/* Affichage des projets sous forme de tableau */}
            {!loading && filteredProjects.length > 0 && (
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map((project) => (
                            <tr key={project._id}> {/* Utilisez _id ici */}
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                                <td>{project.status}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(project._id)} // Utilisez _id ici
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Message quand il n'y a pas de projets */}
            {!loading && filteredProjects.length === 0 && (
                <div className="alert alert-info">Aucun projet trouvé.</div>
            )}
        </div>
    );
};

export default ProjectManagement;