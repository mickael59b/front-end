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
            try {
                const response = await obtenirTousLesProjets();
                if (response.success) {
                    setProjects(response.projects);
                } else {
                    setError(response.error);
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
            const success = await supprimerProjet(id);
            if (success) {
                // Si la suppression réussie, on réactualise la liste des projets
                setProjects(projects.filter(project => project.id !== id));
            }
        } catch (error) {
            setError('Erreur lors de la suppression du projet');
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
                            <tr key={project.id}>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                                <td>{project.status}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(project.id)}
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