import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Déconnecte l'utilisateur
  };

  useEffect(() => {
    // Vous pouvez observer les changements dans l'état d'authentification ou des informations utilisateur
  }, [isAuthenticated, user]); // Déclenché uniquement lorsque ces dépendances changent

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom">
      <div className="container px-5">
        <span className="navbar-brand">
          <Link to="/" className="fw-bolder text-primary">
            Mickael Boutte
          </Link>
          {' | '}
          <span className="text-gradient d-inline">
            Créateur de{' '}
            <a href="https://acti-informatique.com" target="_blank" rel="noopener noreferrer">
              Acti-Informatique
            </a>
          </span>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {isAuthenticated && user ? (
            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user.avatar || 'https://acti-informatique.com/web-core/uploads/avatar/default-avatar.png'}
                  alt="Avatar"
                  width="32"
                  height="32"
                  className="avatar rounded-2"
                />{' '}
                <span className="name">{user.name || 'Utilisateur'}</span>
              </a>
              <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                <li>
                  <Link className="dropdown-item" to="/dashboard">
                    Compte
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              className="btn fw-500 ms-lg-4 btn-primary d-flex align-items-center justify-content-center"
              to="/login"
            >
              Connexion <i className="fa fa-sign-in ms-2" aria-hidden="true"></i>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
