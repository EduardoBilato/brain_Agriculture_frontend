import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../service/api';

const DashboardContext = createContext({});

export const DashboardsProvider = ({ children }) => {

  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDashboard = async (id) => {
    try {
      setLoading(true);
      const response = await api.get(`/dashboard/${id}`);
      setDashboard(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const contextValue = {
    dashboard,
    loading,
    getDashboard
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);