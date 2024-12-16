import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenirTousLesProjets, supprimerProjet } from '../services/apiProjets';  // Assurez-vous que ces fonctions sont définies correctement dans apiProjet.js
import Spinner from 'react-bootstrap/Spinner'; // Pour l'indicateur de chargement
import { Button, Table, Alert, Form } from 'react-bootstrap';  // Bootstrap components

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
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Chargement en cours */}
            {loading && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            {/* Filtrage des projets */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button
                    variant="primary"
                    onClick={() => navigate('/dashboard/projet/new')}
                >
                    <i className="fas fa-plus-circle me-2"></i>Créer un Projet
                </Button>
                <Form.Select
                    aria-label="Filtrer les projets"
                    className="w-auto"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">Tous</option>
                    <option value="Started">En Cours</option>
                    <option value="Completed">Terminé</option>
                    <option value="Approval">En Attente</option>
                </Form.Select>
            </div>

            {/* Affichage des projets sous forme de tableau */}
            {!loading && filteredProjects.length > 0 && (
                <Table striped bordered hover responsive>
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
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(project.id)}
                                    >
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Message quand il n'y a pas de projets */}
            {!loading && filteredProjects.length === 0 && (
                <Alert variant="info">Aucun projet trouvé.</Alert>
            )}
        </div>
    );
};

export default ProjectManagement;
