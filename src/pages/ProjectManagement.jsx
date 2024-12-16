import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectManagement = () => {
    const { projects, error, deleteProject } = useProjects();
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();

    const filteredProjects = projects.filter((project) =>
        filter === 'All' ? true : project.status === filter
    );

    return (
        <div className="container my-5">
            <h1>Gestion des Projets</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/dashboard/projet/new')}
                >
                    <i className="fas fa-plus-circle me-2"></i>Créer un Projet
                </button>
                <select
                    className="form-select w-auto"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">Tous</option>
                    <option value="Started">En Cours</option>
                    <option value="Completed">Terminé</option>
                    <option value="Approval">En Attente</option>
                </select>
            </div>

            <ProjectTable projects={filteredProjects} onDelete={deleteProject} />
        </div>
    );
};

export default ProjectManagement;
