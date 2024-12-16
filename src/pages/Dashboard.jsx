import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom'; // Import de NavLink
import statisticsImage from '../assets/images/statistics.svg';  // Importation de l'image
import { getClientInfo } from '../services/apiClient';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getClientInfo(token);
          setUserInfo(data);
        } else {
          navigate('/login'); // Rediriger si pas de token
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        navigate('/login');
      }
    };
    fetchUserInfo();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Sidebar - Menu dynamique en fonction du rôle */}
        <div className="col-md-3 col-lg-2 p-4 bg-light">
          <h3 className="text-primary">Menu</h3>
          <ul className="list-unstyled">
            <li>
              <NavLink to="/dashboard" className="btn btn-link text-dark" activeClassName="fw-bold">
                Tableau de bord
              </NavLink>
            </li>
            {userInfo.role === 'admin' && (
              <>
                <li>
                  <NavLink to="/dashboard/utilisateurs" className="btn btn-link text-dark" activeClassName="fw-bold">
                    Gestion des utilisateurs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/projets" className="btn btn-link text-dark" activeClassName="fw-bold">
                    Gestion des Projets
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/projet/new" className="btn btn-link text-dark" activeClassName="fw-bold">
                    Créer un Projet
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/parametres" className="btn btn-link text-dark" activeClassName="fw-bold">
                    Paramètres
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/rapports" className="btn btn-link text-dark" activeClassName="fw-bold">
                    Rapports
                  </NavLink>
                </li>
              </>
            )}
            {userInfo.role === 'client' && (
              <>
                <li>
                  <NavLink to="/dashboard/profil" className="btn btn-link text-dark" activeClassName="fw-bold">
                    Profil
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/parametres" className="btn btn-link text-dark" activeClassName="fw-bold">
                    Paramètres
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <hr />
          <button className="btn btn-danger w-100" onClick={logout}>Se déconnecter</button>
        </div>

        {/* Contenu principal du tableau de bord */}
        <div className="col-md-9 col-lg-10">
          <div className="container">
            {/* Carte principale du dashboard */}
            <div className="card card-waves mb-4">
              <div className="card-body p-5">
                <div className="row align-items-center justify-content-between">
                  <div className="col">
                    <h2 className="text-primary">Bienvenue, votre tableau de bord est prêt !</h2>
                    <p className="text-gray-700">
                      Bonjour {userInfo.name}, voici votre tableau de bord. Utilisez les sections de gauche pour naviguer.
                    </p>
                    <NavLink to="/dashboard/projets" className="btn btn-primary p-3">
                      Commencer
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-arrow-right ms-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </NavLink>
                  </div>
                  <div className="col d-none d-lg-block mt-xxl-n4">
                    <img className="img-fluid px-xl-4 mt-xxl-n5" src={statisticsImage} alt="Dashboard Illustration" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;