// src/routes/AdminRoute.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClientInfo } from '../services/apiClient';  // Fonction pour récupérer les infos client

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userInfo = await getClientInfo(token);  // Appel pour récupérer les infos utilisateur
          if (userInfo && userInfo.role === 'admin') {
            setIsAdmin(true);  // L'utilisateur est un admin
          } else {
            setIsAdmin(false);  // L'utilisateur n'est pas un admin
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des informations utilisateur:', error);
          setIsAdmin(false);  // En cas d'erreur, on considère l'utilisateur non-admin
        }
      } else {
        setIsAdmin(false);  // Si aucun token, utilisateur non-authentifié
      }
    };

    fetchUserInfo();
  }, []);

  // Affichage durant le chargement de l'authentification
  if (isAdmin === null) {
    return <div>Chargement...</div>;
  }

  // Si l'utilisateur n'est pas admin, redirection vers /login
  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  // Si l'utilisateur est admin, afficher le contenu
  return <>{children}</>;
};

export default AdminRoute;