"use client";
import { createContext, useState, useContext } from 'react';

const BrandingContext = createContext();

export const BrandingProvider = ({ children }) => {
  const [branding, setBranding] = useState({
    font: 'Roboto',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
  });

  return (
    <BrandingContext.Provider value={{ branding, setBranding }}>
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => useContext(BrandingContext);