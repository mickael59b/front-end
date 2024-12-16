// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Pour la redirection vers la page d'accueil

const NotFound = () => {
  return (
    <div className="container text-center my-5">
      <div className="card p-5 shadow-lg">
        <h1 className="display-1 text-danger">404</h1>
        <p className="lead">La page que vous recherchez n'existe pas.</p>
        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
