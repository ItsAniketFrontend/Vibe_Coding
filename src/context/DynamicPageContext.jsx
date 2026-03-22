import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DynamicPageContext = createContext();

const STORAGE_KEY = 'luxeestates_dynamic_pages';

const defaultPages = [
  {
    id: 1,
    city: 'jaipur',
    slug: 'plots-in-jaipur-under-10-lakh',
    navLabel: 'Plots in Jaipur under 10 Lakh',
    title: 'Plots in Jaipur under 10 Lakh',
    content: '<p>Find the best residential and commercial plots in Jaipur under 10 Lakh. These prime locations offer excellent connectivity and basic amenities at an affordable price.</p>',
    metaTitle: 'Plots in Jaipur under 10 Lakh | Acenst',
    metaDescription: 'Find the best residential and commercial plots in Jaipur under 10 Lakh. Affordable property in prime locations.',
  }
];

export function DynamicPageProvider({ children }) {
  const [dynamicPages, setDynamicPages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse dynamic pages from localStorage', e);
    }
    return defaultPages;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dynamicPages));
  }, [dynamicPages]);

  const addPage = useCallback((page) => {
    setDynamicPages(prev => {
      const maxId = prev.reduce((max, p) => Math.max(max, p.id || 0), 0);
      return [...prev, { ...page, id: maxId + 1 }];
    });
  }, []);

  const updatePage = useCallback((id, updates) => {
    setDynamicPages(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deletePage = useCallback((id) => {
    setDynamicPages(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <DynamicPageContext.Provider value={{ dynamicPages, addPage, updatePage, deletePage }}>
      {children}
    </DynamicPageContext.Provider>
  );
}

export function useDynamicPages() {
  const ctx = useContext(DynamicPageContext);
  if (!ctx) throw new Error('useDynamicPages must be used within DynamicPageProvider');
  return ctx;
}
