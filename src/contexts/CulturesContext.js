import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../service/api';

const CulturesContext = createContext({});

export const CulturesProvider = ({ children }) => {
  
  const [cultures, setCultures] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCultures = async () => {
      try {
        const response = await api.get('/cultures');
        setCultures(response.data);
      } catch (error) {
        console.error('Error fetching cultures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCultures();
  }, []);

  const contextValue = {
    cultures,
    loading,
  };

  return (
    <CulturesContext.Provider value={contextValue}>
      {children}
    </CulturesContext.Provider>
  );
};

export const useCultures = () => useContext(CulturesContext);