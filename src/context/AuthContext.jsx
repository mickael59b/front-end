import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClientInfo } from '../services/apiClient';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const userInfo = await getClientInfo(token);
        setUser(userInfo);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching user info:', error.message);
        setIsAuthenticated(false);
      }
    };

    fetchUserData();
  }, []);

  const login = async (token) => {
    localStorage.setItem('token', token);
    try {
      const userInfo = await getClientInfo(token);
      setUser(userInfo);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};