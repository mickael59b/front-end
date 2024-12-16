import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenirTousLesProjets, supprimerProjet } from '../services/apiProjets'; // Assurez-vous que ces fonctions sont définies correctement dans apiProjet.js

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();

    // Charger les projets depuis l'API
    useEffect(() => {
        const fetchProjects = async () => {
            console.log('Fetching projects...');
            try {
                const response = await obtenirTousLesProjets();
                console.log('Response:', response);
                if (response && response.projects) {
                    console.log('Projets récupérés:', response.projects);
                    setProjects(response.projects); // Mettez à jour l'état avec les projets
                } else {
                    setError('Aucun projet trouvé dans la réponse.');
                }
            } catch (error) {
                console.error('Erreur lors du chargement des projets:', error);
                setError('Erreur lors du chargement des projets');
            } finally {
                setLoading(false);
                console.log('Loading finished');
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
        console.log('Deleting project with ID:', id); // Log avant la suppression
        try {
            const success = await supprimerProjet(id); // Assurez-vous que l'ID est correct
            console.log('Delete success:', success);

            if (success.success) {
                // Supprimer le projet localement sans avoir à faire une nouvelle requête
                setProjects(prevProjects => {
                    // Filtrer le projet supprimé
                    const updatedProjects = prevProjects.filter(project => project._id !== id);
                    console.log('Updated projects after delete:', updatedProjects);
                    return updatedProjects; // Retourner la nouvelle liste des projets
                });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du projet:', error);
            setError('Erreur lors de la suppression du projet');
        }
    };

    console.log('Projects:', projects); // Log de la liste des projets avant le rendu
    console.log('Filtered Projects:', filteredProjects); // Log de la liste filtrée des projets

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
                    onChange={(e) => {
                        console.log('Filter changed:', e.target.value); // Log du changement de filtre
                        setFilter(e.target.value);
                    }}
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