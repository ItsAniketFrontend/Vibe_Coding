import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { allProperties as initialProperties, cityLocations as initialCityLocations, plotTypes } from '../data/propertyData';

const PropertyContext = createContext();

const STORAGE_KEY = 'luxeestates_properties';

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse properties from localStorage', e);
    }
    return initialProperties;
  });
  
  const [cityLocations] = useState(initialCityLocations);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  }, [properties]);

  const addProperty = useCallback((property) => {
    setProperties(prev => {
      const maxId = prev.reduce((max, p) => Math.max(max, p.id || 0), 0);
      return [...prev, { ...property, id: maxId + 1 }];
    });
  }, []);

  const updateProperty = useCallback((id, updates) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProperty = useCallback((id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, cityLocations, plotTypes, addProperty, updateProperty, deleteProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error('useProperties must be used within PropertyProvider');
  return ctx;
}
