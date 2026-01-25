import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    const token = getCookie('token');
    if (token) {
      // You could add a verify token endpoint here
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      const { token, user } = response.data.data;
      console.log(user);
      console.log(token);


      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
      setUser({ token });

      return { success: true };
    } catch (err) {
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.login(userData);

      const { token, user } = response.data.data;
      console.log(user);
      console.log(token);

      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
      setUser(user);

      return { success: true };
    } catch (err) {
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    document.cookie = 'token=; path=/; max-age=0';
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
