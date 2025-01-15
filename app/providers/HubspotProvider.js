'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const HubspotContext = createContext();

export const HubspotProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all companies from the backend route
  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/hubspot/get-companies', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setCompanies(data.companies || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyById = async (companyId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/hubspot/get-companies/${companyId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.company;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Fetch companies on provider mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <HubspotContext.Provider value={{ companies, loading, error, fetchCompanies, fetchCompanyById }}>
      {children}
    </HubspotContext.Provider>
  );
};

// Hook for consuming the Hubspot context
export const useHubspot = () => {
  const context = useContext(HubspotContext);

  if (!context) {
    throw new Error('useHubspot must be used within a HubspotProvider');
  }

  return context;
};