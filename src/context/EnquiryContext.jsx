import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const EnquiryContext = createContext();
const STORAGE_KEY = 'luxeestates_enquiries';

export function EnquiryProvider({ children }) {
  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
  }, [enquiries]);

  const addEnquiry = useCallback((enquiry) => {
    setEnquiries(prev => {
      const newEnquiry = {
        ...enquiry,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: 'Unread'
      };
      return [newEnquiry, ...prev];
    });
  }, []);

  const markAsRead = useCallback((id) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: 'Read' } : e));
  }, []);

  const deleteEnquiry = useCallback((id) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
  }, []);

  return (
    <EnquiryContext.Provider value={{ enquiries, addEnquiry, markAsRead, deleteEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiries() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiries must be used within EnquiryProvider');
  return ctx;
}
