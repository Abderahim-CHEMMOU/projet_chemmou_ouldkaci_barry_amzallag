// AuthContext.tsx

import React, { createContext, useState, useContext } from 'react';

// Créez un contexte pour gérer l'authentification
type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Créez le composant AuthProvider pour fournir le contexte d'authentification à toute l'application
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username: string, password: string) => {
    // Votre logique de connexion ici...
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Votre logique de déconnexion ici...
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children} {/* Permet aux composants enfants d'accéder au contexte d'authentification */}
    </AuthContext.Provider>
  );
};

// Créez un hook pour utiliser le contexte d'authentification dans les composants
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
